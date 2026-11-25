# NST Campus Hub

[First-time contributor guide](https://nst-campus-hub.vercel.app/first-time-contributor)

NST Campus Hub is a demo open source repository for Newton School of Technology (NST) students. Practise the real workflow of picking an issue, creating a branch, making a commit, and opening a pull request. The site has a student directory, project showcase, campus events, and curated learning resources. The sample profiles, projects, and events are labelled **Demo**. The learning links are real.

[Open the live demo](https://nst-campus-hub.vercel.app/)

> **Screenshot placeholder** — Add a screenshot of the homepage after the first deployment.

## Quickstart

Install Node.js 24 and use the npm bundled with it. In a terminal at the repository root, run:

```sh
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Stop the development server with **Ctrl+C**. No database, API keys, or enviroment variables are required.

| Command | What it does |
| --- | --- |
| `npm run lint` | Checks the code with ESLint |
| `npm run typecheck` | Generates route types and checks TypeScript |
| `npm run build` | Builds the production site |
| `npm start` | Serves the last production build locally |

## Project structure

| Path | What you'll find |
| --- | --- |
| `app/` | Next.js routes and the shared page layout |
| `components/` | The navbar, footer, cards, and shadcn/ui primitives in `ui/` |
| `data/` | One JSON file per student, project, event, or resource |
| `lib/` | Data types, typed loaders, and shared helpers |
| `.github/` | Issue forms, PR template, and CI |

## Contribute in five steps

1. Pick an unassigned [GitHub issue](https://github.com/shinchan068/nst-campus-hub/issues) and leave a comment asking to work on it. Wait for assignment.
2. Fork and clone the repository, then create a branch with the issue number.
3. Give your AI tool the issue and [AGENTS.md](AGENTS.md). Review the change and make sure you can explain it.
4. Run lint and build, then make a Conventional Commit and push your branch to your fork.
5. Open one pull request, include `Closes #<n>`, and respond to maintaner feedback.

Read the full [contribution guide](CONTRIBUTING.md) before starting, and follow the [Code of Conduct](CODE_OF_CONDUCT.md).
