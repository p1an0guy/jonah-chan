import Section from "../components/Section";
import Timeline from "../components/Timeline";
import { experience } from "../data/experience";

export default function ExperiencePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      <Section
        anchor="experience"
        title="Experience"
        // subtitle="A timeline of roles focused on operational clarity."
      >
        <Timeline items={experience} />
      </Section>
    </div>
  );
}
