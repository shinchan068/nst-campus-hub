import Image from "next/image";

const flow = [
  ["Fork", "Copy on GitHub", "col-start-1 row-start-1", "→"],
  ["Clone", "Download to your computer", "col-start-2 row-start-1", "→"],
  ["Branch", "Start your issue", "col-start-3 row-start-1", "↓"],
  ["Commit", "Save your edits", "col-start-3 row-start-2", "←"],
  ["Push", "Publish to your fork", "col-start-2 row-start-2", "←"],
  ["Open a PR", "Propose your change", "col-start-1 row-start-2", "↓"],
  ["Review", "Check and revise", "col-start-1 row-start-3", "→"],
  ["Merge", "Accept into main", "col-start-2 row-start-3", "→"],
  ["Sync", "Update your fork", "col-start-3 row-start-3", ""],
];

export function WorkflowDiagram() {
  return (
    <figure className="rounded-2xl border border-primary/15 bg-secondary p-4 sm:p-5">
      <figcaption className="mb-3 text-sm font-semibold text-secondary-foreground">From your first fork to the next issue</figcaption>
      <ol className="grid grid-cols-3 gap-2">
        {flow.map(([name, description, position, next], index) => (
          <li key={name} className={`rounded-lg border border-primary/15 bg-card p-2.5 sm:p-3 ${position}`}>
            <div className="flex items-start justify-between gap-1">
              <span className="font-mono text-xs font-semibold text-primary">{String(index + 1).padStart(2, "0")}</span>
              {next && <span aria-hidden="true" className="text-xs text-primary">{next}</span>}
            </div>
            <p className="mt-1 text-xs font-bold sm:text-sm">{name}</p>
            <p className="mt-0.5 text-[0.7rem] leading-snug text-muted-foreground sm:text-xs">{description}</p>
          </li>
        ))}
      </ol>
    </figure>
  );
}

const remoteFlow = [
  { name: "upstream", place: "Official repo on GitHub", detail: "Maintainers merge PRs into main.", arrow: "↓ Fork on GitHub" },
  { name: "origin", place: "Your fork on GitHub", detail: "Your pushed branches live here.", arrow: "↓ Clone to your computer" },
  { name: "local", place: "Your computer", detail: "Edit, run the app, and commit here." },
];

export function RemotesDiagram() {
  return (
    <figure className="rounded-2xl border border-border bg-muted p-4 sm:p-5">
      <figcaption className="mb-3 text-sm font-semibold">Where your code lives</figcaption>
      <ol className="grid gap-2">
        {remoteFlow.map(({ name, place, detail, arrow }) => (
          <li key={name}>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-border bg-card px-3 py-2.5">
              <code className="rounded-md bg-secondary px-2 py-1 text-xs font-semibold text-secondary-foreground">{name}</code>
              <span className="text-sm font-semibold">{place}</span>
              <span className="text-xs text-muted-foreground">{detail}</span>
            </div>
            {arrow && <p className="mt-2 pl-3 text-xs font-semibold text-primary">{arrow}</p>}
          </li>
        ))}
      </ol>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Push sends commits from local to origin. Fetch brings upstream history to local. A PR proposes changes from origin to upstream.</p>
    </figure>
  );
}

const screenshots = {
  issue: { file: "issues", height: 715, alt: "The Campus Hub Issues list with good first issue labels and the student profile task.", caption: "GitHub screenshot · Look for the good first issue label and check the assignees on the issue itself." },
  compare: { file: "compare", height: 485, alt: "The Campus Hub Compare changes screen showing the compare across forks link above the base and compare dropdowns.", caption: "GitHub screenshot · Choose compare across forks to select your fork and branch." },
  checks: { file: "checks", height: 650, alt: "The Campus Hub CI result for pull request 25 showing a successful Quality checks job.", caption: "GitHub screenshot · A successful Quality checks workflow, reached through the PR’s Checks tab. Sign in to open detailed logs." },
  fork: { file: "fork", height: 580, alt: "The Campus Hub repository header with the Fork button near the upper right.", caption: "GitHub screenshot · Start with the Fork button in the official repository’s header." },
};

export function GuideScreenshot({ name }: { name: keyof typeof screenshots }) {
  const { file, height, alt, caption } = screenshots[name];
  const src = `/guide/${file}.webp`;
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-muted">
      <a href={src} aria-label={`Open full-size screenshot. ${alt}`} className="block focus-visible:-outline-offset-4">
        <Image src={src} width={1220} height={height} alt={alt} sizes="(min-width: 1024px) 740px, 100vw" className="h-auto w-full" />
      </a>
      <figcaption className="px-3 py-2 text-xs leading-relaxed text-muted-foreground">{caption} Select the image to zoom.</figcaption>
    </figure>
  );
}

export function ForkCompareExample() {
  return (
    <figure className="rounded-xl border border-border bg-muted p-3 sm:p-4">
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="text-xs font-semibold text-primary">Base · where the change goes</p>
          <p className="mt-1 text-sm font-semibold wrap-anywhere">shinchan068/nst-campus-hub</p>
          <code className="text-xs text-muted-foreground">main</code>
        </div>
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="text-xs font-semibold text-primary">Head · where your work is</p>
          <p className="mt-1 text-sm font-semibold wrap-anywhere">YOUR-USERNAME/nst-campus-hub</p>
          <code className="text-xs wrap-anywhere text-muted-foreground">feat/1-add-student-profile</code>
        </div>
      </div>
      <figcaption className="mt-2 text-xs leading-relaxed text-muted-foreground">
        Annotated illustration · The public compare page shows main on both sides by default. Sign in and push a branch to your fork to make the comparison shown here.
      </figcaption>
    </figure>
  );
}
