import { CVTemplateProps } from '@/types/cv';

export function MinimalistTemplate({ data }: CVTemplateProps) {
  return (
    <div className="max-w-2xl mx-auto p-10 bg-white font-serif text-gray-900">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold leading-tight">{data.personal.name}</h1>
        {data.personal.photoUrl && <img src={data.personal.photoUrl} alt="Foto" className="w-24 h-24 rounded-full" />}
      </div>
      <p className="italic text-gray-600 mb-6">{data.personal.title}</p>
      <p className="text-sm mb-10">{data.personal.email} | {data.personal.phone}</p>
      <section className="mb-8">
        <h2 className="uppercase text-sm tracking-widest mb-2 border-b border-gray-300">Profiel</h2>
        <p className="text-sm leading-relaxed">{data.profile}</p>
      </section>
      <section className="mb-8">
        <h2 className="uppercase text-sm tracking-widest mb-4 border-b border-gray-300">Ervaring</h2>
        <ul className="list-none space-y-6">
          {data.experience.map((exp, i) => (
            <li key={i} className="space-y-1">
              <p className="font-semibold">{exp.job} <span className="font-normal text-gray-500">@ {exp.company}</span></p>
              <p className="text-sm text-gray-700">{exp.description}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="uppercase text-sm tracking-widest mb-4 border-b border-gray-300">Opleiding</h2>
        <ul className="list-disc list-inside space-y-3 text-sm text-gray-700">
          {data.education.map((edu, i) => (
            <li key={i}>{edu.degree} – {edu.school} ({edu.year})</li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="uppercase text-sm tracking-widest mb-4 border-b border-gray-300">Skills</h2>
        <div className="flex flex-wrap gap-3 text-xs">
          {data.skills.map((skill, i) => (
            <span key={i} className="px-3 py-1 border border-gray-400 rounded-full">{skill}</span>
          ))}
        </div>
      </section>
    </div>
  );
}