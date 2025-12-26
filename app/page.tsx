import HomeClient from "./home/HomeClient";
import { getProjects } from "./lib/projects";

export default async function Home() {
  const projects = await getProjects();

  return (
    <HomeClient
      projects={projects.map(({ content: _content, ...project }) => project)}
    />
  );
}
