import { CVTemplateProps } from "@/types/cv";
import { Mail, Phone, Calendar, Briefcase, User } from "lucide-react";

export default function ModernTemplate({ data }: CVTemplateProps) {
  return (
    <div className="max-w-5xl mx-auto bg-white shadow-2xl overflow-hidden rounded-lg print:shadow-none print:rounded-none">
      <div className="flex flex-col lg:flex-row min-h-[297mm] print:min-h-[297mm]">
        {/* Sidebar */}
        <div
          className="lg:w-2/5 text-white p-8 lg:p-10 print-break-inside-avoid"
          style={{ background: "var(--accent)" }}
        >
          {/* Profielfoto */}
          {data.personal.photoUrl && (
            <div className="mb-8 flex justify-center">
              <div
                className="w-32 h-32 rounded-full overflow-hidden border-4 shadow-lg"
                style={{ borderColor: "rgba(255,255,255,0.20)" }}
              >
                <img
                  src={data.personal.photoUrl}
                  alt={data.personal.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Naam & Titel */}
          <div className="text-center lg:text-left mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2 text-white">
              {data.personal.name}
            </h1>
            <p
              className="text-lg font-medium"
              style={{ color: "var(--accent)", opacity: 0.7 }}
            >
              {data.personal.title}
            </p>
          </div>

          {/* Contact */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5" style={{ color: "var(--accent)" }} />
              <span className="text-sm">{data.personal.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5" style={{ color: "var(--accent)" }} />
              <span className="text-sm">{data.personal.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5" style={{ color: "var(--accent)" }} />
              <span className="text-sm">{new Date().getFullYear()}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
              <User className="w-5 h-5" style={{ color: "var(--accent)" }} />
              Skills
            </h2>
            <div className="space-y-3">
              {data.skills.map((skill, i) => (
                <div
                  key={i}
                  className="backdrop-blur-sm rounded-lg px-4 py-2"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <span className="text-sm font-medium text-white">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/5 p-8 lg:p-10 bg-gray-50 print:bg-white print-break-inside-avoid">
          {/* Profiel */}
          <section className="mb-10">
            <h2
              className="text-2xl font-bold mb-4 border-b-2 pb-2"
              style={{ color: "var(--accent)", borderColor: "var(--accent)" }}
            >
              Profiel
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm lg:text-base">
              {data.profile}
            </p>
          </section>

          {/* Werkervaring */}
          <section className="mb-10">
            <h2
              className="text-2xl font-bold mb-6 border-b-2 pb-2 flex items-center gap-2"
              style={{ color: "var(--accent)", borderColor: "var(--accent)" }}
            >
              <Briefcase className="w-6 h-6" style={{ color: "var(--accent)" }} />
              Werkervaring
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg p-6 shadow-sm border"
                  style={{ borderColor: "var(--accent)", boxShadow: "0 1px 3px 0 rgba(0,0,0,0.03)" }}
                >
                  <div className="mb-3">
                    <h3
                      className="text-lg font-semibold"
                      style={{ color: "var(--accent)" }}
                    >
                      {exp.job}
                    </h3>
                    <p
                      className="font-medium"
                      style={{ color: "var(--accent)", opacity: 0.7 }}
                    >
                      {exp.company}
                    </p>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Opleiding */}
          <section>
            <h2
              className="text-2xl font-bold mb-6 border-b-2 pb-2"
              style={{ color: "var(--accent)", borderColor: "var(--accent)" }}
            >
              Opleiding
            </h2>
            <div className="space-y-4">
              {data.education.map((edu, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg p-5 shadow-sm border"
                  style={{ borderColor: "var(--accent)", boxShadow: "0 1px 3px 0 rgba(0,0,0,0.03)" }}
                >
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-2">
                    <div>
                      <h3
                        className="text-lg font-semibold"
                        style={{ color: "var(--accent)" }}
                      >
                        {edu.degree}
                      </h3>
                      <p
                        style={{ color: "var(--accent)", opacity: 0.7 }}
                      >
                        {edu.school}
                      </p>
                    </div>
                    <span
                      className="text-sm font-medium lg:text-right"
                      style={{ color: "var(--accent)", opacity: 0.7 }}
                    >
                      {edu.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
