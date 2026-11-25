# NST Campus Hub agent instructions

Apply these rules whenever you help a student contribute. Read the assigned issue and [CONTRIBUTING.md](CONTRIBUTING.md) first. Treat the issue's acceptance criteria as the scope.

## Hard rules

- Comment `/claim` on an available issue and wait for assignment. Work on one assigned issue at a time and use `/unclaim` to release it. Open one PR per issue. For standing profile issue #1, skip assignment and add only your own profile.
- Branch from current upstream `main`. The branch must match `<type>/<issue-number>-<short-slug>`, for example `feat/12-event-countdown`. Use the actual GitHub issue number.
- Allowed types are `feat`, `fix`, `docs`, `style`, `refactor`, `test`, and `chore`.
- Commit subjects and PR titles must use `<type>: <short summary>`. Reference `#<n>` in the commit subject or body, and include `Closes #<n>` in the PR body. Use `Refs #1` for the standing profile issue in both the PR and any commit that references it.
- Edit only files required by the assigned issue. Leave unrelated files and other students' profiles alone. Preserve the lockfile unless the issue explicitly needs a dependency change.
- Use the student's configured Git identity. Never add AI author, co-author, or generated-by credit to Git history, PR metadata, or release notes. List tools used only in the student PR template's AI tools disclosure.
- Explain the plan, changed files, verification, and one relevant concept in plain language so the student can explain the work themselves.

## Project map

| Path | Owner |
| --- | --- |
| `app/layout.tsx` | Shared site structure and global metadata |
| `app/page.tsx` | Home |
| `app/{people,projects,events,resources}/page.tsx` | Directory routes |
| `components/` | Shared header, footer, heading, and card components |
| `components/ui/` | shadcn/ui primitives |
| `app/globals.css` | Tailwind theme tokens and base rules |
| `lib/types.ts` | Data types and allowed topics |
| `lib/data.ts` | Server-side JSON loading |
| `lib/event-date.ts` | Event display formatting |
| `data/` | JSON content and templates |
| `.github/` | Issue forms, PR template, and CI |

## Add a data entry

1. Pick `data/students`, `data/projects`, `data/events`, or `data/resources`.
2. Copy its `_example.json` to a new file. Its basename must match the lowercase GitHub `username` for profiles or the unique kebab-case `slug` elsewhere.
3. Fill in every required field from `lib/types.ts`. Use valid JSON, double quotes, and no trailing commas. For projects, use an existing student username in `author`. For events, use `YYYY-MM-DD` representing a calendar day in India. For external URLs, use public HTTPS links.
4. Set `demo: false` for real profiles, projects, and events. Set `demo: true` for fictional entries. Resource entries link to real material and have no demo field.
5. Confirm the entry appears in its directory. Loaders skip underscore-prefixed files, so leave the template in place.

## Coding standards

- Keep TypeScript strict. Reuse the data types in `lib/types.ts` and keep filesystem access in `lib/data.ts`.
- Use Server Components by default. Add `"use client"` at the smallest boundary that needs browser APIs or state.
- Style with Tailwind utilities and existing theme tokens. Use or add shadcn primitives only under `components/ui/`.
- Preserve semantic markup and keyboard access. Keep dependencies and abstractions within the issue's needs.

## Before the PR

- [ ] Actual issue number appears in the branch, commit, and PR reference (`Closes #<n>` or `Refs #1` for profiles).
- [ ] The diff meets the issue's acceptance criteria and contains only scoped changes.
- [ ] `npm run lint`, `npm run typecheck`, `npm run validate:data`, and `npm run build` passed locally.
- [ ] The affected flow was tried locally. UI changes include screenshots in the PR.
- [ ] The student can explain the behaviour, checks, and any limits. The PR lists the AI tools used.
