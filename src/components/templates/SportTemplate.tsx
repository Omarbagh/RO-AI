import { CVTemplateProps } from "@/types/cv";


export function SportsTemplate({ data }: CVTemplateProps) {
  return (
    <div className="max-w-5xl mx-auto bg-gradient-to-br from-orange-50 to-red-50">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold mb-3">{data.personal.name}</h1>
            <p className="text-2xl text-orange-100">{data.personal.title}</p>
          </div>
          <div className="text-6xl">🏆</div>
        </div>
      </div>
      <div className="p-10">
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-orange-600 mb-6">
            Athletic Philosophy
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {data.profile}
          </p>
        </section>
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-red-600 mb-8">
            Career Achievements
          </h2>
          {data.experience.map((exp, i) => (
            <div
              key={i}
              className="mb-6 bg-white rounded-lg p-6 shadow-sm border-l-4 border-orange-500"
            >
              <h3 className="text-xl font-bold text-gray-900">{exp.job}</h3>
              <p className="text-orange-600 font-semibold">{exp.company}</p>
              <p className="text-gray-700 mt-2">{exp.description}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
