import { CVTemplateProps } from "@/types/cv";
import { Mail, Phone } from "lucide-react";

export default function BasicTemplate({ data }: CVTemplateProps) {
  const accent = data.settings?.accent || "#1E40AF";
  return (
    <div
      className="max-w-[800px] mx-auto bg-white rounded-lg shadow-md overflow-hidden font-sans"
      style={{ "--accent": accent } as React.CSSProperties}
    >
      {/* Header */}
      <div
        className="flex flex-col items-center p-6 md:flex-row md:justify-between md:items-end border-b"
        style={{
          backgroundColor: "var(--accent)",
          borderColor: "var(--accent)",
        }}
      >
        {/* Foto */}
        {data.personal.photoUrl && (
          <div
            className="w-20 h-20 rounded-full overflow-hidden border-2 mb-4 md:mb-0"
            style={{ borderColor: "#fff" }}
          >
            <img
              src={data.personal.photoUrl}
              alt="Profielfoto"
              className="object-cover w-full h-full"
            />
          </div>
        )}
        {/* Naam & Titel */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            {data.personal.name}
          </h1>
          <p className="mt-1 text-lg italic text-white opacity-80">
            {data.personal.title}
          </p>
        </div>
        {/* Contact */}
        <div className="mt-4 flex flex-col items-center space-y-2 md:mt-0 md:items-end text-sm text-white">
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-white" />
            <span>{data.personal.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-white" />
            <span>{data.personal.phone}</span>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-10">
        {/* Profiel */}
        <section className="space-y-2">
          <h2
            className="text-xl font-semibold uppercase border-b pb-1"
            style={{
              color: "var(--accent)",
              borderColor: "var(--accent)",
            }}
          >
            Profiel
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            {data.profile}
          </p>
        </section>

        {/* Werkervaring */}
        <section className="space-y-4">
          <h2
            className="text-xl font-semibold uppercase border-b pb-1"
            style={{
              color: "var(--accent)",
              borderColor: "var(--accent)",
            }}
          >
            Werkervaring
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-md font-medium text-gray-900">
                    {exp.job}
                  </h3>
                  <span className="text-sm" style={{ color: "var(--accent)" }}>
                    {exp.company}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Opleiding */}
        <section className="space-y-4">
          <h2
            className="text-xl font-semibold uppercase border-b pb-1"
            style={{
              color: "var(--accent)",
              borderColor: "var(--accent)",
            }}
          >
            Opleiding
          </h2>
          <div className="space-y-4">
            {data.education.map((edu, i) => (
              <div key={i} className="flex justify-between items-center">
                <div>
                  <p className="text-md font-medium text-gray-900">
                    {edu.degree}
                  </p>
                  <p className="text-sm text-gray-600">{edu.school}</p>
                </div>
                <span className="text-sm" style={{ color: "var(--accent)" }}>
                  {edu.year}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="space-y-2">
          <h2
            className="text-xl font-semibold uppercase border-b pb-1"
            style={{
              color: "var(--accent)",
              borderColor: "var(--accent)",
            }}
          >
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "#fff",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
