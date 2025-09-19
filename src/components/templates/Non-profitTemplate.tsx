import { CVTemplateProps } from "@/types/cv";
import { Users, Heart } from "lucide-react";

export function NonProfitTemplate({ data }: CVTemplateProps) {
  const accent = data.settings?.accent || "#1E40AF";

  return (
    <div
      className="max-w-4xl mx-auto bg-white"
      style={{ "--accent": accent } as React.CSSProperties}
    >
      <div
        className="text-white p-8"
        style={{
          background: "var(--accent)",
        }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-3">{data.personal.name}</h1>
          <p
            className="text-xl"
            style={{ color: "var(--accent)", opacity: 0.7 }}
          >
            {data.personal.title}
          </p>
          <div className="flex justify-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" style={{ color: "var(--accent)" }} />
              {data.personal.email}
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" style={{ color: "var(--accent)" }} />
              {data.personal.phone}
            </div>
          </div>
        </div>
      </div>
      <div className="p-8">
        <section className="mb-8">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--accent)" }}
          >
            Mission & Vision
          </h2>
          <div
            className="p-6"
            style={{
              background: "rgba(var(--accent-rgb,16,185,129),0.08)",
              borderLeft: "4px solid var(--accent)",
            }}
          >
            <p className="text-gray-700 leading-relaxed">{data.profile}</p>
          </div>
        </section>
        <section className="mb-8">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: "var(--accent)" }}
          >
            Impact & Experience
          </h2>
          {data.experience.map((exp, i) => (
            <div
              key={i}
              className="rounded-lg p-6 mb-6"
              style={{
                background: "rgba(var(--accent-rgb,16,185,129),0.09)",
              }}
            >
              <h3 className="text-lg font-semibold text-gray-900">{exp.job}</h3>
              <p className="font-medium" style={{ color: "var(--accent)" }}>
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
