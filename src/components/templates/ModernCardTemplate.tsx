import { CVTemplateProps } from "@/types/cv";
import {
  Mail,
  Phone,
  User,
  Briefcase,
  GraduationCap,
  Star,
} from "lucide-react";

export default function ModernCardTemplate({ data }: CVTemplateProps) {
  const accent = data.settings?.accent || "#1E40AF";

  return (
    <div
      className="max-w-6xl mx-auto p-8"
      style={{ "--accent": accent } as React.CSSProperties}
    >
      {/* Profile Card */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
        <div
          className="p-8 text-white"
          style={{
            background: "var(--accent)",
          }}
        >
          <div className="flex items-center gap-6">
            {data.personal.photoUrl && (
              <div
                className="w-24 h-24 rounded-full overflow-hidden border-4"
                style={{ borderColor: "rgba(255,255,255,0.3)" }}
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
              <p
                className="text-xl"
                style={{ color: "var(--accent)", opacity: 0.7 }}
              >
                {data.personal.title}
              </p>
              <div className="flex gap-4 mt-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4" />
                  {data.personal.email}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4" />
                  {data.personal.phone}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6" style={{ color: "var(--accent)" }} />
            <h2 className="text-2xl font-bold text-gray-800">Over Mij</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            {data.profile}
          </p>
        </div>
      </div>

      {/* Experience Cards */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Briefcase className="w-6 h-6" style={{ color: "var(--accent)" }} />
          <h2 className="text-3xl font-bold text-gray-800">Werkervaring</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {data.experience.map((exp, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{exp.job}</h3>
                  <p
                    className="font-semibold"
                    style={{ color: "var(--accent)" }}
                  >
                    {exp.company}
                  </p>
                </div>
                <div
                  className="p-2 rounded-full"
                  style={{
                    background: "rgba(var(--accent-rgb,59,130,246),0.15)",
                  }}
                >
                  <Star
                    className="w-5 h-5"
                    style={{ color: "var(--accent)" }}
                  />
                </div>
              </div>
              <p className="text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills & Education Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Skills */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Vaardigheden
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {data.skills.map((skill, i) => (
              <div
                key={i}
                className="border rounded-xl p-3 text-center"
                style={{
                  background: "rgba(var(--accent-rgb,59,130,246),0.09)",
                  borderColor: "var(--accent)",
                }}
              >
                <span
                  className="font-medium"
                  style={{ color: "var(--accent)" }}
                >
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap
              className="w-6 h-6"
              style={{ color: "var(--accent)" }}
            />
            <h2 className="text-2xl font-bold text-gray-800">Opleiding</h2>
          </div>
          <div className="space-y-4">
            {data.education.map((edu, i) => (
              <div
                key={i}
                className="border-l-4 p-4 rounded-r-xl"
                style={{
                  background: "rgba(var(--accent-rgb,59,130,246),0.07)",
                  borderLeft: "4px solid var(--accent)",
                }}
              >
                <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                <p className="font-semibold" style={{ color: "var(--accent)" }}>
                  {edu.school}
                </p>
                <p className="text-gray-600">{edu.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
