// Realistic Dutch sample CV data — single source of truth for the editor scaffolding.
// TODO: wire to the canonical CV data model (Supabase) + autosave.

export interface CvExperience {
  id: string;
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface CvEducation {
  id: string;
  degree: string;
  school: string;
  period: string;
}

export interface CvData {
  title: string;
  fullName: string;
  headline: string;
  contact: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
  };
  summary: string;
  experience: CvExperience[];
  education: CvEducation[];
  skills: string[];
  languages: { name: string; level: string }[];
}

export const SAMPLE_CV: CvData = {
  title: "Senior Product Marketeer",
  fullName: "Sanne Bakker",
  headline: "Senior Product Marketeer",
  contact: {
    email: "sanne.bakker@email.nl",
    phone: "06 41 22 88 19",
    location: "Amsterdam",
    linkedin: "linkedin.com/in/sannebakker",
  },
  summary:
    "Product marketeer met 7 jaar ervaring in fintech. Vertaalt complexe producten naar heldere proposities en bouwt go-to-market-strategieën die meetbaar groeien.",
  experience: [
    {
      id: "exp-1",
      role: "Senior Marketeer",
      company: "Mollie",
      period: "jan 2021 — heden",
      bullets: [
        "Stuurde de go-to-market van drie betaalproducten aan en gaf leiding aan een team van zes.",
        "Verhoogde de activatie met 40% in 12 maanden via experimentgedreven campagnes.",
      ],
    },
    {
      id: "exp-2",
      role: "Marketeer",
      company: "Bol",
      period: "2018 — 2021",
      bullets: [
        "Verantwoordelijk voor lifecycle-campagnes en e-mailmarketing voor 11 miljoen klanten.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "MSc Marketing Management",
      school: "Universiteit van Amsterdam",
      period: "2014 — 2016",
    },
  ],
  skills: [
    "Go-to-market",
    "Positionering",
    "A/B-testing",
    "SQL",
    "Teamleiding",
  ],
  languages: [
    { name: "Nederlands", level: "Moedertaal" },
    { name: "Engels", level: "Vloeiend" },
  ],
};
