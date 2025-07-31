import { CVTemplateProps } from "@/types/cv";
import { Palette, Sparkles, Heart } from "lucide-react";

export default function CreativeTemplate({ data }: CVTemplateProps) {
  const accent = data.settings?.accent || "#1E40AF";

  return (
    <div
      className="max-w-5xl mx-auto overflow-hidden"
      style={{ "--accent": accent } as React.CSSProperties}
    >
      {/* Artistic Header */}
      <div
        className="relative p-10 text-white"
        style={{
          background: "var(--accent, #a21caf)",
        }}
      >
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.2)" }}></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold mb-3 text-shadow">
                {data.personal.name}
              </h1>
              <p
                className="text-2xl font-light"
                style={{ color: "#ffe999" }}
              >
                {data.personal.title}
              </p>
              <div className="mt-6 flex items-center gap-6 text-lg">
                <span
                  className="px-4 py-2 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    color: "#fff",
                  }}
                >
                  {data.personal.email}
                </span>
                <span
                  className="px-4 py-2 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    color: "#fff",
                  }}
                >
                  {data.personal.phone}
                </span>
              </div>
            </div>
            {data.personal.photoUrl && (
              <div
                className="w-32 h-32 rounded-full overflow-hidden border-4 shadow-2xl"
                style={{
                  borderColor: "rgba(255,255,255,0.5)",
                }}
              >
                <img
                  src={data.personal.photoUrl}
                  alt={data.personal.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
        {/* Decorative elements */}
        <div
          className="absolute top-4 right-4"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          <Sparkles className="w-8 h-8" />
        </div>
        <div
          className="absolute bottom-4 left-4"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          <Heart className="w-6 h-6" />
        </div>
      </div>

      <div className="p-10">
        {/* Creative Vision */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background: "var(--accent)",
              }}
            >
              <Palette className="w-5 h-5 text-white" />
            </div>
            <h2
              className="text-3xl font-bold"
              style={{
                color: "var(--accent)",
              }}
            >
              Creative Vision
            </h2>
          </div>
          <div
            className="bg-white rounded-2xl p-8 shadow-lg border"
            style={{ borderColor: "var(--accent)" }}
          >
            <p className="text-gray-700 leading-relaxed text-lg italic">
              &quot;{data.profile}&quot;
            </p>
          </div>
        </section>

        {/* Portfolio & Experience */}
        <section className="mb-10">
          <h2
            className="text-3xl font-bold mb-8"
            style={{
              color: "var(--accent)",
            }}
          >
            Creative Journey
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-lg border-l-4 transform hover:scale-105 transition-transform duration-300"
                style={{
                  borderLeft: "4px solid var(--accent)",
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {exp.job}
                    </h3>
                    <p
                      className="text-lg font-semibold"
                      style={{ color: "var(--accent)" }}
                    >
                      {exp.company}
                    </p>
                  </div>
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      background: "var(--accent)",
                      color: "#fff",
                    }}
                  >
                    <span className="font-bold">{i + 1}</span>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Education */}
        <div className="grid md:grid-cols-2 gap-10">
          <section>
            <h2
              className="text-3xl font-bold mb-6"
              style={{
                color: "var(--accent)",
              }}
            >
              Creative Skills
            </h2>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex flex-wrap gap-3">
                {data.skills.map((skill, i) => (
                  <div
                    key={i}
                    className="text-white px-4 py-2 rounded-full font-semibold shadow-lg transform hover:scale-110 transition-transform duration-200"
                    style={{
                      background: "var(--accent)",
                    }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2
              className="text-3xl font-bold mb-6"
              style={{
                color: "var(--accent)",
              }}
            >
              Learning Path
            </h2>
            <div className="space-y-4">
              {data.education.map((edu, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 shadow-lg border"
                  style={{
                    borderColor: "var(--accent)",
                  }}
                >
                  <h3 className="font-bold text-gray-800 text-lg">
                    {edu.degree}
                  </h3>
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
        </div>
      </div>
    </div>
  );
}
