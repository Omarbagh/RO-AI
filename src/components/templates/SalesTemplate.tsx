import { CVTemplateProps } from "@/types/cv";
import { Mail, Phone } from "lucide-react";

export function SalesTemplate({ data }: CVTemplateProps) {
  const accent = data.settings?.accent || "#1E40AF";

  return (
    <div className="max-w-5xl mx-auto bg-white">
      <div
        className="text-white p-10"
        style={{ "--accent": accent } as React.CSSProperties}
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-5xl font-bold mb-3">{data.personal.name}</h1>
            <p
              className="text-2xl"
              style={{ color: "var(--accent)", opacity: 0.7 }}
            >
              {data.personal.title}
            </p>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" style={{ color: "var(--accent)" }} />
                {data.personal.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" style={{ color: "var(--accent)" }} />
                {data.personal.phone}
              </div>
            </div>
          </div>
          <div className="text-center">
            <div
              className="bg-white rounded-lg p-4 mb-4"
              style={{
                color: "var(--accent)",
                border: "2px solid var(--accent)",
              }}
            >
              <div className="text-3xl font-bold">TOP</div>
              <div className="text-sm">PERFORMER</div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-10">
        <section className="mb-10">
          <h2
            className="text-3xl font-bold mb-6"
            style={{ color: "var(--accent)" }}
          >
            Sales Philosophy
          </h2>
          <div
            className="p-6"
            style={{
              background: "rgba(var(--accent-rgb,34,197,94),0.08)",
              borderLeft: "4px solid var(--accent)",
            }}
          >
            <p className="text-lg text-gray-800">{data.profile}</p>
          </div>
        </section>
        <section className="mb-10">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ color: "var(--accent)" }}
          >
            Track Record
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, i) => (
              <div
                key={i}
                className="bg-white border rounded-lg p-6 shadow-sm"
                style={{ borderColor: "var(--accent)" }}
              >
                <h3 className="text-xl font-bold text-gray-800">{exp.job}</h3>
                <p className="font-semibold" style={{ color: "var(--accent)" }}>
                  {exp.company}
                </p>
                <p className="text-gray-700 mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
