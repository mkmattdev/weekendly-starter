import type { ReactNode } from "react";
import { Link } from "react-router";

type AppLayoutProps = { children: ReactNode };

export const TAppLayout = ({ children }: AppLayoutProps) => (
  <div className="flex min-h-dvh flex-col">
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only"
    >
      Skip to content
    </a>
    <header className="border-b border-line/40 bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <Link
          to="/"
          aria-label="Weekendly home"
          className="text-xl font-semibold text-accent"
        >
          Weekendly.
        </Link>
      </div>
    </header>
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto w-full max-w-6xl flex-1 px-4 py-10"
    >
      {children}
    </main>
    <footer className="border-t border-line/40 bg-surface">
      <div
        className={[
          "mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-6",
          "text-sm text-muted",
        ].join(" ")}
      >
        <span>Weekendly. Plan your next weekend.</span>
        <span>Built with React, Redux Toolkit, and Tailwind CSS.</span>
      </div>
    </footer>
  </div>
);
