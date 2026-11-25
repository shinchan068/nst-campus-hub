import Image from "next/image";
import Link from "next/link";
import { EventCard } from "@/components/event-card";
import { Badge } from "@/components/ui/badge";
import { getEvents, getProjects, getStudents } from "@/lib/data";
import gitBranchesIllustration from "@/public/git-branches.webp";

export default async function HomePage() {
  const [students, projects, events] = await Promise.all([getStudents(), getProjects(), getEvents()]);

  const stats = [
    { label: "Contributors", count: students.length },
    { label: "Student projects", count: projects.length },
    { label: "Campus events", count: events.length },
  ];

  return (
    <>
      <section className="grid overflow-hidden rounded-3xl border border-border bg-card lg:grid-cols-2">
        <div className="self-center p-6 sm:p-10 lg:p-12">
          <Badge variant="secondary" className="mb-5">Open source practice repo</Badge>
          <h1 className="text-4xl leading-tight font-bold tracking-tight sm:text-5xl xl:text-[3.25rem]">NST Campus Hub</h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Explore what Newton School of Technology students build and learn, then make your first open source contribution.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/projects" className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Explore projects</Link>
            <Link href="/people" className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-primary hover:bg-secondary">Meet the students</Link>
          </div>
          <Link href="/first-time-contributor" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">New here? Start here</Link>
        </div>
        <Image
          src={gitBranchesIllustration}
          alt="Coding illustration"
          preload
          sizes="(min-width: 72rem) 34rem, (min-width: 64rem) 50vw, 100vw"
          className="aspect-[3/2] h-full w-full object-cover"
        />
      </section>

      <dl className="mt-5 grid grid-cols-1 divide-y divide-border rounded-2xl border border-border bg-card min-[28rem]:grid-cols-3 min-[28rem]:divide-x min-[28rem]:divide-y-0">
        {stats.map(({ label, count }) => (
          <div key={label} className="flex flex-row-reverse items-center justify-end gap-3 px-5 py-3 min-[28rem]:flex-col-reverse min-[28rem]:items-start min-[28rem]:gap-1 sm:p-6">
            <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
            <dd className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">{count}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-10 sm:mt-12" aria-labelledby="latest-events">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
          <h2 id="latest-events" className="text-2xl font-bold tracking-tight sm:text-3xl">Latest events</h2>
          <Link href="/events" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">View all events <span aria-hidden="true">→</span></Link>
        </div>
        <ul className="grid gap-4 md:grid-cols-3">
          {events.slice(0, 3).map((event) => <li key={event.slug}><EventCard event={event} heading="h3" /></li>)}
        </ul>
      </section>
    </>
  );
}
