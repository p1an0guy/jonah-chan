export type ExperienceItem = {
  role: string;
  company: string;
  span: string;
  focus: string;
  highlights?: string[];
};

export const experienceTemplate: ExperienceItem[] = [
  {
    role: "Role Title",
    company: "Company Name",
    span: "2023 - Present",
    focus: "Short summary of impact and scope.",
    highlights: [
      "Highlight one describing results or scope.",
      "Highlight two capturing ownership or outcomes.",
    ],
  },
  {
    role: "Role Title",
    company: "Company Name",
    span: "2020 - 2023",
    focus: "Short summary of impact and scope.",
    highlights: [
      "Highlight one describing results or scope.",
      "Highlight two capturing ownership or outcomes.",
    ],
  },
];
