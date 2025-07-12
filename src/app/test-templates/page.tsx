'use client';

import CreativeTemplate from "@/components/templates/CreativeTemplate";

const testData = {
  personal: {
    name: 'Omar Bagh',
    title: 'Frontend Developer',
    email: 'omar@example.com',
    phone: '+31 6 12345678',
  },
  profile:
    'Creatieve en gemotiveerde developer met een passie voor moderne webtechnologieën.',
  experience: [
    {
      job: 'Frontend Developer',
      company: 'Techbedrijf BV',
      description: 'Werkte aan React-apps met Tailwind en Next.js.',
    },
    {
      job: 'Webdesigner',
      company: 'Design Studio',
      description: 'Maakte UI/UX ontwerpen en bouwde landing pages.',
    },
  ],
  education: [
    {
      school: 'Hogeschool van Amsterdam',
      degree: 'BSc Informatica',
      year: '2022',
    },
  ],
  skills: ['JavaScript', 'React', 'Next.js', 'Tailwind', 'Figma'],
};

export default function TestTemplatePage() {
  return (
    <div className="bg-gray-100 min-h-screen p-10">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
        <CreativeTemplate data={testData} />
      </div>
    </div>
  );
}
