import type { ReactNode } from "react";

type TerminalPanelProps = {
  title: string;
  status?: string;
  children: ReactNode;
};

export default function TerminalPanel({
  title,
  status,
  children,
}: TerminalPanelProps) {
  return (
    <div className="rounded-2xl border border-accent/30 bg-panel/90 p-6 shadow-[0_0_30px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-foreground/60">
        <span>{title}</span>
        {status ? <span className="text-accent">{status}</span> : null}
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}
