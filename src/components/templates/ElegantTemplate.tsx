import { CVTemplateProps } from "@/types/cv";
import { Mail, Phone } from "lucide-react";

export default function ElegantTemplate({ data }: CVTemplateProps) {
  const accent = data.settings?.accent || "#1E40AF";

  return (
    <div className="max-w-4xl mx-auto bg-white" style={{ '--accent': accent } as React.CSSProperties}>
      {/* Elegant Header */}
      <div
        className="border-b-4 pb-8 mb-8"
        style={{ borderColor: "var(--accent)" }}
      >
        <div className="text-center">
          {data.personal.photoUrl && (
            <div
              className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 mb-6"
              style={{ borderColor: "var(--accent)" }}
            >
              <img
                src={data.personal.photoUrl}
                alt={data.personal.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <h1 className="text-5xl font-serif text-gray-800 mb-3">
            {data.personal.name}
          </h1>
          <p
            className="text-2xl font-light italic mb-6"
            style={{ color: "var(--accent)" }}
          >
            {data.personal.title}
          </p>
          <div className="flex justify-center gap-8 text-gray-600">
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

      <div className="px-8">
        <section className="mb-8">
          <h2
            className="text-2xl font-serif text-gray-800 mb-4 border-b pb-2"
            style={{ borderColor: "var(--accent)" }}
          >
            Profiel
          </h2>
          <p className="text-gray-700 leading-relaxed font-light text-lg">
            {data.profile}
          </p>
        </section>

        <section className="mb-8">
          <h2
            className="text-2xl font-serif text-gray-800 mb-6 border-b pb-2"
            style={{ borderColor: "var(--accent)" }}
          >
            Ervaring
          </h2>
          {data.experience.map((exp, i) => (
            <div
              key={i}
              className="mb-6 border-l-2 pl-6"
              style={{ borderColor: "var(--accent)" }}
            >
              <h3 className="text-xl font-serif text-gray-800">{exp.job}</h3>
              <p
                className="italic mb-2"
                style={{ color: "var(--accent)" }}
              >
                {exp.company}
              </p>
              <p className="text-gray-700 font-light">{exp.description}</p>
            </div>
          ))}
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <section>
            <h2
              className="text-2xl font-serif text-gray-800 mb-4 border-b pb-2"
              style={{ borderColor: "var(--accent)" }}
            >
              Vaardigheden
            </h2>
            <div className="space-y-2">
              {data.skills.map((skill, i) => (
                <div key={i} className="text-gray-700 font-light">
                  {skill}
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2
              className="text-2xl font-serif text-gray-800 mb-4 border-b pb-2"
              style={{ borderColor: "var(--accent)" }}
            >
              Opleiding
            </h2>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-4">
                <h3 className="font-serif text-gray-800">{edu.degree}</h3>
                <p
                  className="italic"
                  style={{ color: "var(--accent)" }}
                >
                  {edu.school}
                </p>
                <p className="text-gray-600 text-sm">{edu.year}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
