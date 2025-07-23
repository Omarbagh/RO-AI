import { CVTemplateProps } from '@/types/cv';

export function MarketingTemplate({ data }: CVTemplateProps) {
  return (
    <div className="max-w-5xl mx-auto bg-white">
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "var(--accent)" }}
        ></div>
        <div className="relative z-10 p-10 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold mb-3">{data.personal.name}</h1>
              <p
                className="text-2xl"
                style={{ color: "var(--accent)", opacity: 0.8 }}
              >
                {data.personal.title}
              </p>
              <div className="mt-6 flex gap-8 text-lg">
                <span>{data.personal.email}</span>
                <span>{data.personal.phone}</span>
              </div>
            </div>
            {data.personal.photoUrl && (
              <div
                className="w-32 h-32 rounded-full overflow-hidden border-4"
                style={{ borderColor: "rgba(255,255,255,0.3)" }}
              >
                <img
                  src={data.personal.photoUrl}
                  alt={data.personal.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-10">
        <section className="mb-10">
          <h2
            className="text-3xl font-bold mb-6"
            style={{ color: "var(--accent)" }}
          >
            BRAND STORY
          </h2>
          <div
            className="p-6 rounded-r-lg"
            style={{
              background: "rgba( var(--accent-rgb,255,126,45), 0.08 )",
              borderLeft: "4px solid var(--accent)",
            }}
          >
            <p className="text-lg text-gray-800 leading-relaxed">
              {data.profile}
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ color: "var(--accent)" }}
          >
            CAMPAIGN PORTFOLIO
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {data.experience.map((exp, i) => (
              <div
                key={i}
                className="bg-white border rounded-lg p-6 shadow-lg"
                style={{ borderColor: "#e5e7eb" }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {exp.job}
                    </h3>
                    <p
                      className="font-semibold"
                      style={{ color: "var(--accent)" }}
                    >
                      {exp.company}
                    </p>
                  </div>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: "var(--accent)", color: "#fff" }}
                  >
                    <span className="font-bold text-sm">
                      {i + 1}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-10">
          <section>
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: "var(--accent)" }}
            >
              CORE COMPETENCIES
            </h2>
            <div className="space-y-3">
              {data.skills.map((skill, i) => (
                <div
                  key={i}
                  className="border rounded-lg p-3"
                  style={{
                    background: "rgba( var(--accent-rgb,255,126,45),0.07 )",
                    borderColor: "var(--accent)",
                  }}
                >
                  <span
                    className="font-semibold"
                    style={{ color: "var(--accent)" }}
                  >
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: "var(--accent)" }}
            >
              EDUCATION & CERTIFICATIONS
            </h2>
            {data.education.map((edu, i) => (
              <div
                key={i}
                className="mb-6 rounded-r-lg"
                style={{
                  background: "rgba( var(--accent-rgb,255,126,45),0.07 )",
                  borderLeft: "4px solid var(--accent)",
                }}
              >
                <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                <p
                  className="font-semibold"
                  style={{ color: "var(--accent)" }}
                >
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
