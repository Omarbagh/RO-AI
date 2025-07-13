// Definieert de structuur voor een enkele werkervaring
export type Experience = {
  job: string;
  company: string;
  period?: string;
  description: string;
};

// Definieert de structuur voor een enkele opleiding
export type Education = {
  school: string;
  degree: string;
  // Jaar of periode (bijv. "2016 - 2020")
  year: string;
};

// Definieert de structuur voor persoonlijke gegevens
export type PersonalData = {
  name: string;
  title: string;
  email: string;
  phone: string;
  photoUrl?: string;
  address?: string;
  linkedin?: string;
  website?: string;
};

// De volledige datastructuur voor het CV
export type CVData = {
  personal: PersonalData;
  profile: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
};

// De props interface voor elk CV template component
export interface CVTemplateProps {
  data: CVData;
}