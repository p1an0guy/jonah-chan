type Metric = {
  label: string;
  value: string;
};

type MetricListProps = {
  metrics: Metric[];
};

export default function MetricList({ metrics }: MetricListProps) {
  return (
    <div className="grid gap-4">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="rounded-xl border border-accent/20 bg-background/80 px-4 py-3"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-foreground/60">
            {metric.label}
          </p>
          <p className="mt-2 text-2xl font-semibold text-accent">
            {metric.value}
          </p>
        </div>
      ))}
    </div>
  );
}
