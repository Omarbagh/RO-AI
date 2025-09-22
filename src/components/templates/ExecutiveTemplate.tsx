import { CVTemplateProps } from "@/types/cv";
import { Mail, Phone, Award, Building } from "lucide-react";

export default function ExecutiveTemplate({ data }: CVTemplateProps) {
  const accent = data.settings?.accent || "#1E40AF";

  return (
    <div
      className="max-w-5xl mx-auto bg-white"
      style={{ "--accent": accent } as React.CSSProperties}
    >
      {/* Header */}
      <div
        className="p-10 text-white"
        style={{
          background: "#111827",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            {data.personal.photoUrl && (
              <div
                className="w-28 h-28 rounded-lg overflow-hidden border-4"
                style={{ borderColor: "var(--accent)" }}
              >
                <img
                  src={data.personal.photoUrl}
                  alt={data.personal.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <h1 className="text-4xl font-bold mb-2">{data.personal.name}</h1>
              <p className="text-xl" style={{ color: "var(--accent)" }}>
                {data.personal.title}
              </p>
              <div className="mt-4 flex gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {data.personal.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {data.personal.phone}
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div
              className="px-4 py-2 rounded-lg font-bold"
              style={{
                background: "var(--accent)",
                color: "#111827",
              }}
            >
              EXECUTIVE
            </div>
          </div>
        </div>
      </div>

      <div className="p-10">
        {/* Executive Summary */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6" style={{ color: "var(--accent)" }} />
            <h2 className="text-2xl font-bold text-gray-800">
              Executive Summary
            </h2>
          </div>
          <div
            className="p-6 rounded-r-lg"
            style={{
              background: "rgba( var(--accent-rgb,234,179,8),0.12 )",
              borderLeft: "4px solid var(--accent)",
            }}
          >
            <p className="text-gray-700 leading-relaxed text-lg">
              {data.profile}
            </p>
          </div>
        </section>

        {/* Professional Experience */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <Building className="w-6 h-6" style={{ color: "var(--accent)" }} />
            <h2 className="text-2xl font-bold text-gray-800">
              Professional Experience
            </h2>
          </div>
          <div className="space-y-8">
            {data.experience.map((exp, i) => (
              <div
                key={i}
                className="bg-white border rounded-lg p-6 shadow-sm"
                style={{ borderColor: "#e5e7eb" }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {exp.job}
                    </h3>
                    <p
                      className="text-lg font-semibold"
                      style={{ color: "var(--accent)" }}
                    >
                      {exp.company}
                    </p>
                  </div>
                  <div className="bg-gray-100 px-3 py-1 rounded text-sm text-gray-600">
                    Senior Role
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Core Competencies */}
        <div className="grid md:grid-cols-2 gap-10">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Education & Credentials
            </h2>
            <div className="space-y-4">
              {data.education.map((edu, i) => (
                <div
                  key={i}
                  className="bg-gray-50 p-4 rounded-r-lg"
                  style={{
                    borderLeft: "4px solid var(--accent)",
                  }}
                >
                  <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                  <p
                    className="font-semibold"
                    style={{ color: "var(--accent)" }}
                  >
                    {edu.school}
                  </p>
                  <p className="text-gray-600">{edu.year}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Core Competencies
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {data.skills.map((skill, i) => (
                <div
                  key={i}
                  className="border px-4 py-3 rounded-lg"
                  style={{
                    background: "rgba( var(--accent-rgb,234,179,8),0.17 )",
                    borderColor: "var(--accent)",
                  }}
                >
                  <span className="font-semibold text-gray-800">{skill}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
