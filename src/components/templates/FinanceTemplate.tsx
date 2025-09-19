import { CVTemplateProps } from "@/types/cv";

export function FinanceTemplate({ data }: CVTemplateProps) {
  const accent = data.settings?.accent || "#1E40AF";

  return (
    <div
      className="max-w-4xl mx-auto bg-white"
      style={{ "--accent": accent } as React.CSSProperties}
    >
      <div className="bg-gray-900 text-white p-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">{data.personal.name}</h1>
            <p className="text-xl text-gray-300">{data.personal.title}</p>
            <div className="mt-4 space-y-1 text-sm">
              <div>{data.personal.email}</div>
              <div>{data.personal.phone}</div>
            </div>
          </div>
          <div className="text-right">
            <div
              className="px-4 py-2 rounded font-bold"
              style={{
                background: "var(--accent)",
                color: "#111827",
              }}
            >
              CFA • MBA
            </div>
          </div>
        </div>
      </div>
      <div className="p-8">
        <section className="mb-8">
          <h2
            className="text-2xl font-bold text-gray-900 mb-4 border-b-2 pb-2"
            style={{ borderColor: "var(--accent)" }}
          >
            Investment Philosophy
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.profile}</p>
        </section>
        <section className="mb-8">
          <h2
            className="text-2xl font-bold text-gray-900 mb-6 border-b-2 pb-2"
            style={{ borderColor: "var(--accent)" }}
          >
            Professional Experience
          </h2>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-6 bg-gray-50 p-4 rounded">
              <h3 className="text-lg font-semibold text-gray-900">{exp.job}</h3>
              <p className="font-medium" style={{ color: "var(--accent)" }}>
                {exp.company}
              </p>
              <p className="text-gray-700 mt-2">{exp.description}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
