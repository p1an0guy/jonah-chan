"use client";

import { useMemo, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import Section from "../components/Section";
import TagPill from "../components/TagPill";

type ProjectSummary = {
  slug: string;
  title: string;
  summary: string;
  organization: string;
  role: string;
  stack: string[];
  tags: string[];
  status: "active" | "shipped";
};

type ProjectsClientProps = {
  projects: ProjectSummary[];
};

const sortUnique = (values: string[]) => [...new Set(values)].sort();

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [query, setQuery] = useState("");
  const [organization, setOrganization] = useState("all");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const organizations = useMemo(
    () => sortUnique(projects.map((project) => project.organization)),
    [projects],
  );
  const roles = useMemo(
    () => sortUnique(projects.map((project) => project.role)),
    [projects],
  );
  const tags = useMemo(
    () => sortUnique(projects.flatMap((project) => project.tags)),
    [projects],
  );
  const hasTags = tags.length > 0;

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesQuery =
        !normalized ||
        project.title.toLowerCase().includes(normalized) ||
        project.summary.toLowerCase().includes(normalized) ||
        project.tags.some((tag) => tag.toLowerCase().includes(normalized));
      const matchesOrganization =
        organization === "all" || project.organization === organization;
      const matchesRole = role === "all" || project.role === role;
      const matchesStatus = status === "all" || project.status === status;
      const matchesTags =
        activeTags.length === 0 ||
        activeTags.every((tag) => project.tags.includes(tag));

      return (
        matchesQuery &&
        matchesOrganization &&
        matchesRole &&
        matchesStatus &&
        matchesTags
      );
    });
  }, [projects, query, organization, role, status, activeTags]);

  const toggleTag = (tag: string) => {
    setActiveTags((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag],
    );
  };

  const clearFilters = () => {
    setQuery("");
    setOrganization("all");
    setRole("all");
    setStatus("all");
    setActiveTags([]);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      <Section
        anchor="projects"
        title="Projects index"
        subtitle="Filter across systems work, organizations, and delivery status."
      >
        <div className="grid gap-4 rounded-2xl border border-accent/20 bg-panel/80 p-6 md:grid-cols-2">
          <label className="text-xs uppercase tracking-[0.3em] text-foreground/70">
            Search
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="search"
              placeholder="Search title, summary, tags"
              className="mt-2 w-full rounded-xl border border-accent/30 bg-background/80 px-3 py-2 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-xs uppercase tracking-[0.3em] text-foreground/70">
              Organization
              <select
                value={organization}
                onChange={(event) => setOrganization(event.target.value)}
                className="mt-2 w-full rounded-xl border border-accent/30 bg-background/80 px-3 py-2 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <option value="all">All</option>
                {organizations.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-xs uppercase tracking-[0.3em] text-foreground/70">
              Role
              <select
                value={role}
                onChange={(event) => setRole(event.target.value)}
                className="mt-2 w-full rounded-xl border border-accent/30 bg-background/80 px-3 py-2 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <option value="all">All</option>
                {roles.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-xs uppercase tracking-[0.3em] text-foreground/70">
              Status
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="mt-2 w-full rounded-xl border border-accent/30 bg-background/80 px-3 py-2 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="shipped">Shipped</option>
              </select>
            </label>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 rounded-full border border-accent/30 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-foreground/80 transition hover:border-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Reset filters
            </button>
          </div>
        </div>

        {hasTags ? (
          <div className="mt-6 space-y-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/60">
              Tags
            </p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.3em] transition focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    activeTags.includes(tag)
                      ? "border-accent bg-accent text-black"
                      : "border-accent/30 text-accent hover:border-accent"
                  }`}
                  aria-pressed={activeTags.includes(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-10 text-xs uppercase tracking-[0.3em] text-foreground/60">
          {filtered.length} results
        </div>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-accent/20 bg-panel/70 p-6 text-sm text-foreground/70">
            No matches. Try clearing filters or adjusting the search terms.
          </div>
        ) : null}

        {hasTags ? (
          <div className="mt-10 flex flex-wrap gap-2">
            {activeTags.map((tag) => (
              <TagPill key={tag} label={tag} />
            ))}
          </div>
        ) : null}
      </Section>
    </div>
  );
}
