import { CVTemplateProps } from "@/types/cv";

export function GamingTemplate({ data }: CVTemplateProps) {
  const accent = data.settings?.accent || "#1E40AF";

  return (
    <div
      className="max-w-5xl mx-auto font-mono"
      style={{ '--accent': accent } as React.CSSProperties}
    >
      <div
        className="p-4 border-b-2"
        style={{
          background: "#000",
          borderBottom: "2px solid var(--accent, #22d3ee)",
        }}
      >
        <div className="text-center">
          <div className="text-sm mb-2" style={{ color: "var(--accent)" }}>
            ██████████████████████████████
          </div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--accent)" }}>
            PLAYER PROFILE LOADED
          </h1>
          <div className="text-sm mt-2" style={{ color: "var(--accent)" }}>
            ████████████████████████████
          </div>
        </div>
      </div>

      <div className="p-8">
        <div
          className="border p-6 mb-6"
          style={{ borderColor: "var(--accent)" }}
        >
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: "var(--accent)" }}
          >
            &gt; {data.personal.name.toUpperCase()}
          </h1>
          <p
            className="text-xl mb-4"
            style={{ color: "var(--accent)" }}
          >
            CLASS: {data.personal.title}
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>EMAIL: {data.personal.email}</div>
            <div>PHONE: {data.personal.phone}</div>
          </div>
        </div>

        <div
          className="border p-6 mb-6"
          style={{ borderColor: "var(--accent)" }}
        >
          <h2
            className="text-xl font-bold mb-4"
            style={{ color: "var(--accent)" }}
          >
            [MISSION BRIEFING]
          </h2>
          <p
            className="leading-relaxed"
            style={{ color: "var(--accent)" }}
          >
            {data.profile}
          </p>
        </div>

        <div
          className="border p-6 mb-6"
          style={{ borderColor: "var(--accent)" }}
        >
          <h2
            className="text-xl font-bold mb-4"
            style={{ color: "var(--accent)" }}
          >
            [QUEST LOG]
          </h2>
          {data.experience.map((exp, i) => (
            <div
              key={i}
              className="mb-4 bg-gray-800 p-4 border"
              style={{ borderColor: "#374151" }}
            >
              <div className="flex justify-between items-start mb-2">
                <h3
                  className="font-bold"
                  style={{ color: "var(--accent)" }}
                >
                  {exp.job}
                </h3>
                <span
                  className="text-sm"
                  style={{ color: "var(--accent)" }}
                >
                  ★ COMPLETED
                </span>
              </div>
              <p
                className="text-sm mb-2"
                style={{ color: "var(--accent)" }}
              >
                Location: {exp.company}
              </p>
              <p className="text-gray-300 text-sm">{exp.description}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div
            className="border p-6"
            style={{ borderColor: "var(--accent)" }}
          >
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: "var(--accent)" }}
            >
              [SKILL TREE]
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {data.skills.map((skill, i) => (
                <div
                  key={i}
                  className="bg-gray-800 border p-2 text-center text-sm"
                  style={{ borderColor: "#374151", color: "var(--accent)" }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          <div
            className="border p-6"
            style={{ borderColor: "var(--accent)" }}
          >
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: "var(--accent)" }}
            >
              [ACHIEVEMENTS]
            </h2>
            {data.education.map((edu, i) => (
              <div
                key={i}
                className="mb-4 bg-gray-800 p-3 border"
                style={{ borderColor: "#374151" }}
              >
                <div
                  className="font-bold text-sm"
                  style={{ color: "var(--accent)" }}
                >
                  {edu.degree}
                </div>
                <div
                  className="text-sm"
                  style={{ color: "var(--accent)" }}
                >
                  {edu.school}
                </div>
                <div className="text-gray-400 text-xs">{edu.year}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-6" style={{ color: "var(--accent)" }}>
          &gt; PRESS ANY KEY TO CONTINUE...
        </div>
      </div>
    </div>
  );
}
