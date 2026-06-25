/**
 * A complete, realistic sample resume (the design's "Sanne Bakker"). Used for
 * template previews, gallery thumbnails, and as seed content for new resumes
 * until the user fills in their own.
 */
import { RESUME_SCHEMA_VERSION, SECTION_KEYS, type ResumeData } from "./schema";

export const SAMPLE_RESUME: ResumeData = {
  version: RESUME_SCHEMA_VERSION,
  personal: {
    fullName: "Sanne Bakker",
    headline: "Senior Product Marketeer",
    email: "sanne.bakker@email.nl",
    phone: "06 41 22 88 19",
    location: "Amsterdam",
    website: "sannebakker.nl",
    linkedin: "linkedin.com/in/sannebakker",
    github: "",
    photoUrl: "",
  },
  summary:
    "Product marketeer met 7 jaar ervaring in fintech. Vertaalt complexe producten naar heldere proposities en bouwt go-to-market-strategieën die meetbaar groeien. Houdt van data, scherpe positionering en samenwerking met sales en product.",
  experience: [
    {
      id: "exp-1",
      role: "Senior Product Marketeer",
      company: "Mollie",
      location: "Amsterdam",
      startDate: "jan 2021",
      endDate: "",
      current: true,
      summary: "",
      highlights: [
        "Stuurde de go-to-market van drie betaalproducten aan en gaf leiding aan een team van zes.",
        "Verhoogde de activatie met 40% in 12 maanden via experimentgedreven campagnes.",
        "Bouwde een positioneringsframework dat productlanceringen 2x sneller maakte.",
      ],
    },
    {
      id: "exp-2",
      role: "Marketeer",
      company: "Bol",
      location: "Utrecht",
      startDate: "2018",
      endDate: "2021",
      current: false,
      summary: "",
      highlights: [
        "Verantwoordelijk voor lifecycle-campagnes en e-mailmarketing voor 11 miljoen klanten.",
        "Verhoogde de e-mail-CTR met 28% door segmentatie en A/B-testen.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      institution: "Universiteit van Amsterdam",
      degree: "MSc Marketing Management",
      field: "Marketing",
      location: "Amsterdam",
      startDate: "2014",
      endDate: "2016",
      current: false,
      grade: "cum laude",
      description: "",
    },
  ],
  skills: [
    { id: "sk-1", name: "Go-to-market", category: "Strategie", level: "expert" },
    { id: "sk-2", name: "Positionering", category: "Strategie", level: "expert" },
    { id: "sk-3", name: "A/B-testing", category: "Analyse", level: "advanced" },
    { id: "sk-4", name: "SQL", category: "Analyse", level: "intermediate" },
    { id: "sk-5", name: "Teamleiding", category: "Leiderschap", level: "advanced" },
    { id: "sk-6", name: "Contentstrategie", category: "Strategie", level: "advanced" },
  ],
  projects: [
    {
      id: "proj-1",
      name: "Launch Playbook",
      role: "Lead",
      url: "",
      startDate: "2022",
      endDate: "",
      description:
        "Intern lanceerframework dat de doorlooptijd van productlanceringen halveerde.",
      highlights: [],
      technologies: ["Notion", "Figma", "Amplitude"],
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Product Marketing Certified",
      issuer: "PMA",
      date: "2023",
      url: "",
      credentialId: "",
    },
  ],
  languages: [
    { id: "lang-1", name: "Nederlands", proficiency: "native" },
    { id: "lang-2", name: "Engels", proficiency: "full_professional" },
    { id: "lang-3", name: "Duits", proficiency: "professional_working" },
  ],
  customSections: [],
  settings: {
    templateId: "modern",
    accentColor: "#2563eb",
    fontFamily: "Inter",
    fontScale: 1,
    pageSize: "a4",
    sectionOrder: [...SECTION_KEYS],
    hiddenSections: [],
  },
};
