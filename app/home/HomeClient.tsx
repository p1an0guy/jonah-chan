"use client";

import { motion } from "framer-motion";
import Button from "../components/Button";
import Callout from "../components/Callout";
import ProjectCard from "../components/ProjectCard";
import Section from "../components/Section";
import TerminalPanel from "../components/TerminalPanel";
import Timeline from "../components/Timeline";
import { contactInfo } from "../data/contact";
import { experience } from "../data/experience";

type ProjectSummary = {
  slug: string;
  title: string;
  summary: string;
  organization: string;
  role: string;
  stack: string[];
  status?: "active" | "shipped";
};

type HomeClientProps = {
  projects: ProjectSummary[];
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HomeClient({ projects }: HomeClientProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]"
      >
        <motion.div variants={fadeUp} className="space-y-6">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-accent ml-[0.4em]">
            Jonah Chan
          </p>
          <h1 className="text-4xl font-semibold uppercase tracking-[0.08em] text-foreground sm:text-5xl">
            AI + FullStack
            <span className="text-accent"> Software Engineer</span>
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-foreground/70 md:text-lg">
            CPE @ Cal Poly SLO
            <br />
            AWS/Cal Poly DxHub Software Engineering Intern
            <br />
            CodeBox Project Tech Lead, PolySat Software Team
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button href="/projects">View Projects</Button>
            <Button href="/resume.pdf" variant="outline">
              Resume
            </Button>
          </div>
        </motion.div>

        <motion.div variants={fadeUp}>
          <TerminalPanel title="signal.profile" status="active">
            <div className="space-y-4 font-mono text-sm text-foreground/80">
              <p>
                <span className="text-accent">➜</span> role --focus=dev-ops
              </p>
              <p>
                <span className="text-accent">✔</span> Systems thinking enabled
              </p>
              <p>
                <span className="text-accent">✔</span> Design + build cadence
              </p>
              <p>
                <span className="text-accent">✔</span> Prototype + production
              </p>
              <p className="text-foreground/60">
                Available for 2026 engagements in San Luis Obispo or remote.
              </p>
            </div>
          </TerminalPanel>
        </motion.div>
      </motion.section>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-24"
      >
        <Section
          anchor="about"
          title="About"
          // subtitle="Designing calm surfaces for mission-critical teams."
        >
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
            <motion.div variants={fadeUp} className="space-y-4 text-sm">
              <p className="text-foreground/70">
                I tackle complex, public-sector problems utilizing AWS
                infrastructure to create fast and innovative solutions. My
                development cycle blends rapid protytyping, feedback, and
                iteration to deliver results efficiently and to ensure client
                satisfaction.
              </p>
              <p className="text-foreground/70">
                I lead a product team for CodeBox at Cal Poly, using GitHub for
                project management and version control. I am also an engineer on
                the Cal Poly Cube Satellite Laboratory, the student-run,
                multidisciplinary research lab that founded the CubeSat
                standard.
              </p>
              <p className="text-foreground/70">
                Outside of programming, I love playing instruments and producing
                electronic music.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="space-y-3">
              <Callout>AWS Academy Certified Cloud Developer</Callout>
              <Callout>
                Experienced in low and high level programming (C/C++, Python)
              </Callout>
              <Callout>Agile development cycles</Callout>
            </motion.div>
          </div>
        </Section>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-24"
      >
        <Section
          anchor="projects"
          title="Featured projects"
          // subtitle="A selection of builds that pair telemetry with decisive action."
        >
          <div className="grid gap-6 md:grid-cols-3">
            {projects.slice(0, 6).map((project) => (
              <motion.div key={project.slug} variants={fadeUp}>
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>
        </Section>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-24"
      >
        <Section
          anchor="experience"
          title="Experience highlights"
          subtitle="Recent roles building tooling for operational clarity."
        >
          <Timeline items={experience.slice(0, 3)} />
        </Section>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-24"
      >
        <Section
          anchor="skills"
          title="Skills"
          subtitle="Tooling and platforms I use to shape operational products."
        >
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                label: "Languages",
                items: [
                  "Python - Data Pipelines and AI Apps",
                  "C/C++ - Real-time Performance",
                  "Java - Object-Oriented Programming",
                ],
              },
              {
                label: "Web Development",
                items: [
                  "TypeScript - Front/Backend Functionality",
                  "React - Interactive Websites",
                  "Supabase - Databases and Storage",
                ],
              },
              {
                label: "AWS",
                items: [
                  "Lambda - Serverless Processing",
                  "API Gateway - Microservices Architecture",
                  "CDK/CloudFormation - Cloud Deployment",
                ],
              },
            ].map((group) => (
              <motion.div
                key={group.label}
                variants={fadeUp}
                className="rounded-2xl border border-accent/20 bg-panel/80 p-6"
              >
                <h3 className="text-lg font-semibold uppercase tracking-[0.1em]">
                  {group.label}
                </h3>
                <div className="mt-4 space-y-2 text-sm text-foreground/70">
                  {group.items.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="text-accent">◆</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-24"
      >
        <Section
          anchor="contact"
          title="Contact"
          subtitle="Interested? Let's talk."
        >
          <TerminalPanel title="contact.channel" status="open">
            <div className="space-y-4 text-sm text-foreground/70">
              <p>
                Open to full or part-time roles and consulting. Share a brief
                and I will respond within 24 hours.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button href="/contact" size="sm">
                  Start a project
                </Button>
                <Button
                  href={`mailto:${contactInfo.email}`}
                  variant="outline"
                  size="sm"
                >
                  Email me
                </Button>
              </div>
            </div>
          </TerminalPanel>
        </Section>
      </motion.div>
    </div>
  );
}
