import { CVTemplateProps } from '@/types/cv';
import { Mail, Phone, Calendar, Briefcase, User } from 'lucide-react';

export default function ModernTemplate({ data }: CVTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden font-sans grid grid-cols-1 md:grid-cols-[1fr,2fr]">
      {/* Sidebar */}
      <aside
        className="p-10 flex flex-col items-center space-y-8"
        style={{
          backgroundColor: 'var(--accent)',
        }}
      >
        {/* Profielfoto */}
        {data.personal.photoUrl && (
          <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-white">
            <img
              src={data.personal.photoUrl}
              alt="Profielfoto"
              className="object-cover w-full h-full"
            />
          </div>
        )}

        {/* Naam & Titel */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-extrabold uppercase tracking-wide text-white">
            {data.personal.name}
          </h1>
          <p className="text-sm text-white opacity-80">{data.personal.title}</p>
        </div>

        {/* Contact */}
        <div className="w-full space-y-4 text-sm text-white">
          <div className="flex items-center gap-2">
            <Mail className="text-white" size={18} />
            <span>{data.personal.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="text-white" size={18} />
            <span>{data.personal.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="text-white" size={18} />
            <span>{new Date().getFullYear()}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="w-full">
          <h2
            className="text-sm uppercase font-semibold tracking-wide mb-2 border-b pb-1"
            style={{
              borderColor: 'rgba(255,255,255,0.3)',
              color: '#fff',
            }}
          >
            Skills
          </h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {data.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  background: '#fff',
                  color: 'var(--accent)',
                  border: '1px solid #fff',
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="p-10 space-y-12 bg-gray-50">
        {/* Profiel */}
        <section>
          <h2
            className="text-lg font-semibold flex items-center gap-2 border-b pb-2 mb-4"
            style={{
              color: 'var(--accent)',
              borderColor: 'var(--accent)',
            }}
          >
            <User size={20} style={{ color: 'var(--accent)' }} /> Profiel
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            {data.profile}
          </p>
        </section>

        {/* Werkervaring */}
        <section>
          <h2
            className="text-lg font-semibold flex items-center gap-2 border-b pb-2 mb-6"
            style={{
              color: 'var(--accent)',
              borderColor: 'var(--accent)',
            }}
          >
            <Briefcase size={20} style={{ color: 'var(--accent)' }} /> Werkervaring
          </h2>
          <div className="space-y-8">
            {data.experience.map((exp, i) => (
              <div key={i} className="flex flex-col md:flex-row md:justify-between">
                <div className="md:w-2/3">
                  <h3 className="text-md font-semibold text-gray-900">
                    {exp.job}
                  </h3>
                  <p
                    className="text-sm font-medium"
                    style={{ color: 'var(--accent)' }}
                  >
                    {exp.company}
                  </p>
                </div>
                <div className="md:w-1/3 mt-2 md:mt-0 text-right text-sm text-gray-600">
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Opleiding */}
        <section>
          <h2
            className="text-lg font-semibold flex items-center gap-2 border-b pb-2 mb-6"
            style={{
              color: 'var(--accent)',
              borderColor: 'var(--accent)',
            }}
          >
            <Calendar size={20} style={{ color: 'var(--accent)' }} /> Opleiding
          </h2>
          <div className="space-y-4">
            {data.education.map((edu, i) => (
              <div key={i} className="flex justify-between items-center">
                <div>
                  <p className="text-md font-semibold text-gray-900">
                    {edu.degree}
                  </p>
                  <p className="text-sm text-gray-600">{edu.school}</p>
                </div>
                <span
                  className="text-sm"
                  style={{ color: 'var(--accent)' }}
                >
                  {edu.year}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
