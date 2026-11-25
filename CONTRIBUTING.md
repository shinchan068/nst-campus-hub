# Contributing to NST Campus Hub

[First-time contributor guide](https://nst-campus-hub.vercel.app/first-time-contributor)

You will use a GitHub issue to track one task and a pull request (PR) to propose your solution. A fork is your GitHub copy of the repository. A clone is the copy on your computer. Use one active issue at a time and open one PR per issue.

## 1. Pick an issue and ask for assignment

Open the repository's **Issues** tab and look for an unassigned issue. If you're new, start with `good first issue`. Read the acceptance criteria and check the conversation for anyone already working on it. Comment with your intent and wait for a maintainer to assign you. Use the actual GitHub issue number throughout, even if it differs from the number in a draft filename.

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

Use `npm run dev` to try the change. Before pushing, run both required checks and the TypeScript check used by CI:

```sh
npm run lint
npm run typecheck
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

Choose the official repository's `main` as the base and your fork's issue branch as the head. Use a Conventional Commit title such as `feat: show time until the next event (#12)`. Replace the PR template's placeholder with a line such as `Closes #12` so GitHub can close the issue when your PR merges. Describe the change, how you checked it, and which AI tools you used. Attach screenshots for UI changes. Use a draft PR if you're still working.

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
