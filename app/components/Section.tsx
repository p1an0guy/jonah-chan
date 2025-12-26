import type { ReactNode } from "react";

type SectionProps = {
  title: string;
  subtitle?: string;
  anchor: string;
  children: ReactNode;
};

export default function Section({
  title,
  subtitle,
  anchor,
  children,
}: SectionProps) {
  return (
    <section id={anchor} className="scroll-mt-24 space-y-6">
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-accent/40" />
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
            {anchor}
          </span>
        </div>
        <h2 className="text-3xl font-semibold uppercase tracking-[0.12em]">
          {title}
        </h2>
        {subtitle ? (
          <p className="max-w-2xl text-sm text-foreground/70 md:text-base">
            {subtitle}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
