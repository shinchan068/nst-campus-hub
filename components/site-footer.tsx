import { FooterCopyright } from "@/components/footer-copyright";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-x-6 gap-y-2 px-5 py-6 text-sm text-muted-foreground sm:px-8">
        <FooterCopyright />
        <p>An open source practice project for Newton School of Technology.</p>
      </div>
    </footer>
  );
}
