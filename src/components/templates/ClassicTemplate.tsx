import { CVTemplateProps } from '@/types/cv';
import { Mail, Phone } from 'lucide-react';

export function ClassicTemplate({ data }: CVTemplateProps) {
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg font-sans">
      <div className="grid grid-cols-3">
        <aside className="col-span-1 bg-gray-100 p-8 text-center">
          {data.personal.photoUrl && (
            <img
              src={data.personal.photoUrl}
              alt=""
              className="mx-auto w-32 h-32 rounded-full mb-4"
            />
          )}
          <h1
            className="text-2xl font-bold"
            style={{ color: "var(--accent)" }} // <-- Accent op naam
          >
            {data.personal.name}
          </h1>
          <p className="italic text-gray-600">{data.personal.title}</p>
          <div className="mt-6 space-y-2 text-sm text-gray-700">
            <p className="flex items-center gap-2">
              <Mail size={16} style={{ color: "var(--accent)" }} /> {/* Icon accent */}
              {data.personal.email}
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} style={{ color: "var(--accent)" }} /> {/* Icon accent */}
              {data.personal.phone}
            </p>
          </div>
        </aside>
        <main className="col-span-2 p-8 space-y-6">
          <section>
            <h2
              className="text-lg font-semibold border-b pb-1"
              style={{ color: "var(--accent)" }} // <-- Accent section titles
            >
              Profile
            </h2>
            <p className="mt-2 text-sm text-gray-800">{data.profile}</p>
          </section>
          <section>
            <h2
              className="text-lg font-semibold border-b pb-1"
              style={{ color: "var(--accent)" }}
            >
              Experience
            </h2>
            {data.experience.map((e, i) => (
              <div key={i} className="mt-4">
                <p className="font-semibold">
                  {e.job} @ {e.company}{' '}
                  <span className="text-xs text-gray-500">{e.year}</span>
                </p>
                <p className="text-sm text-gray-700 mt-1">{e.description}</p>
              </div>
            ))}
          </section>
          <section>
            <h2
              className="text-lg font-semibold border-b pb-1"
              style={{ color: "var(--accent)" }}
            >
              Education
            </h2>
            {data.education.map((edu, i) => (
              <div key={i} className="mt-4">
                <p className="font-medium">{edu.degree}</p>
                <p className="text-sm text-gray-700">
                  {edu.school} • {edu.year}
                </p>
              </div>
            ))}
          </section>
          <section>
            <h2
              className="text-lg font-semibold border-b pb-1"
              style={{ color: "var(--accent)" }}
            >
              Skills
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {data.skills.map((s, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs"
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "#fff",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
