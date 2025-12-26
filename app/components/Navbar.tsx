"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/$/, "");

  const activeHref = useMemo(() => {
    if (normalizedPath.startsWith("/projects")) {
      return "/projects";
    }
    return navLinks.find((link) => link.href === normalizedPath)?.href ?? "/";
  }, [normalizedPath]);

  return (
    <header className="border-b border-accent/20 bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="text-xs font-semibold uppercase tracking-[0.4em] text-foreground sm:text-sm"
        >
          Jonah Chan
        </Link>
        <div className="flex items-center gap-3 sm:hidden">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="rounded-full border border-accent/30 px-3 py-2 text-[10px] uppercase tracking-[0.3em] text-foreground/80"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>
        <nav className="hidden flex-1 items-center justify-end gap-5 text-xs uppercase tracking-[0.3em] text-foreground/70 sm:flex md:text-sm">
          {navLinks.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition ${
                  isActive
                    ? "text-accent drop-shadow-[0_0_8px_var(--accent-glow)]"
                    : "hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden sm:block" />
      </div>
      <div
        id="mobile-menu"
        className={`border-t border-accent/10 bg-background/90 px-6 py-4 transition sm:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col gap-4 text-xs uppercase tracking-[0.3em] text-foreground/70">
          {navLinks.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition ${
                  isActive ? "text-accent" : "hover:text-accent"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
