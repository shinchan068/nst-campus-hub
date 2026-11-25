# Contributing to NST Campus Hub

You will use a GitHub issue to track one task and a pull request (PR) to propose your solution. A fork is your GitHub copy of the repository. A clone is the copy on your computer. Use one active issue at a time and open one PR per issue.

## 1. Pick and claim an issue

Start with an unassigned [good first issue](https://github.com/shinchan068/nst-campus-hub/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22+no%3Aassignee). Read its acceptance criteria, then leave a comment containing only `/claim`. Wait for the bot to confirm assignment before starting. The classroom limit is one open assigned issue per student. Use `/unclaim` to give yours back.

If you have neither an open linked PR nor a progress comment on your issue for five days, the bot posts a warning. You have two more days from the warning to comment with an update or link your PR before your assignment is released. The bot runs the check daily.

The [standing profile issue #1](https://github.com/shinchan068/nst-campus-hub/issues/1) is open to everyone without an assignment. Add your own file and put `Refs #1` in your PR instead of a closing keyword. It does not count against your claim limit.

## 2. Fork, clone, and make a branch

Click **Fork** on GitHub. Substitute your fork URL and local folder name in these commands. `origin` is your fork. `upstream` is the official repo.

```sh
git clone <your-fork-url>
cd <repo-folder>
git remote add upstream https://github.com/shinchan068/nst-campus-hub.git
git fetch upstream
git checkout main
git rebase upstream/main
git checkout -b feat/12-event-countdown
npm ci
```

The branch pattern is `git checkout -b <type>/<issue-number>-<short-slug>`. Use lowercase words joined by hyphens. Replace `12` with your assigned issue number. Branch, commit, and PR types come from this list.

| Type | Use it for |
| --- | --- |
| `feat` | New behaviour or content |
| `fix` | A bug fix |
| `docs` | Documentation |
| `style` | Formatting or visual styling changes |
| `refactor` | Internal restructuring |
| `test` | Tests |
| `chore` | Maintenance or tooling |

## 3. Make and verify the change

Pass the issue and [AGENTS.md](AGENTS.md) to your AI tool. Ask it to explain which files it will touch. For data-only tasks, use the matching `_example.json` and add your own file. Keep your diff within the issue's scope. Leave other people's profiles alone and avoid lockfile churn. Only change `package-lock.json` when the issue genuinely requires a dependency change. Keep credentials and personal information out of the repository.

Use `npm run dev` to try the change. Before pushing, run the checks used by CI:

```sh
npm run lint
npm run typecheck
npm run validate:data
npm run build
git status --short
git diff
```

Stage the intended paths, review the staged diff, and commit:

```sh
git add <file-you-changed>
git diff --cached
git commit -m "feat: show time until the next event (#12)"
git push -u origin feat/12-event-countdown
```

A Conventional Commit starts with `<type>: <short summary>`. Put the issue reference in the commit subject or body.

## 4. Open one pull request

Choose the official repository's `main` as the base and your fork's issue branch as the head. Use a Conventional Commit title such as `feat: show time until the next event (#12)`. Replace the PR template's placeholder with a line such as `Closes #12` so GitHub can close the issue when your PR merges. For the standing profile issue, use `Refs #1` in the PR and in any commit that mentions the issue. Describe the change, how you checked it, and which AI tools you used. Attach screenshots for UI changes. Use a draft PR if you're still working.

## 5. Respond to review and keep your fork synced

A reviewer might approve, leave comments, or request changes. Read the feedback, ask for clarification in the PR when needed, and push corrections to the same branch. GitHub updates the existing PR automatically. Reply to the review comments with what changed and request another review when ready.

To update your fork's `main`, start with a clean working tree:

```sh
git fetch upstream
git checkout main
git rebase upstream/main
git push origin main
```

If a reviewer requests an update on an open PR, `git checkout <issue-branch>` and `git rebase upstream/main`. Resolve conflicts by editing the affected files, then stage those files and run `git rebase --continue`. Use `git rebase --abort` if you need to return to the starting state. Rerun the checks. If the topic branch was already published to your fork, use `git push --force-with-lease` only on your own topic branch after confirming nobody else has added commits to it.

## Maintainer setup

Repository Actions variables `MAX_OPEN_CLAIMS`, `STALE_AFTER_DAYS`, and `WARNING_GRACE_DAYS` override the classroom defaults in [the issue claims workflow](.github/workflows/issue-claims.yml). When a backlog prerequisite lands, remove the dependent issue’s `blocked` label and add `help wanted` so students can claim it.
