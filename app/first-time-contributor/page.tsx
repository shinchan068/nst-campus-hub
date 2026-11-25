import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { beginnerIssues, glossary, steps } from "@/data/first-time-contributor";
import { CopyButton, GuideContents } from "./guide-controls";
import { ForkCompareExample, GuideScreenshot, RemotesDiagram, WorkflowDiagram } from "./guide-visuals";

export const metadata: Metadata = {
  title: "First-time contributor guide | NST Campus Hub",
  description: "Make your first open source contribution to NST Campus Hub, from setting up Git to getting a pull request reviewed.",
};

function InlineText({ text }: { text: string }) {
  return text.split("`").map((part, index) => index % 2 ? (
    <code key={index} className="rounded bg-muted px-1 py-0.5 font-mono text-[0.87em] wrap-anywhere text-foreground">{part}</code>
  ) : part);
}

function CodeBlock({ code, label = "Terminal commands" }: { code: string; label?: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted px-3 py-2 text-xs font-semibold text-muted-foreground">
        <span>{label}</span>
        <CopyButton code={code} label={label} />
      </div>
      <pre aria-label={label} className="bg-foreground p-3 font-mono text-xs leading-relaxed wrap-anywhere whitespace-pre-wrap text-background sm:p-4 sm:text-sm"><code>{code}</code></pre>
    </div>
  );
}

export default function FirstTimeContributorPage() {
  return (
    <>
      <section className="grid items-center gap-6 rounded-3xl border border-border bg-card p-5 sm:p-8 lg:grid-cols-[1fr_1fr] lg:p-10" aria-labelledby="guide-title">
        <div>
          <Badge variant="secondary" className="mb-4">Open source at NST</Badge>
          <h1 id="guide-title" className="text-4xl leading-tight font-bold tracking-tight sm:text-5xl">First-time contributor guide</h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Start with your first Git command and finish with a Campus Hub pull request you can explain. You can use an AI editor at each step.
          </p>
          <a href="#basics" className="mt-5 inline-flex rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Start with the basics <span className="ml-2" aria-hidden="true">↓</span></a>
        </div>
        <WorkflowDiagram />
      </section>

      <div className="mt-6 grid items-start gap-5 lg:mt-9 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-8">
        <aside className="sticky top-2 z-10 min-w-0 self-start lg:top-4">
          <GuideContents chapters={steps.map(({ id, nav }) => ({ id, nav }))} />
        </aside>
        <div className="grid min-w-0 gap-5 sm:gap-7">
          {steps.map((step, index) => (
            <article key={step.id} id={step.id} aria-labelledby={`${step.id}-title`} className="min-w-0 scroll-mt-20 rounded-2xl border border-border bg-card p-4 sm:p-7 lg:scroll-mt-5">
              <div className="flex items-start gap-3 sm:gap-4">
                <span aria-label={`Step ${index + 1}`} className="grid size-9 shrink-0 place-items-center rounded-lg bg-secondary font-mono text-sm font-bold text-secondary-foreground">{String(index + 1).padStart(2, "0")}</span>
                <h2 id={`${step.id}-title`} className="self-center text-xl leading-tight font-bold tracking-tight sm:text-2xl">{step.title}</h2>
              </div>
              <p className="mt-4 leading-relaxed text-muted-foreground"><InlineText text={step.intro} /></p>
              <div className="mt-4 grid min-w-0 gap-4">
                {step.id === "fork" && <RemotesDiagram />}
                {step.actions.map(({ text, link, code, label }, actionIndex) => (
                  <div className="grid min-w-0 gap-2" key={actionIndex}>
                    <p className="leading-relaxed"><InlineText text={text} /></p>
                    {link && <a href={link.href} className="w-fit text-sm font-semibold text-primary underline underline-offset-4">{link.label} <span aria-hidden="true">↗</span></a>}
                    {code && <CodeBlock code={code} label={label} />}
                  </div>
                ))}
                {(step.id === "issue" || step.id === "fork") && <GuideScreenshot name={step.id} />}
                {step.id === "pr" && <><GuideScreenshot name="compare" /><ForkCompareExample /></>}
                {step.id === "review" && <GuideScreenshot name="checks" />}
              </div>
              <dl className="mt-5 grid gap-2 sm:grid-cols-2">
                <div className="rounded-xl bg-secondary p-3 text-secondary-foreground">
                  <dt className="text-sm font-semibold">What you should see</dt>
                  <dd className="mt-1 text-sm leading-relaxed"><InlineText text={step.expected} /></dd>
                </div>
                <div className="rounded-xl border border-border bg-muted p-3">
                  <dt className="text-sm font-semibold">Common mistake</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground"><InlineText text={step.mistake} /></dd>
                </div>
              </dl>
              {step.id === "faq" && (
                <>
                  <h3 className="mt-6 text-lg font-bold">Glossary</h3>
                  <dl className="mt-2 grid gap-x-5 sm:grid-cols-2">
                    {glossary.map(([term, meaning]) => (
                      <div key={term} className="border-t border-border py-2.5 text-sm">
                        <dt className="font-semibold">{term}</dt>
                        <dd className="mt-0.5 text-muted-foreground">{meaning}</dd>
                      </div>
                    ))}
                  </dl>
                </>
              )}
            </article>
          ))}
          <section className="rounded-2xl bg-primary p-5 text-primary-foreground sm:p-7" aria-labelledby="claim-title">
            <h2 id="claim-title" className="text-xl font-bold sm:text-2xl">You’re ready. Go claim a good first issue.</h2>
            <p className="mt-2 leading-relaxed">Open an unassigned issue, ask to work on it in a GitHub comment, and wait until your username appears under Assignees.</p>
            <a href={beginnerIssues} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-card px-4 py-2.5 text-sm font-semibold text-primary hover:bg-secondary focus-visible:outline-primary-foreground">Browse good first issues <span aria-hidden="true">↗</span></a>
          </section>
        </div>
      </div>
    </>
  );
}
