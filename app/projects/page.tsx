import { getProjects } from "../lib/projects";
import ProjectsClient from "./ProjectsClient";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <ProjectsClient
      projects={projects.map(({ content: _content, ...project }) => project)}
    />
  );
}
