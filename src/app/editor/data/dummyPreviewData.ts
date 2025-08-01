import { CVData } from "@/types/cv";

export const defaultPreviewData: CVData = {
  personal: {
    name: "Alexandra Chen",
    title: "Senior Product Designer & UX Strategist",
    email: "alexandra.chen@email.com",
    phone: "+1 (555) 123-4567",
    photoUrl: "../person-dummy.jpg", 
  },
  profile: "Award-winning product designer with 6+ years of experience creating user-centered digital experiences for Fortune 500 companies. Proven track record in leading design systems, increasing user engagement by 40%, and driving product growth through data-driven design decisions.",
  experience: [
    {
      job: "Senior Product Designer",
      company: "TechFlow Industries",
      description: "Led design for flagship mobile app with 2M+ users. Spearheaded design system implementation, resulting in 60% faster development cycles. Mentored junior designers and established design ops workflows.",
      period: "2022-Present",
    },
    {
      job: "UX Designer",
      company: "Digital Innovations Co.",
      description: "Designed end-to-end user experiences for B2B SaaS platform serving 10k+ businesses. Collaborated with engineering teams to implement design systems and optimize conversion rates.",
      period: "2020-2022",
    },
  ],
  education: [
    {
      school: "Stanford University",
      degree: "Master of Human-Computer Interaction",
      year: "2020",
    },
    {
      school: "UC Berkeley",
      degree: "Bachelor of Fine Arts in Digital Design",
      year: "2018",
    },
  ],
  skills: [
    "Figma & Sketch",
    "Design Systems",
    "User Research",
    "Prototyping",
    "HTML/CSS/JS",
    "Data Analysis",
  ],
};
