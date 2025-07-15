import { CVTemplateProps } from "@/types/cv";

export function ConsultingTemplate({ data }: CVTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white">
      <div className="border-l-8 border-blue-600 pl-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {data.personal.name}
        </h1>
        <p className="text-xl text-blue-600 mb-6">{data.personal.title}</p>
        <div className="flex gap-8 text-gray-600">
          <span>{data.personal.email}</span>
          <span>{data.personal.phone}</span>
        </div>
      </div>
      <div className="px-8 pb-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            Executive Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.profile}</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">
            Consulting Experience
          </h2>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-6 border-l-4 border-blue-200 pl-6">
              <h3 className="text-lg font-semibold text-gray-900">{exp.job}</h3>
              <p className="text-blue-600">{exp.company}</p>
              <p className="text-gray-700 mt-2">{exp.description}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}