import { CVTemplateProps } from "@/types/cv";

export function InfluencerTemplate({ data }: CVTemplateProps) {
  const accent = data.settings?.accent || "#1E40AF";

  return (
    <div
      className="max-w-4xl mx-auto"
      style={{ "--accent": accent } as React.CSSProperties}
    >
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div
          className="p-8 text-white text-center"
          style={{
            background: "var(--accent, #a21caf)", // Accentkleur header
          }}
        >
          {data.personal.photoUrl && (
            <div
              className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 mb-6"
              style={{
                borderColor: "#fff",
              }}
            >
              <img
                src={data.personal.photoUrl}
                alt={data.personal.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <h1 className="text-4xl font-bold mb-2">{data.personal.name}</h1>
          <p
            className="text-xl"
            style={{ color: "var(--accent)", opacity: 0.8 }}
          >
            {data.personal.title}
          </p>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <span>{data.personal.email}</span>
            <span>{data.personal.phone}</span>
          </div>
        </div>
        <div className="p-8">
          <section className="mb-8 text-center">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--accent)" }}
            >
              About Me
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.profile}</p>
          </section>
          <section className="mb-8">
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "var(--accent)" }}
            >
              Brand Collaborations
            </h2>
            <div className="grid gap-4">
              {data.experience.map((exp, i) => (
                <div
                  key={i}
                  className="rounded-xl p-6"
                  style={{
                    background: "var(--accent, #d8b4fe)",
                    opacity: 0.22,
                  }}
                >
                  <h3 className="font-bold text-gray-800">{exp.job}</h3>
                  <p style={{ color: "var(--accent)" }}>{exp.company}</p>
                  <p className="text-gray-700 text-sm mt-2">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
