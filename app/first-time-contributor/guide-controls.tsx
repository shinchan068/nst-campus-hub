"use client";

import { useEffect, useState } from "react";

type Chapter = { id: string; nav: string };

export function GuideContents({ chapters }: { chapters: Chapter[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const sections = chapters.map(({ id }) => document.getElementById(id));
    let frame = 0;

    function update() {
      frame = 0;
      const index = sections.findLastIndex((section) => section && section.getBoundingClientRect().top <= 96);
      setCurrent(Math.max(0, index));
    }

    function scheduleUpdate() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      cancelAnimationFrame(frame);
    };
  }, [chapters]);

  function chapterLinks(closeMenu: boolean) {
    return (
      <ol className="grid gap-0.5">
        {chapters.map(({ id, nav }, index) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={index === current ? "location" : undefined}
              onClick={(event) => {
                if (closeMenu) {
                  const menu = event.currentTarget.closest("details");
                  menu?.querySelector("summary")?.focus({ preventScroll: true });
                  menu?.removeAttribute("open");
                }
              }}
              className="flex items-baseline gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-muted aria-[current=location]:bg-secondary aria-[current=location]:font-semibold aria-[current=location]:text-secondary-foreground"
            >
              <span className="w-5 shrink-0 font-mono text-xs tabular-nums">{String(index + 1).padStart(2, "0")}</span>
              {nav}
            </a>
          </li>
        ))}
      </ol>
    );
  }

  const progress = (
    <progress
      aria-label="Current guide step"
      value={current + 1}
      max={chapters.length}
      className="block h-1.5 w-full overflow-hidden rounded-full bg-muted accent-primary [&::-moz-progress-bar]:bg-primary [&::-webkit-progress-bar]:bg-muted [&::-webkit-progress-value]:bg-primary"
    />
  );

  return (
    <>
      <nav aria-label="Guide contents" className="hidden max-h-[calc(100svh-2rem)] overflow-y-auto rounded-2xl border border-border bg-card p-4 lg:block">
        <p className="px-2 font-semibold">On this page</p>
        <p className="mt-2 px-2 text-xs font-medium text-muted-foreground">Step {current + 1} of {chapters.length}</p>
        <div className="mx-2 mt-2 mb-3">{progress}</div>
        {chapterLinks(false)}
      </nav>
      <nav aria-label="Guide contents" className="rounded-xl border border-border bg-card shadow-sm lg:hidden">
        <details>
          <summary className="cursor-pointer px-3 py-2 text-sm font-semibold text-primary focus-visible:outline-2 focus-visible:outline-offset-2">
            On this page <span className="ml-2 font-medium text-muted-foreground">Step {current + 1} of {chapters.length}</span>
          </summary>
          <div className="max-h-[55svh] overflow-y-auto border-t border-border px-2 py-1">{chapterLinks(true)}</div>
        </details>
        <div className="px-3 pb-2">{progress}</div>
      </nav>
    </>
  );
}

export function CopyButton({ code, label }: { code: string; label: string }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!message) return;
    const timeout = setTimeout(() => setMessage(""), 2500);
    return () => clearTimeout(timeout);
  }, [message]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setMessage("Copied");
    } catch {
      setMessage("Select text to copy");
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${label.toLowerCase()}`}
      className="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-semibold text-primary hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <span aria-live="polite">{message || "Copy"}</span>
    </button>
  );
}
