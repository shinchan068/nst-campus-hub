import Link from "next/link";

const navigation = [
  { label: "Home", href: "/" },
  { label: "People", href: "/people" },
  { label: "Projects", href: "/projects" },
  { label: "Events", href: "/event" },
  { label: "Resources", href: "/resources" },
  { label: "Contributor guide", href: "/first-time-contributor" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-8">
        <Link href="/" className="inline-flex w-fit items-center gap-3 font-bold">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-xs tracking-wide text-primary-foreground" aria-hidden="true">NST</span>
          <span>NST Campus Hub</span>
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-muted-foreground sm:gap-x-7">
            {navigation.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="inline-block py-1 hover:text-primary">{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
