import { CVTemplateProps } from "@/types/cv";
import { Code, Terminal, Cpu } from "lucide-react";

export default function TechTemplate({ data }: CVTemplateProps) {
  const accent = data.settings?.accent || "#1E40AF";

  return (
    <div
      className="max-w-5xl mx-auto font-mono overflow-hidden"
      style={{ '--accent': accent } as React.CSSProperties}
    >
      {/* Terminal Header */}
      <div
        className="border-b p-6"
        style={{
          background: "#000",
          borderBottom: "1px solid var(--accent)",
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: "var(--accent-red, #f87171)" }}
          ></div>
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: "var(--accent-yellow, #fde68a)" }}
          ></div>
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: "var(--accent)" }}
          ></div>
          <span className="ml-4" style={{ color: "var(--accent)" }}>
            terminal - developer_resume
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4" style={{ color: "var(--accent)" }} />
            <span style={{ color: "var(--accent-blue, #38bdf8)" }}>$</span>
            <span className="text-white">whoami</span>
          </div>
          <div className="ml-6">
            <h1 className="text-3xl font-bold text-white">
              {data.personal.name}
            </h1>
            <p
              className="text-xl"
              style={{ color: "var(--accent-cyan, #22d3ee)" }}
            >
              {data.personal.title}
            </p>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <span style={{ color: "var(--accent-blue, #38bdf8)" }}>$</span>
            <span className="text-white">cat contact.info</span>
          </div>
          <div className="ml-6 space-y-1">
            <div style={{ color: "var(--accent-light, #86efac)" }}>
              📧 {data.personal.email}
            </div>
            <div style={{ color: "var(--accent-light, #86efac)" }}>
              📱 {data.personal.phone}
            </div>
          </div>
        </div>
      </div>

      <div
        className="p-8"
        style={{
          background: "var(--accent-bg, #18181b)",
        }}
      >
        {/* About/Profile */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span style={{ color: "var(--accent-blue, #38bdf8)" }}>$</span>
            <span className="text-white">cat README.md</span>
          </div>
          <div
            className="rounded p-6 ml-6"
            style={{
              background: "var(--accent-darker, #27272a)",
              border: "1px solid var(--accent)",
            }}
          >
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: "var(--accent-cyan, #22d3ee)" }}
            >
              # About
            </h2>
            <p className="leading-relaxed" style={{ color: "#d1d5db" }}>
              <span className="text-gray-500">```</span>
              {data.profile}
              <span className="text-gray-500">```</span>
            </p>
          </div>
        </section>

        {/* Experience */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span style={{ color: "var(--accent-blue, #38bdf8)" }}>$</span>
            <span className="text-white">git log --oneline</span>
          </div>
          <div className="ml-6 space-y-4">
            {data.experience.map((exp, i) => (
              <div
                key={i}
                className="pb-4 pl-6"
                style={{ borderLeft: "2px solid var(--accent)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-4 h-4" style={{ color: "var(--accent-yellow, #fde047)" }} />
                  <h3 className="text-lg font-bold text-white">{exp.job}</h3>
                  <span style={{ color: "var(--accent-cyan, #22d3ee)" }}>
                    @{exp.company}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#d1d5db" }}>
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Education */}
        <div className="grid md:grid-cols-2 gap-8">
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span style={{ color: "var(--accent-blue, #38bdf8)" }}>$</span>
              <span className="text-white">npm list --global</span>
            </div>
            <div
              className="rounded p-6 ml-6"
              style={{
                background: "var(--accent-darker, #27272a)",
                border: "1px solid var(--accent)",
              }}
            >
              <div className="space-y-2">
                {data.skills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span style={{ color: "var(--accent)" }}>├──</span>
                    <Cpu className="w-4 h-4" style={{ color: "var(--accent-yellow, #fde047)" }} />
                    <span className="text-white">{skill}</span>
                    <span style={{ color: "var(--accent)" }}>@latest</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <span style={{ color: "var(--accent-blue, #38bdf8)" }}>$</span>
              <span className="text-white">cat education.json</span>
            </div>
            <div
              className="rounded p-6 ml-6"
              style={{
                background: "var(--accent-darker, #27272a)",
                border: "1px solid var(--accent)",
              }}
            >
              <div className="space-y-4">
                {data.education.map((edu, i) => (
                  <div key={i} className="text-sm">
                    <div style={{ color: "var(--accent-cyan, #22d3ee)" }}>
                      &quot;{edu.degree}&quot;: {"{"}
                    </div>
                    <div className="ml-4" style={{ color: "#d1d5db" }}>
                      &quot;institution&quot;: &quot;{edu.school}&quot;,
                    </div>
                    <div className="ml-4" style={{ color: "#d1d5db" }}>
                      &quot;year&quot;: &quot;{edu.year}&quot;
                    </div>
                    <div style={{ color: "var(--accent-cyan, #22d3ee)" }}>
                      {"}"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-8 flex items-center gap-2">
          <span style={{ color: "var(--accent-blue, #38bdf8)" }}>$</span>
          <span className="text-white">
            echo &quot;Thanks for reviewing my profile!&quot;
          </span>
        </div>
        <div className="ml-6" style={{ color: "var(--accent)" }}>
          Thanks for reviewing my profile!
        </div>

        <div className="mt-2 flex items-center gap-2">
          <span style={{ color: "var(--accent-blue, #38bdf8)" }}>$</span>
          <span className="animate-pulse" style={{ color: "var(--accent)" }}>
            _
          </span>
        </div>
      </div>
    </div>
  );
}
