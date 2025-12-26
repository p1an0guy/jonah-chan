import Link from "next/link";
import TagPill from "./TagPill";

type ProjectCardProps = {
  slug: string;
  title: string;
  summary: string;
  organization: string;
  role: string;
  stack: string[];
  status?: "active" | "shipped";
};

export default function ProjectCard({
  slug,
  title,
  summary,
  organization,
  role,
  stack,
  status,
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="group flex h-full flex-col rounded-2xl border border-accent/20 bg-panel/80 p-6 transition hover:border-accent/60 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-foreground/60">
        <span>{organization}</span>
        <span className="text-accent">
          {status ? status : "open"}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold uppercase tracking-[0.1em] text-foreground">
        {title}
      </h3>
      <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        {role}
      </p>
      <p className="mt-4 text-sm text-foreground/70">{summary}</p>
      {stack.length > 0 ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {stack.map((item) => (
            <TagPill key={item} label={item} />
          ))}
        </div>
      ) : null}
      <div className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-accent transition group-hover:text-foreground whitespace-nowrap">
        view details
      </div>
    </Link>
  );
}
