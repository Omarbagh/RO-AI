import { CVTemplateProps } from "@/types/cv";

export function FashionTemplate({ data }: CVTemplateProps) {
  const accent = data.settings?.accent || "#1E40AF";

  return (
    <div
      className="max-w-5xl mx-auto"
      style={{ '--accent': accent } as React.CSSProperties}
    >
      <div className="bg-white">
        <div className="relative overflow-hidden">
          {/* Accent cirkel rechtsboven */}
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full -translate-y-32 translate-x-32"
            style={{
              background: "var(--accent)",
              opacity: 0.18,
            }}
          ></div>
          <div className="relative z-10 p-12">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-5xl font-light text-gray-900 mb-3">
                  {data.personal.name}
                </h1>
                <p
                  className="text-2xl italic"
                  style={{ color: "var(--accent)" }}
                >
                  {data.personal.title}
                </p>
              </div>
              {data.personal.photoUrl && (
                <div
                  className="w-32 h-32 rounded-lg overflow-hidden border-4"
                  style={{ borderColor: "var(--accent)" }}
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
        </div>
        <div className="px-12 pb-12">
          <section className="mb-10">
            <h2
              className="text-3xl font-light mb-6"
              style={{ color: "var(--accent)" }}
            >
              Style Philosophy
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed italic">
              {data.profile}
            </p>
          </section>
          <section className="mb-10">
            <h2
              className="text-3xl font-light mb-8"
              style={{ color: "var(--accent)" }}
            >
              Fashion Portfolio
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {data.experience.map((exp, i) => (
                <div
                  key={i}
                  className="rounded-lg p-6"
                  style={{
                    background: "rgba(var(--accent-rgb,253,164,175),0.07)",
                  }}
                >
                  <h3 className="text-xl font-semibold text-gray-900">
                    {exp.job}
                  </h3>
                  <p
                    className="italic"
                    style={{ color: "var(--accent)" }}
                  >
                    {exp.company}
                  </p>
                  <p className="text-gray-700 mt-3">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
