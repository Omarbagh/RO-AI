import { CVTemplateProps } from '@/types/cv';
import { Mail, Phone } from 'lucide-react';

export function PortfolioTemplate({ data }: CVTemplateProps) {
  const accent = data.settings?.accent || "#1E40AF";

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden font-sans" style={{ '--accent': accent } as React.CSSProperties}>
      <div className="grid grid-cols-4" style={{ backgroundColor: '#f8fafc' }}>
        <aside
          className="col-span-1 p-6 flex flex-col items-center"
          style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
        >
          {data.personal.photoUrl && (
            <img
              src={data.personal.photoUrl}
              alt="Foto"
              className="w-28 h-28 rounded-full mb-4 border-4"
              style={{ borderColor: '#fff' }}
            />
          )}
          <h1 className="text-xl font-bold uppercase mb-1" style={{ color: '#fff' }}>
            {data.personal.name}
          </h1>
          <p className="text-sm opacity-75 mb-4" style={{ color: '#f0f0f0' }}>
            {data.personal.title}
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Mail size={16} style={{ color: '#fff' }} />
              {data.personal.email}
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} style={{ color: '#fff' }} />
              {data.personal.phone}
            </div>
          </div>
        </aside>
        <main className="col-span-3 p-8 space-y-8">
          <section>
            <h2
              className="text-lg font-semibold mb-2"
              style={{ color: 'var(--accent)' }}
            >
              Profiel
            </h2>
            <p className="text-sm text-gray-800">{data.profile}</p>
          </section>
          <section>
            <h2
              className="text-lg font-semibold mb-4"
              style={{ color: 'var(--accent)' }}
            >
              Werkervaring
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp, i) => (
                <div key={i} className="flex justify-between">
                  <div>
                    <p className="font-medium">{exp.job}</p>
                    <p className="text-xs" style={{ color: 'var(--accent)' }}>
                      {exp.company}
                    </p>
                  </div>
                  <p className="text-sm text-gray-700 w-2/3">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2
              className="text-lg font-semibold mb-4"
              style={{ color: 'var(--accent)' }}
            >
              Opleiding
            </h2>
            <ul className="space-y-3 text-sm text-gray-700">
              {data.education.map((edu, i) => (
                <li key={i} className="flex justify-between">
                  <span>
                    {edu.degree} – {edu.school}
                  </span>
                  <span style={{ color: 'var(--accent)' }}>{edu.year}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2
              className="text-lg font-semibold mb-4"
              style={{ color: 'var(--accent)' }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-4 py-1 rounded-full text-xs"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: '#fff',
                  }}
                >
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
