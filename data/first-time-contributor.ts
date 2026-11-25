export const repository = "https://github.com/shinchan068/nst-campus-hub";
export const beginnerIssues = `${repository}/issues?q=is%3Aissue%20is%3Aopen%20label%3A%22good%20first%20issue%22`;

type GuideBlock = {
  text: string;
  code?: string;
  label?: string;
  link?: { href: string; label: string };
};

type GuideStep = {
  id: string;
  nav: string;
  title: string;
  intro: string;
  actions: GuideBlock[];
  expected: string;
  mistake: string;
};

export const steps: GuideStep[] = [
  {
    id: "basics",
    nav: "Learn the basics",
    title: "Start with four words",
    intro: "Open source means people can read the code and use, change, or share it under its license. Think of Campus Hub as a shared class project with a public rulebook.",
    actions: [
      { text: "The repository (repo) is the project folder plus its history. Open the Campus Hub repo and click Code to see the files.", link: { href: repository, label: "Open the Campus Hub repository" } },
      { text: "An issue is a task card. Click Issues and open a title to see what needs doing. A pull request (PR) is a proposal to add your changes to the shared project. Click Pull requests to find proposals and their discussions." },
    ],
    expected: "The repo shows folders like `app` and `data`. An issue describes a task. A PR shows proposed edits under Files changed.",
    mistake: "Opening a PR to ask for an assignment. Ask on the issue first, then open a PR when you have changes.",
  },
  {
    id: "setup",
    nav: "Set up your tools",
    title: "Set up Git, GitHub, and your AI editor",
    intro: "Git saves versions on your computer. GitHub hosts the repo online so people can share and review those versions. Use Terminal on macOS or Linux, or Git Bash on Windows, for the commands below.",
    actions: [
      { text: "Click Sign up and verify your email. To keep your personal email out of public commits, open GitHub → Settings → Emails and copy the GitHub-provided no-reply address.", link: { href: "https://github.com/signup", label: "Create a GitHub account" } },
      { text: "Install Git for your operating system. On Windows, open Git Bash after installing. Open a fresh terminal and replace the sample name and email with yours. Use your verified GitHub email or the no-reply address.", link: { href: "https://git-scm.com/install/", label: "Install Git" }, code: 'git --version\ngit config --global user.name "Your Name"\ngit config --global user.email "YOUR_GITHUB_EMAIL"\ngit config --global user.name\ngit config --global user.email' },
      { text: "Install Node.js 24, the version pinned by this repo. npm comes with Node and installs the libraries the app needs. Reopen your terminal before checking both.", link: { href: "https://nodejs.org/en/download/archive/v24", label: "Download Node.js 24" }, code: "node -v\nnpm -v" },
      { text: "Install an AI editor such as VS Code with GitHub Copilot. In VS Code, open Extensions, search for GitHub Copilot, click Install, and sign in when prompted.", link: { href: "https://code.visualstudio.com/docs/copilot/setup", label: "Set up Copilot in VS Code" } },
      { text: "For HTTPS pushes, install GitHub CLI. Run the commands and follow the browser sign-in prompts for the account that owns your fork.", link: { href: "https://cli.github.com/", label: "Install GitHub CLI" }, code: "gh auth login --hostname github.com --git-protocol https --web\ngh auth setup-git\ngh auth status" },
    ],
    expected: "Git prints its version and your configured identity. Node prints v24.x, npm prints a version, and your AI chat and GitHub CLI are signed in.",
    mistake: "Expecting git config to log you in. It sets the name and email on commits. The GitHub CLI sign-in gives Git access to push over HTTPS.",
  },
  {
    id: "issue",
    nav: "Ask for assignment",
    title: "Pick one issue and ask to work on it",
    intro: "A good first issue is scoped for beginners. Acceptance criteria tell you what the maintainer will check before accepting the change.",
    actions: [
      { text: "Open the filtered Issues list. Pick one open issue, read its acceptance criteria, and check the Assignees panel and comments for anyone already working on it.", link: { href: beginnerIssues, label: "Browse good first issues" } },
      { text: "Sign in to GitHub and scroll to the bottom of the issue. Type a regular comment like the one below, click Comment, and wait for a maintainer to assign you.", label: "Example issue comment", code: "Hi! Could I work on this issue? I’ve read the acceptance criteria and will check the change locally before opening a PR." },
    ],
    expected: "Your comment appears. Once a maintainer assigns you, your GitHub username appears under Assignees. That’s when you can start. The number beside the issue title is the number you’ll use in Git.",
    mistake: "Starting while an issue is assigned to someone else or your request is pending. Work on one assigned issue at a time.",
  },
  {
    id: "fork",
    nav: "Fork on GitHub",
    title: "Make your own GitHub copy",
    intro: "A fork is a copy under your GitHub account where you can publish changes. A clone is a copy on your computer where you edit files and run the app.",
    actions: [
      { text: "Sign in, open the official repo, click Fork → Create a new fork, pick your own account under Owner, keep the repo name, and click Create fork.", link: { href: repository, label: "Open the official repo" } },
    ],
    expected: "The header says YOUR-USERNAME/nst-campus-hub and shows that it was forked from shinchan068/nst-campus-hub.",
    mistake: "Looking for a folder on your computer after clicking Fork. Clone the fork in the next step to get that folder.",
  },
  {
    id: "clone",
    nav: "Clone and run locally",
    title: "Download your fork and run the site",
    intro: "A remote is a named address for a GitHub repository. Cloning sets origin to the address you cloned. Add upstream so you can fetch updates from the official repo.",
    actions: [
      { text: "On your fork, choose Code → HTTPS → Copy. Open a terminal from a folder where you keep projects. Replace the example clone URL with the one you copied.", code: "git clone https://github.com/YOUR-USERNAME/nst-campus-hub.git\ncd nst-campus-hub\ngit remote add upstream https://github.com/shinchan068/nst-campus-hub.git\ngit remote -v" },
      { text: "From inside the repo, `npm install` installs the libraries. This repo prefers `npm ci`, shown below, because it installs the exact versions in the lockfile. Run the block, then open the address printed by Next.js. Leave the server running and use a second terminal in the repo folder for Git commands. Press Ctrl+C in the server terminal when you’re done.", code: "npm ci\nnpm run dev" },
    ],
    expected: "The listed origin URLs point to your account and upstream points to shinchan068. Next.js prints a local URL, usually http://localhost:3000, where the Campus Hub home page opens.",
    mistake: "Cloning from the official repository and ending up with the wrong origin. Check the URLs before pushing.",
  },
  {
    id: "branch",
    nav: "Create your branch",
    title: "Start a branch from the latest main",
    intro: "A branch gives your issue a separate line of work. Campus Hub names branches `<type>/<issue-number>-<short-slug>`, with lowercase words joined by hyphens.",
    actions: [
      { text: "Start with a clean working tree. The example uses profile issue #1. Change the type, number and slug for your assigned issue. Types include feat (new content or behavior), fix (bugs), docs, style, refactor, test, and chore.", code: "git status --short\ngit fetch upstream\ngit switch main\ngit rebase upstream/main\ngit switch -c feat/1-add-student-profile\ngit branch --show-current" },
    ],
    expected: "A clean git status --short prints nothing before you start. The final command prints your new branch name.",
    mistake: "Editing directly on main or copying the example number for a different issue. Check your current branch before asking AI to edit.",
  },
  {
    id: "edit",
    nav: "Edit with AI",
    title: "Add your own profile with AI",
    intro: "In issue #1, your profile comes from a JSON file. The People page finds your new file automatically. You can learn the workflow with this example and adapt it to the issue you were assigned.",
    actions: [
      { text: "In your editor, choose File → Open Folder and select nst-campus-hub. Open the AI chat and give it your assigned issue, the repo rules, and only details you are happy to publish.", link: { href: `${repository}/blob/main/AGENTS.md`, label: "Read AGENTS.md" }, label: "Example AI prompt for issue #1", code: "Read AGENTS.md, CONTRIBUTING.md, and https://github.com/shinchan068/nst-campus-hub/issues/1. Explain the plan and files you’ll touch before editing. Use data/students/_example.json to create one new data/students/<github-username>.json file using the public profile details I provide. Set demo to false. Leave existing profiles and the template alone. Show me what changed, why it works, and how to check it on People. Stop before committing or pushing." },
      { text: "Check that the lowercase GitHub username matches the filename without .json. Replace the example values with your own public details. Keep the double quotes, a number for year, and square brackets around the skills list. Never add your email, phone number, credentials, or student ID.", label: "Example profile JSON", code: JSON.stringify({ username: "your-github-username", name: "Your Name", program: "Computer Science", year: 1, bio: "I’m learning to build for the web.", skills: ["Git"], demo: false }, null, 2) },
      { text: "With the development server running, open People from the navbar or add /people to your local address. Run this command to see exactly which paths changed.", code: "git status --short" },
    ],
    expected: "Your card shows your name, program, year, bio, and skills without a Demo badge. Git shows one new JSON file for this issue.",
    mistake: "Editing _example.json or trusting an AI change without reading it. The loader skips files starting with an underscore. You should be able to explain every changed file.",
  },
  {
    id: "commit",
    nav: "Check, commit, and push",
    title: "Check your work and publish the branch",
    intro: "A commit is a named save point. Git only commits the edits you stage with git add. Pushing sends the commits to your GitHub fork.",
    actions: [
      { text: "Stop the dev server with Ctrl+C before building. Run these checks one at a time and fix any failure before continuing.", code: "npm run lint\nnpm run typecheck\nnpm run build" },
      { text: "Replace YOUR-GITHUB-USERNAME with your lowercase username. Read the staged diff before you commit. The Conventional Commit format is `<type>: <short summary>`. Include the actual issue number in the subject or body.", code: 'git status --short\ngit add data/students/YOUR-GITHUB-USERNAME.json\ngit diff --cached\ngit commit -m "feat: add my student profile (#1)"\ngit push -u origin feat/1-add-student-profile' },
    ],
    expected: "The checks finish successfully, the staged diff contains only your intended change, and Git prints that your branch was pushed to your fork.",
    mistake: "Staging the entire folder and accidentally shipping unrelated edits or lockfile changes. Stage the exact files and inspect the staged diff.",
  },
  {
    id: "pr",
    nav: "Open a pull request",
    title: "Propose the change to Campus Hub",
    intro: "GitHub compares two branches in a PR. The base is where your change should go. The head is where your commits already are.",
    actions: [
      { text: "On GitHub, go to the official repo → Pull requests → New pull request → compare across forks. Set base repository to shinchan068/nst-campus-hub, base to main, head fork to your fork, and compare to your issue branch. If your fork shows Compare & pull request after the push, you can also start there.", link: { href: `${repository}/compare`, label: "Open the compare page" } },
      { text: "Click Create pull request to open the form. Use a title like `feat: add my student profile`. Fill in the template with what changed, how you checked it, and the AI tool you used. Add the actual issue number as a closing line and tick only checklist items you completed. For a visual change, attach before and after screenshots in the Screenshots section. Check Files changed after submission.", label: "Example closing line", code: "Closes #1" },
    ],
    expected: "GitHub gives the PR its own number and shows your branch pointing into the official main. The PR links to the issue and contains only the intended files.",
    mistake: "Setting the base to your fork’s main. Recheck the owner and branch in both dropdowns before submitting.",
  },
  {
    id: "review",
    nav: "Review, merge, and sync",
    title: "Respond to review and get ready for the next issue",
    intro: "CI (continuous integration) runs automated checks on GitHub. A Vercel preview, when available, is a temporary site built from your PR. A maintainer reviews the change and merges it when it’s ready.",
    actions: [
      { text: "Open your PR → Checks and look for Quality checks. Click a failed check for logs. Open the Vercel bot’s Preview link if it appears, then visit the affected page. A maintainer may need to approve a first-time contributor’s workflow or deployment before it runs." },
      { text: "If changes are requested, edit the same branch, rerun lint, typecheck and build, and check the staged diff before committing. Use your actual file and issue number in this example. Reply to the reviewer with what changed and request another review when ready.", code: 'git branch --show-current\ngit add data/students/YOUR-GITHUB-USERNAME.json\ngit diff --cached\ngit commit -m "fix: address profile review (#1)"\ngit push' },
      { text: "After a maintainer merges the PR, confirm its Merged status. When your local working tree is clean, update your fork’s main before starting the next assigned issue. Rebase applies any local commits after upstream/main. Keep main for syncing so it can usually fast-forward. If your team prefers a merge, use `git merge upstream/main` in place of the rebase.", code: "git status --short\ngit fetch upstream\ngit switch main\ngit rebase upstream/main\ngit push origin main" },
    ],
    expected: "New pushes appear on the same PR and checks rerun. After the merge and sync, both your local main and your fork’s main contain the merged work.",
    mistake: "Opening another PR to address feedback, or pushing new work to main. Keep revisions on the original issue branch.",
  },
  {
    id: "faq",
    nav: "Troubleshooting and glossary",
    title: "Get unstuck",
    intro: "Start with `git status` to see your branch, changed files, and Git’s next suggested action. Read the full error before asking your editor for help.",
    actions: [
      { text: "Merge conflict. Git needs you to decide how two edits fit together. Run `git status`, open each conflicted file, review both edits, and remove the conflict markers. Stage the resolved paths and continue the operation you started. For a merge, use `git merge --continue` or `git merge --abort`.", label: "For a rebase conflict", code: "git status\ngit add PATH-TO-RESOLVED-FILE\ngit rebase --continue" },
      { text: "Push rejected. Run `git remote -v` to verify origin and `gh auth status` to check access. If Git says the remote has commits you lack, fetch and inspect before integrating. Ask a maintainer if the histories diverged or if you’re unsure whose commits are on the remote branch.", code: "git fetch origin\ngit status -sb" },
      { text: "Wrong branch. If you have uncommitted work on main and haven’t created the issue branch yet, use the branch command below to carry the edits to the new branch. If you already committed on the wrong branch, keep the commit and ask a maintainer for help moving it safely.", code: "git status\ngit switch -c feat/1-add-student-profile" },
      { text: "CI failing. On the PR, click Checks → Quality checks and read the first failing step. Use Node 24, run `npm ci`, and repeat the failing command locally. Fix it on the same branch and push again." },
    ],
    expected: "git status tells you whether an operation is still in progress. After a fix is pushed, the PR shows the new commit and fresh check results.",
    mistake: "Trying a destructive reset or a force push to clear an error. If a rebase is going badly, git rebase --abort returns to the state before that rebase.",
  },
];

export const glossary = [
  ["Repo", "The project’s files and their version history."],
  ["Issue", "A tracked task, bug report, or request."],
  ["Fork", "Your GitHub copy, linked to the official repo."],
  ["Clone", "The local copy on your computer."],
  ["Remote", "A named Git address, such as origin (your fork) or upstream (the official repo)."],
  ["Branch", "A separate line of work. Main is the official default branch."],
  ["Stage", "Select edits for your next commit."],
  ["Commit", "A saved set of changes with a message."],
  ["Fetch", "Download remote history without changing your current files."],
  ["Push", "Upload your local commits to a remote branch."],
  ["PR", "A pull request, or proposal for changes to be reviewed and merged."],
  ["CI", "Automated checks that run on your PR."],
  ["Merge", "Bring changes from one branch into another."],
  ["Rebase", "Replay your local commits on top of a different starting point."],
];
