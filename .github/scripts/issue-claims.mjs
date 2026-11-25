const DAY = 86_400_000;
const STANDING_PROFILE = 1;
const wanted = "help wanted";
const blocked = "blocked";
const hasLabel = (issue, name) => issue.labels.some((label) => label.name === name);
const isStanding = (issue) => issue.number === STANDING_PROFILE || hasLabel(issue, "standing");

function daysOrLimit(name) {
  const value = Number(process.env[name]);
  if (!Number.isSafeInteger(value) || value < 1) throw new Error(`${name} must be a positive integer.`);
  return value;
}

export async function manageClaims({ github, context, core }) {
  const repo = context.repo;
  const issues = github.rest.issues;
  const params = (issue) => ({ ...repo, issue_number: issue.number });
  const comment = (issue, body) => issues.createComment({ ...params(issue), body });
  const listOpen = (filters = {}) => github.paginate(issues.listForRepo, {
    ...repo, state: "open", per_page: 100, ...filters,
  });
  const get = async (issue) => (await issues.get(params(issue))).data;

  async function release(issue, login) {
    const { data } = await issues.removeAssignees({ ...params(issue), assignees: [login] });
    if (data.assignees.some((assignee) => assignee.login === login)) {
      throw new Error(`GitHub kept ${login} assigned to #${issue.number}.`);
    }
    if (data.assignees.length === 0 && !hasLabel(data, blocked)) {
      await issues.addLabels({ ...params(issue), labels: [wanted] });
    }
  }

  if (context.eventName === "issue_comment") {
    const { comment: event, issue: eventIssue } = context.payload;
    const command = event.body.trim().toLowerCase();
    if (!["/claim", "/unclaim"].includes(command) || eventIssue.pull_request || event.user.type !== "User") return;

    const issue = await get(eventIssue);
    const login = event.user.login;
    if (isStanding(issue)) {
      await comment(issue, `Hi @${login}! This shared profile task is open to everyone. Add your own profile and use \`Refs #${issue.number}\` in your PR.`);
    } else if (issue.state !== "open") {
      await comment(issue, `Hi @${login}! This issue is closed. Please pick another open issue.`);
    } else if (command === "/unclaim") {
      if (!issue.assignees.some((assignee) => assignee.login === login)) {
        await comment(issue, `Hi @${login}! You can release an issue only when you’re assigned to it.`);
        return;
      }
      await release(issue, login);
      await comment(issue, `Thanks for freeing this up, @${login}! You can use \`/claim\` on another available issue.`);
    } else if (issue.assignees.length > 0) {
      const yours = issue.assignees.some((assignee) => assignee.login === login);
      await comment(issue, yours
        ? `Hi @${login}! You already have this issue. Follow the acceptance criteria and link your PR when it’s ready.`
        : `Hi @${login}! Someone has already claimed this issue. Please pick another unassigned issue.`);
    } else if ([blocked, "needs-triage", "in progress"].some((label) => hasLabel(issue, label))) {
      await comment(issue, `Hi @${login}! This issue is waiting for a dependency or maintainer action. Please pick another available issue.`);
    } else {
      const limit = daysOrLimit("MAX_OPEN_CLAIMS");
      const assigned = (await listOpen({ assignee: login })).filter((item) => !item.pull_request && !isStanding(item));
      if (assigned.length >= limit) {
        await comment(issue, `Hi @${login}! You’ve reached the limit of ${limit} open assigned issue(s). Finish your current work or use \`/unclaim\` on #${assigned[0].number} first.`);
        return;
      }
      const { data } = await issues.addAssignees({ ...params(issue), assignees: [login] });
      if (!data.assignees.some((assignee) => assignee.login === login)) {
        await comment(issue, `Hi @${login}! GitHub couldn’t assign you automatically. Please ask a maintainer for help here.`);
        return;
      }
      if (hasLabel(data, wanted)) await issues.removeLabel({ ...params(issue), name: wanted });
      await comment(issue, `You’re assigned, @${login}! Read the acceptance criteria, branch from \`main\`, and use \`Closes #${issue.number}\` in your PR. Comment with a progress update if you need more time, or use \`/unclaim\` to free the issue.`);
    }
    return;
  }

  const idle = daysOrLimit("STALE_AFTER_DAYS") * DAY;
  const grace = daysOrLimit("WARNING_GRACE_DAYS") * DAY;
  const now = Date.now();

  for (const candidate of await listOpen({ assignee: "*" })) {
    if (candidate.pull_request || isStanding(candidate)) continue;
    try {
      const issue = await get(candidate);
      if (issue.state !== "open" || isStanding(issue) || !issue.assignees.length) continue;
      const timeline = await readTimeline(github, repo, issue.number);
      if (hasOpenPullRequest(timeline)) continue;

      for (const { login } of issue.assignees) {
        const activity = timeline.filter((event) =>
          event.assignee?.login === login || event.author?.login === login);
        const lastActive = Date.parse(activity.at(-1)?.createdAt ?? issue.created_at);
        if (now - lastActive < idle) continue;

        const marker = `<!-- classroom-stale-claim:${login} -->`;
        const warning = timeline.findLast((event) =>
          /^github-actions(?:\[bot\])?$/.test(event.author?.login ?? "") &&
          event.body?.startsWith(marker) && Date.parse(event.createdAt) >= lastActive);
        if (!warning) {
          await comment(issue, `${marker}\nHi @${login}! Are you still working on this? Please post a progress update or link an open PR. If there’s no update in ${grace / DAY} day(s), the issue will become available again.`);
        } else if (now - Date.parse(warning.createdAt) >= grace) {
          await release(issue, login);
          await comment(issue, `Hi @${login}! Your inactive claim has been released. You’re welcome to claim this issue again if it’s available.`);
        }
      }
    } catch (error) {
      core.setFailed(`Could not check #${candidate.number}: ${error.message}`);
    }
  }
}

async function readTimeline(github, repo, number) {
  const events = [];
  let cursor;
  do {
    const { repository } = await github.graphql(`
      query ($owner: String!, $repo: String!, $number: Int!, $cursor: String) {
        repository(owner: $owner, name: $repo) {
          issue(number: $number) {
            timelineItems(first: 100, after: $cursor, itemTypes: [
              ASSIGNED_EVENT, ISSUE_COMMENT, CROSS_REFERENCED_EVENT, CONNECTED_EVENT, DISCONNECTED_EVENT
            ]) {
              nodes {
                __typename
                ... on AssignedEvent { createdAt assignee { ... on User { login } } }
                ... on IssueComment { createdAt body author { login } }
                ... on CrossReferencedEvent { source { ...PullRequestState } }
                ... on ConnectedEvent { subject { ...PullRequestState } source { ...PullRequestState } }
                ... on DisconnectedEvent { subject { ...PullRequestState } source { ...PullRequestState } }
              }
              pageInfo { hasNextPage endCursor }
            }
          }
        }
      }
      fragment PullRequestState on PullRequest { id state }
    `, { ...repo, number, cursor });
    const page = repository.issue.timelineItems;
    events.push(...page.nodes);
    cursor = page.pageInfo.hasNextPage ? page.pageInfo.endCursor : null;
  } while (cursor);
  return events;
}

function hasOpenPullRequest(timeline) {
  const links = new Set();
  for (const event of timeline) {
    const pr = event.subject?.id ? event.subject : event.source;
    if (pr?.state !== "OPEN") continue;
    if (event.__typename === "DisconnectedEvent") links.delete(pr.id);
    else links.add(pr.id);
  }
  return links.size > 0;
}
