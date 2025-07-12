export type CVData = {
  personal: {
    name: string;
    title: string;
    email: string;
    phone: string;
    photoUrl?: string;
  };
  profile: string;
  experience: {
    job: string;
    company: string;
    description: string;
  }[];
  education: {
    school: string;
    degree: string;
    year: string;
  }[];
  skills: string[];
};

export interface CVTemplateProps {
  data: CVData;
}
