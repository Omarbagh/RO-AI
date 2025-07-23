import { CVTemplateProps } from "@/types/cv";

export function ConsultingTemplate({ data }: CVTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white">
      <div
        className="pl-8 py-8 border-l-8"
        style={{ borderColor: "var(--accent)" }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {data.personal.name}
        </h1>
        <p
          className="text-xl mb-6"
          style={{ color: "var(--accent)" }}
        >
          {data.personal.title}
        </p>
        <div className="flex gap-8 text-gray-600">
          <span>{data.personal.email}</span>
          <span>{data.personal.phone}</span>
        </div>
      </div>
      <div className="px-8 pb-8">
        <section className="mb-8">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--accent)" }}
          >
            Executive Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.profile}</p>
        </section>
        <section className="mb-8">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: "var(--accent)" }}
          >
            Consulting Experience
          </h2>
          {data.experience.map((exp, i) => (
            <div
              key={i}
              className="mb-6 border-l-4 pl-6"
              style={{ borderColor: "var(--accent)", background: "rgba(var(--accent-rgb), 0.04)" }} // optioneel voor lichte lijn
            >
              <h3 className="text-lg font-semibold text-gray-900">{exp.job}</h3>
              <p style={{ color: "var(--accent)" }}>{exp.company}</p>
              <p className="text-gray-700 mt-2">{exp.description}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
