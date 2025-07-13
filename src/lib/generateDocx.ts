import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
} from 'docx';

type Experience = {
  job: string;
  company: string;
  description: string;
};

type Education = {
  degree: string;
  school: string;
  year: string;
};

type CVData = {
  personal: {
    name: string;
    title: string;
    email: string;
    phone: string;
  };
  profile: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
};

export async function generateDocx(templateId: number, data: CVData): Promise<Uint8Array> {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Header: Name
          new Paragraph({
            text: data.personal.name,
            heading: HeadingLevel.TITLE,
            thematicBreak: true,
          }),
          // Title / Role
          new Paragraph({
            children: [
              new TextRun({
                text: data.personal.title,
                italics: true,
                size: 32,
              }),
            ],
            spacing: { after: 200 },
          }),
          // Contact Info
          new Paragraph({
            children: [
              new TextRun({ text: data.personal.email }),
              new TextRun({ text: ' | ', bold: true }),
              new TextRun({ text: data.personal.phone }),
            ],
            spacing: { after: 400 },
          }),

          // Profile Section
          new Paragraph({
            text: 'Profiel',
            heading: HeadingLevel.HEADING_2,
            thematicBreak: true,
          }),
          new Paragraph({
            text: data.profile,
            spacing: { after: 400 },
          }),

          // Experience Section
            new Paragraph({
            text: 'Werkervaring',
            heading: HeadingLevel.HEADING_2,
            thematicBreak: true,
            }),
            ...data.experience.flatMap((exp: Experience) => [
            new Paragraph({
              children: [
              new TextRun({ text: exp.job, bold: true }),
              new TextRun({ text: ` @ ${exp.company}`, italics: true }),
              ],
            }),
            new Paragraph({
              text: exp.description,
              spacing: { after: 200 },
            }),
            ]),

          // Education Section
          new Paragraph({
            text: 'Opleiding',
            heading: HeadingLevel.HEADING_2,
            thematicBreak: true,
          }),
          ...data.education.flatMap((edu: Education) => [
            new Paragraph({
              children: [
                new TextRun({ text: edu.degree, bold: true }),
                new TextRun({ text: ` — ${edu.school}`, italics: true }),
              ],
            }),
            new Paragraph({
              text: edu.year,
              spacing: { after: 200 },
            }),
          ]),

          // Skills Section
          new Paragraph({
            text: 'Skills',
            heading: HeadingLevel.HEADING_2,
            thematicBreak: true,
          }),
          new Paragraph({
            children: data.skills.map((skill: string) =>
              new TextRun({
                text: `• ${skill}`,
                break: 1,
              })
            ),
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  return buffer;
}