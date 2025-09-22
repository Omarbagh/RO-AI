import { CVTemplateProps } from "@/types/cv";

export function AcademicTemplate({ data }: CVTemplateProps) {
  const accent = data.settings?.accent || "#1E40AF";

  return (
    <div
      className="max-w-4xl mx-auto bg-white"
      style={{ "--accent": accent } as React.CSSProperties}
    >
      {/* Top border accent color */}
      <div
        className="border-t-8 pt-8 pb-6 mb-8"
        style={{ borderColor: "var(--accent)" }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-serif text-gray-900 mb-3">
            {data.personal.name}
          </h1>
          {/* Titel kleur */}
          <p className="text-xl mb-4" style={{ color: "var(--accent)" }}>
            {data.personal.title}
          </p>
          <div className="flex justify-center gap-6 text-gray-600">
            <span>{data.personal.email}</span>
            <span>{data.personal.phone}</span>
          </div>
        </div>
      </div>

      <div className="px-8">
        <section className="mb-8">
          <h2
            className="text-2xl font-serif border-b-2 pb-2 mb-4"
            style={{
              color: "var(--accent)",
              borderColor: "var(--accent)",
            }}
          >
            Research Interests
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.profile}</p>
        </section>

        <section className="mb-8">
          <h2
            className="text-2xl font-serif border-b-2 pb-2 mb-6"
            style={{
              color: "var(--accent)",
              borderColor: "var(--accent)",
            }}
          >
            Academic Positions
          </h2>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">{exp.job}</h3>
              {/* Company in accent color */}
              <p className="italic" style={{ color: "var(--accent)" }}>
                {exp.company}
              </p>
              <p className="text-gray-700 mt-2">{exp.description}</p>
            </div>
          ))}
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <section>
            <h2
              className="text-2xl font-serif border-b-2 pb-2 mb-4"
              style={{
                color: "var(--accent)",
                borderColor: "var(--accent)",
              }}
            >
              Research Skills
            </h2>
            <ul className="space-y-2">
              {data.skills.map((skill, i) => (
                <li key={i} className="text-gray-700 flex items-start">
                  {/* Bullet in accent color */}
                  <span style={{ color: "var(--accent)" }} className="mr-2">
                    •
                  </span>
                  {skill}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2
              className="text-2xl font-serif border-b-2 pb-2 mb-4"
              style={{
                color: "var(--accent)",
                borderColor: "var(--accent)",
              }}
            >
              Education
            </h2>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-4">
                <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                {/* School in accent color */}
                <p className="italic" style={{ color: "var(--accent)" }}>
                  {edu.school}
                </p>
                <p className="text-gray-600">{edu.year}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
