type TimelineItem = {
  role: string;
  company: string;
  span: string;
  focus: string;
};

type TimelineProps = {
  items: TimelineItem[];
};

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={`${item.company}-${item.role}`}
          className="rounded-2xl border border-accent/20 bg-panel/80 p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] uppercase tracking-[0.3em] text-foreground/60">
            <span>{item.span}</span>
            <span className="text-accent">{item.company}</span>
          </div>
          <h3 className="mt-4 text-xl font-semibold uppercase tracking-[0.1em]">
            {item.role}
          </h3>
          <p className="mt-3 text-sm text-foreground/70">{item.focus}</p>
        </div>
      ))}
    </div>
  );
}
