import { notFound } from "next/navigation";
import Callout from "../../components/Callout";
import IconLink from "../../components/IconLink";
import Section from "../../components/Section";
import TagPill from "../../components/TagPill";
import TerminalPanel from "../../components/TerminalPanel";
import { getProjectBySlug, getProjectSlugs, getProjects } from "../../lib/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projects = await getProjects();
  const currentIndex = projects.findIndex((item) => item.slug === slug);
  const previous = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const next =
    currentIndex >= 0 && currentIndex < projects.length - 1
      ? projects[currentIndex + 1]
      : null;
  const hasSolutionOverview = Boolean(project.solutionOverview);
  const hasProblem = Boolean(project.problem);
  const hasConstraints = project.constraints.length > 0;
  const hasArchitecture = Boolean(project.architecture);
  const hasImpact = project.impact.length > 0;
  const hasStack = project.stack.length > 0;
  const hasTags = project.tags.length > 0;
  const hasLinks = project.links.length > 0;
  const hasGallery = project.gallery.length > 0;

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      <Section
        anchor="project"
        title={project.title}
        subtitle={project.summary}
      >
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8 text-sm text-foreground/70">
            {hasSolutionOverview ? (
              <div>
                <h3 className="text-xs uppercase tracking-[0.3em] text-foreground/60">
                  Solution overview
                </h3>
                <p className="mt-3">{project.solutionOverview}</p>
              </div>
            ) : null}
            {hasProblem ? (
              <div>
                <h3 className="text-xs uppercase tracking-[0.3em] text-foreground/60">
                  Problem
                </h3>
                <p className="mt-3">{project.problem}</p>
              </div>
            ) : null}
            {hasConstraints ? (
              <div>
                <h3 className="text-xs uppercase tracking-[0.3em] text-foreground/60">
                  Constraints
                </h3>
                <div className="mt-3 space-y-3">
                  {project.constraints.map((item) => (
                    <Callout key={item}>{item}</Callout>
                  ))}
                </div>
              </div>
            ) : null}
            {hasArchitecture ? (
              <div>
                <h3 className="text-xs uppercase tracking-[0.3em] text-foreground/60">
                  Architecture
                </h3>
                <p className="mt-3">{project.architecture}</p>
              </div>
            ) : null}
            {hasImpact ? (
              <div>
                <h3 className="text-xs uppercase tracking-[0.3em] text-foreground/60">
                  Impact
                </h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-foreground/70">
                  {project.impact.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div className="space-y-6">
            <TerminalPanel title="project.details" status={project.status}>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/60">
                    Organization
                  </p>
                  <p className="mt-2 text-foreground">{project.organization}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/60">
                    Role
                  </p>
                  <p className="mt-2 text-foreground">{project.role}</p>
                </div>
                {hasStack ? (
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/60">
                      Stack
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <TagPill key={item} label={item} />
                      ))}
                    </div>
                  </div>
                ) : null}
                {hasTags ? (
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/60">
                      Tags
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.tags.map((item) => (
                        <TagPill key={item} label={item} />
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </TerminalPanel>

            {hasLinks ? (
              <TerminalPanel title="links">
                <div className="space-y-3">
                  {project.links.map((link) => (
                    <IconLink
                      key={link.url}
                      href={link.url}
                      label={link.label}
                      external
                    />
                  ))}
                </div>
              </TerminalPanel>
            ) : null}
          </div>
        </div>

        {hasGallery ? (
          <div className="mt-12 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.3em] text-foreground/60">
              Gallery
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              {project.gallery.map((item) => (
                <div
                  key={item.src}
                  className="overflow-hidden rounded-2xl border border-accent/20 bg-panel/80"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-accent/20 pt-6 text-xs uppercase tracking-[0.3em]">
          <div className="flex items-center gap-4">
            {previous ? (
              <IconLink
                href={`/projects/${previous.slug}`}
                label={`Prev: ${previous.title}`}
              />
            ) : null}
          </div>
          <IconLink href="/projects" label="Back to projects" />
          <div className="flex items-center gap-4">
            {next ? (
              <IconLink
                href={`/projects/${next.slug}`}
                label={`Next: ${next.title}`}
              />
            ) : null}
          </div>
        </div>
      </Section>
    </div>
  );
}
