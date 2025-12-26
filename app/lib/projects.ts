import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const projectsDir = path.join(process.cwd(), "content", "projects");

export const projectFrontmatterSchema = z.object({
  order: z.number().int().min(1, "Order is required."),
  title: z.string().min(1, "Title is required."),
  summary: z.string().min(1, "Summary is required."),
  solutionOverview: z.string().min(1).optional(),
  problem: z.string().min(1).optional(),
  constraints: z.array(z.string().min(1)).optional().default([]),
  architecture: z.string().min(1).optional(),
  impact: z.array(z.string().min(1)).optional().default([]),
  organization: z.string().min(1, "Organization is required."),
  role: z.string().min(1, "Role is required."),
  stack: z.array(z.string().min(1)).optional().default([]),
  tags: z.array(z.string().min(1)).optional().default([]),
  status: z.enum(["active", "shipped"]),
  links: z
    .array(
      z.object({
        label: z.string().min(1),
        url: z.string().url(),
      }),
    )
    .optional()
    .default([]),
  gallery: z
    .array(
      z.object({
        src: z.string().min(1),
        alt: z.string().min(1),
      }),
    )
    .optional()
    .default([]),
});

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;

export type Project = ProjectFrontmatter & {
  slug: string;
  content: string;
};

export async function getProjectSlugs() {
  const entries = await fs.readdir(projectsDir);
  return entries
    .filter((entry) => entry.endsWith(".mdx"))
    .map((entry) => entry.replace(/\.mdx$/, ""));
}

export async function getProjects() {
  const slugs = await getProjectSlugs();
  const projects = await Promise.all(slugs.map((slug) => getProjectBySlug(slug)));
  return projects
    .filter((project): project is Project => Boolean(project))
    .sort((a, b) => a.order - b.order);
}

export async function getProjectBySlug(slug: string) {
  const filePath = path.join(projectsDir, `${slug}.mdx`);
  const source = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(source);
  const parsed = projectFrontmatterSchema.safeParse(data);

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join(", ");
    throw new Error(`Invalid frontmatter in ${slug}.mdx (${issues})`);
  }

  return {
    slug,
    content,
    ...parsed.data,
  };
}
