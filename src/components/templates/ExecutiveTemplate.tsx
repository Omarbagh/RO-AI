import { CVTemplateProps } from '@/types/cv';
import { Mail, Phone, Briefcase, GraduationCap, User } from 'lucide-react';

export function ExecutiveTemplate({ data }: CVTemplateProps) {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden font-sans">
      <header
        className="text-white p-8 flex items-center justify-between"
        style={{ backgroundColor: 'var(--accent)' }}
      >
        <div>
          <h1 className="text-3xl font-bold uppercase">{data.personal.name}</h1>
          <p className="mt-1 text-sm opacity-75">{data.personal.title}</p>
        </div>
        {data.personal.photoUrl && (
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white">
            <img src={data.personal.photoUrl} alt="Foto" className="w-full h-full object-cover" />
          </div>
        )}
      </header>
      <main className="p-8 grid grid-cols-3 gap-6">
        <aside className="col-span-1 space-y-6">
          <section>
            <h2
              className="text-xs uppercase tracking-wide mb-2"
              style={{ color: 'var(--accent)' }}
            >
              Contact
            </h2>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <Mail size={16} style={{ color: 'var(--accent)' }} />
                {data.personal.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} style={{ color: 'var(--accent)' }} />
                {data.personal.phone}
              </div>
            </div>
          </section>
          <section>
            <h2
              className="text-xs uppercase tracking-wide mb-2"
              style={{ color: 'var(--accent)' }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((s, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: '#fff',
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
        </aside>
        <section className="col-span-2 space-y-8 text-gray-900">
          <div>
            <h2
              className="text-lg font-semibold border-b pb-1 flex items-center gap-2"
              style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}
            >
              <User size={20} style={{ color: 'var(--accent)' }} /> Profiel
            </h2>
            <p className="mt-2 text-sm leading-relaxed">{data.profile}</p>
          </div>
          <div>
            <h2
              className="text-lg font-semibold border-b pb-1 flex items-center gap-2"
              style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}
            >
              <Briefcase size={20} style={{ color: 'var(--accent)' }} /> Werkervaring
            </h2>
            <div className="mt-4 space-y-6">
              {data.experience.map((exp, i) => (
                <div key={i}>
                  <p className="text-md font-semibold">
                    {exp.job}{' '}
                    <span className="text-sm" style={{ color: 'var(--accent)' }}>
                      @ {exp.company}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2
              className="text-lg font-semibold border-b pb-1 flex items-center gap-2"
              style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}
            >
              <GraduationCap size={20} style={{ color: 'var(--accent)' }} /> Opleiding
            </h2>
            <div className="mt-4 space-y-4">
              {data.education.map((edu, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span>{edu.degree} – {edu.school}</span>
                  <span style={{ color: 'var(--accent)' }}>{edu.year}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
