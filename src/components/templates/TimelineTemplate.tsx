import { CVTemplateProps } from "@/types/cv";
import { Mail, Phone } from "lucide-react";

export default function TimelineTemplate({ data }: CVTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Header */}
      <div
        className="text-center py-12"
        style={{
          background: "linear-gradient(to bottom, var(--accent-bg, #f8fafc), #fff)",
        }}
      >
        {data.personal.photoUrl && (
          <div
            className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 mb-6"
            style={{ borderColor: "var(--accent)" }}
          >
            <img
              src={data.personal.photoUrl}
              alt={data.personal.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <h1
          className="text-5xl font-bold mb-3"
          style={{ color: "var(--accent)" }}
        >
          {data.personal.name}
        </h1>
        <p
          className="text-2xl mb-6"
          style={{ color: "var(--accent)", opacity: 0.7 }}
        >
          {data.personal.title}
        </p>
        <div className="flex justify-center gap-8" style={{ color: "var(--accent)" }}>
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

      <div className="px-8 pb-12">
        {/* Profile */}
        <section className="mb-12">
          <h2
            className="text-3xl font-bold text-center mb-8"
            style={{ color: "var(--accent)" }}
          >
            Professioneel Profiel
          </h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg" style={{ color: "var(--accent)", opacity: 0.7 }}>
              {data.profile}
            </p>
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-12">
          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{ color: "var(--accent)" }}
          >
            Carrière Timeline
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full"
              style={{ background: "var(--accent)", opacity: 0.16 }}
            ></div>

            {data.experience.map((exp, i) => (
              <div key={i} className="relative mb-12">
                {/* Timeline dot */}
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 shadow-lg z-10"
                  style={{
                    background: "var(--accent)",
                    borderColor: "#fff",
                  }}
                ></div>

                {/* Content card */}
                <div className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                  <div className={`w-5/12 ${i % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                    <div
                      className="bg-white rounded-lg p-6 shadow-lg"
                      style={{
                        border: "1.5px solid var(--accent)",
                        color: "var(--accent)",
                        opacity: 0.92,
                      }}
                    >
                      <h3 className="text-xl font-bold mb-2" style={{ color: "var(--accent)" }}>
                        {exp.job}
                      </h3>
                      <p
                        className="font-semibold mb-3"
                        style={{ color: "var(--accent)", opacity: 0.7 }}
                      >
                        {exp.company}
                      </p>
                      <p className="text-base" style={{ color: "#444" }}>
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Education */}
        <div className="grid md:grid-cols-2 gap-12">
          <section>
            <h2
              className="text-3xl font-bold text-center mb-8"
              style={{ color: "var(--accent)" }}
            >
              Vaardigheden
            </h2>
            <div className="space-y-3">
              {data.skills.map((skill, i) => (
                <div
                  key={i}
                  className="rounded-lg p-4 text-center"
                  style={{
                    background: "var(--accent-bg, #f8fafc)",
                    border: "1.5px solid var(--accent)",
                    color: "var(--accent)",
                  }}
                >
                  <span className="font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2
              className="text-3xl font-bold text-center mb-8"
              style={{ color: "var(--accent)" }}
            >
              Opleiding
            </h2>
            <div className="space-y-6">
              {data.education.map((edu, i) => (
                <div
                  key={i}
                  className="text-center rounded-lg p-6"
                  style={{
                    background: "var(--accent-bg, #f8fafc)",
                    border: "1.5px solid var(--accent)",
                    color: "var(--accent)",
                  }}
                >
                  <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                  <p className="font-semibold mb-1" style={{ opacity: 0.7 }}>
                    {edu.school}
                  </p>
                  <p style={{ opacity: 0.7 }}>{edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
