import { CVTemplateProps } from '@/types/cv';


export function MarketingTemplate({ data }: CVTemplateProps) {
  return (
    <div className="max-w-5xl mx-auto bg-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500"></div>
        <div className="relative z-10 p-10 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold mb-3">{data.personal.name}</h1>
              <p className="text-2xl text-orange-100">{data.personal.title}</p>
              <div className="mt-6 flex gap-8 text-lg">
                <span>{data.personal.email}</span>
                <span>{data.personal.phone}</span>
              </div>
            </div>
            {data.personal.photoUrl && (
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/30">
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

      <div className="p-10">
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-orange-600 mb-6">
            BRAND STORY
          </h2>
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
            <p className="text-lg text-gray-800 leading-relaxed">
              {data.profile}
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-red-600 mb-8">
            CAMPAIGN PORTFOLIO
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {data.experience.map((exp, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {exp.job}
                    </h3>
                    <p className="text-orange-600 font-semibold">
                      {exp.company}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 w-8 h-8 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {i + 1}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-10">
          <section>
            <h2 className="text-3xl font-bold text-orange-600 mb-6">
              CORE COMPETENCIES
            </h2>
            <div className="space-y-3">
              {data.skills.map((skill, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-r from-orange-100 to-red-100 border border-orange-300 rounded-lg p-3"
                >
                  <span className="text-orange-800 font-semibold">{skill}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-red-600 mb-6">
              EDUCATION & CERTIFICATIONS
            </h2>
            {data.education.map((edu, i) => (
              <div
                key={i}
                className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg"
              >
                <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                <p className="text-red-600 font-semibold">{edu.school}</p>
                <p className="text-gray-600">{edu.year}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
