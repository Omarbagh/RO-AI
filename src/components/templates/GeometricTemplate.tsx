import { CVTemplateProps } from "@/types/cv";

export function GeometricTemplate({ data }: CVTemplateProps) {
  const accent = data.settings?.accent || "#1E40AF";

  return (
    <div
      className="max-w-5xl mx-auto bg-gray-100"
      style={{ "--accent": accent } as React.CSSProperties}
    >
      <div className="bg-white">
        <div className="relative">
          <div
            className="absolute top-0 left-0 w-32 h-32 transform rotate-45 -translate-x-16 -translate-y-16"
            style={{ background: "var(--accent)" }}
          ></div>
          <div
            className="absolute top-0 right-0 w-24 h-24 rounded-full -translate-y-12 translate-x-12"
            style={{ background: "var(--accent)" }}
          ></div>
          <div className="p-12 pt-20">
            <h1 className="text-5xl font-bold text-gray-900 mb-3">
              {data.personal.name}
            </h1>
            <p className="text-2xl mb-8" style={{ color: "var(--accent)" }}>
              {data.personal.title}
            </p>
          </div>
        </div>

        <div className="px-12 pb-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <section className="mb-8">
                <div className="flex items-center mb-4">
                  <div
                    className="w-4 h-4 mr-4"
                    style={{ background: "var(--accent)" }}
                  ></div>
                  <h2 className="text-xl font-bold">PROFILE</h2>
                </div>
                <p className="text-gray-700">{data.profile}</p>
              </section>

              <section>
                <div className="flex items-center mb-6">
                  <div
                    className="w-4 h-4 mr-4"
                    style={{ background: "var(--accent)" }}
                  ></div>
                  <h2 className="text-xl font-bold">EXPERIENCE</h2>
                </div>
                {data.experience.map((exp, i) => (
                  <div
                    key={i}
                    className="mb-6 border-l-4 pl-4"
                    style={{ borderColor: "var(--accent)" }}
                  >
                    <h3 className="font-bold text-gray-900">{exp.job}</h3>
                    <p style={{ color: "var(--accent)" }}>{exp.company}</p>
                    <p className="text-gray-700 text-sm">{exp.description}</p>
                  </div>
                ))}
              </section>
            </div>

            <div>
              <section className="mb-8">
                <div className="flex items-center mb-4">
                  <div
                    className="w-4 h-4 mr-4"
                    style={{ background: "var(--accent)" }}
                  ></div>
                  <h2 className="text-xl font-bold">CONTACT</h2>
                </div>
                <div className="space-y-2 text-sm">
                  <div>{data.personal.email}</div>
                  <div>{data.personal.phone}</div>
                </div>
              </section>

              <section className="mb-8">
                <div className="flex items-center mb-4">
                  <div
                    className="w-4 h-4 mr-4"
                    style={{ background: "var(--accent)" }}
                  ></div>
                  <h2 className="text-xl font-bold">SKILLS</h2>
                </div>
                {data.skills.map((skill, i) => (
                  <div key={i} className="bg-gray-100 p-2 mb-2 text-sm">
                    {skill}
                  </div>
                ))}
              </section>

              <section>
                <div className="flex items-center mb-4">
                  <div
                    className="w-4 h-4 mr-4"
                    style={{ background: "var(--accent)" }}
                  ></div>
                  <h2 className="text-xl font-bold">EDUCATION</h2>
                </div>
                {data.education.map((edu, i) => (
                  <div key={i} className="mb-4 text-sm">
                    <div className="font-semibold">{edu.degree}</div>
                    <div className="text-gray-600">{edu.school}</div>
                    <div className="text-gray-500">{edu.year}</div>
                  </div>
                ))}
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
