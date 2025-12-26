type TagPillProps = {
  label: string;
};

export default function TagPill({ label }: TagPillProps) {
  return (
    <span className="rounded-full border border-accent/30 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-accent">
      {label}
    </span>
  );
}
