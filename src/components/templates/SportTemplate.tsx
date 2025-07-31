import { CVTemplateProps } from "@/types/cv";

export function SportsTemplate({ data }: CVTemplateProps) {
  const accent = data.settings?.accent || "#1E40AF";

  return (
    <div
      className="max-w-5xl mx-auto"
      style={{ '--accent': accent } as React.CSSProperties}
    >
      <div
        className="text-white p-10"
        style={{
          background: "var(--accent)",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold mb-3">{data.personal.name}</h1>
            <p
              className="text-2xl"
              style={{ color: "var(--accent)", opacity: 0.7 }}
            >
              {data.personal.title}
            </p>
          </div>
          <div className="text-6xl">🏆</div>
        </div>
      </div>
      <div className="p-10">
        <section className="mb-10">
          <h2
            className="text-3xl font-bold mb-6"
            style={{ color: "var(--accent)" }}
          >
            Athletic Philosophy
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {data.profile}
          </p>
        </section>
        <section className="mb-10">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ color: "var(--accent)" }}
          >
            Career Achievements
          </h2>
          {data.experience.map((exp, i) => (
            <div
              key={i}
              className="mb-6 bg-white rounded-lg p-6 shadow-sm"
              style={{
                borderLeft: "4px solid var(--accent)",
              }}
            >
              <h3 className="text-xl font-bold text-gray-900">{exp.job}</h3>
              <p
                className="font-semibold"
                style={{ color: "var(--accent)" }}
              >
                {exp.company}
              </p>
              <p className="text-gray-700 mt-2">{exp.description}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
