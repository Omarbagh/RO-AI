import { CVTemplateProps } from '@/types/cv';
import { Mail, Phone } from 'lucide-react';


export function PortfolioTemplate({ data }: CVTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden font-sans">
      <div className="grid grid-cols-4 bg-indigo-50">
        <aside className="col-span-1 bg-indigo-600 text-white p-6 flex flex-col items-center">
          {data.personal.photoUrl && <img src={data.personal.photoUrl} alt="Foto" className="w-28 h-28 rounded-full mb-4" />}
          <h1 className="text-xl font-bold uppercase mb-1">{data.personal.name}</h1>
          <p className="text-sm opacity-75 mb-4">{data.personal.title}</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2"><Mail size={16} />{data.personal.email}</div>
            <div className="flex items-center gap-2"><Phone size={16} />{data.personal.phone}</div>
          </div>
        </aside>
        <main className="col-span-3 p-8 space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-indigo-700 mb-2">Profiel</h2>
            <p className="text-sm text-gray-800">{data.profile}</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-indigo-700 mb-4">Werkervaring</h2>
            <div className="space-y-6">
              {data.experience.map((exp, i) => (
                <div key={i} className="flex justify-between">
                  <div>
                    <p className="font-medium">{exp.job}</p>
                    <p className="text-xs text-indigo-600">{exp.company}</p>
                  </div>
                  <p className="text-sm text-gray-700 w-2/3">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-indigo-700 mb-4">Opleiding</h2>
            <ul className="space-y-3 text-sm text-gray-700">
              {data.education.map((edu, i) => (
                <li key={i} className="flex justify-between">
                  <span>{edu.degree} – {edu.school}</span>
                  <span className="text-indigo-600">{edu.year}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-indigo-700 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span key={i} className="bg-indigo-100 text-indigo-800 px-4 py-1 rounded-full text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
