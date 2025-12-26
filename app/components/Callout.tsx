import type { ReactNode } from "react";

type CalloutProps = {
  children: ReactNode;
};

export default function Callout({ children }: CalloutProps) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-accent/20 bg-panel/70 px-4 py-3 text-sm text-foreground/80">
      <span className="text-accent">◆</span>
      <span>{children}</span>
    </div>
  );
}
