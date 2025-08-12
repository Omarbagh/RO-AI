import { CVTemplateProps } from "@/types/cv";
import { Mail, Phone, Zap, Target, Award } from "lucide-react";
import { t } from "@/lib/translate"

export default function BoldTemplate({ data }: CVTemplateProps) {
  const accent = data.settings?.accent || "#1E40AF";
  const language = data.settings?.language || "English";

  return (
    <div className="max-w-5xl mx-auto bg-white" style={{ "--accent": accent } as React.CSSProperties}>
      {/* Header */}
      <div className="p-12 relative overflow-hidden" style={{ backgroundColor: "#000", color: "#fff" }}>
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, var(--accent)20, var(--accent)20)",
            opacity: 0.15,
            pointerEvents: "none",
          }}
        />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-6xl font-black mb-4 tracking-tight">
              {data.personal.name.toUpperCase()}
            </h1>
            <p className="text-3xl font-bold mb-6" style={{ color: "var(--accent)" }}>
              {data.personal.title}
            </p>
            <div className="flex gap-8 text-lg">
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

          {data.personal.photoUrl && (
            <div className="w-40 h-40 rounded-lg overflow-hidden border-4" style={{ borderColor: "var(--accent)" }}>
              <img src={data.personal.photoUrl} alt={data.personal.name} className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>

      <div className="p-12">
        {/* Impact Statement */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <Zap className="w-8 h-8" style={{ color: "var(--accent)" }} />
            <h2 className="text-4xl font-black text-black">{t("IMPACT", language)}</h2>
          </div>
          <div
            className="p-8"
            style={{
              backgroundColor: "rgba(var(--accent-rgb),0.08)",
              borderLeft: "8px solid var(--accent)",
            }}
          >
            <p className="text-xl text-gray-800 font-medium leading-relaxed">
              {data.profile}
            </p>
          </div>
        </section>

        {/* Experience */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <Target className="w-8 h-8" style={{ color: "var(--accent)" }} />
            <h2 className="text-4xl font-black text-black">{t("EXPERIENCE", language)}</h2>
          </div>
          <div className="space-y-8">
            {data.experience.map((exp, i) => (
              <div key={i} className="bg-gray-900 text-white p-8 rounded-lg relative">
                <div
                  className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center font-black text-xl"
                  style={{ backgroundColor: "var(--accent)", color: "#fff" }}
                >
                  {i + 1}
                </div>
                <h3 className="text-2xl font-black mb-2" style={{ color: "var(--accent)" }}>
                  {exp.job}
                </h3>
                <p className="text-xl font-bold mb-4">{exp.company}</p>
                <p className="text-gray-300 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Education */}
        <div className="grid md:grid-cols-2 gap-12">
          <section>
            <div className="flex items-center gap-4 mb-8">
              <Award className="w-8 h-8" style={{ color: "var(--accent)" }} />
              <h2 className="text-3xl font-black text-black">{t("SKILLS", language)}</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {data.skills.map((skill, i) => (
                <div key={i} className="bg-black text-white p-4 rounded-lg text-center font-bold">
                  {skill}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black text-black mb-8">{t("EDUCATION", language)}</h2>
            <div className="space-y-6">
              {data.education.map((edu, i) => (
                <div
                  key={i}
                  className="p-6 rounded-lg"
                  style={{
                    backgroundColor: "rgba(var(--accent-rgb),0.08)",
                    border: "1px solid var(--accent)",
                  }}
                >
                  <h3 className="text-xl font-black text-black">{edu.degree}</h3>
                  <p className="font-bold" style={{ color: "var(--accent)" }}>
                    {edu.school}
                  </p>
                  <p className="text-gray-700 font-semibold">{edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
