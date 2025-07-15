import { CVTemplateProps } from "@/types/cv";

export function CorporateBlueTemplate({ data }: CVTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg">
      <div className="bg-blue-900 text-white p-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">{data.personal.name}</h1>
            <p className="text-xl text-blue-200">{data.personal.title}</p>
            <div className="mt-4 space-y-1 text-sm">
              <div>{data.personal.email}</div>
              <div>{data.personal.phone}</div>
            </div>
          </div>
          {data.personal.photoUrl && (
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-300">
              <img
                src={data.personal.photoUrl}
                alt={data.personal.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <div className="p-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4 border-b-2 border-blue-900 pb-2">
            Professional Summary
          </h2>
          <p className="text-gray-700">{data.profile}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 border-b-2 border-blue-900 pb-2">
            Work Experience
          </h2>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-6 bg-blue-50 p-4 rounded">
              <h3 className="text-lg font-semibold text-gray-900">{exp.job}</h3>
              <p className="text-blue-700 font-medium">{exp.company}</p>
              <p className="text-gray-700 mt-2">{exp.description}</p>
            </div>
          ))}
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <section>
            <h2 className="text-2xl font-bold text-blue-900 mb-4 border-b-2 border-blue-900 pb-2">
              Skills
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {data.skills.map((skill, i) => (
                <div
                  key={i}
                  className="bg-blue-100 text-blue-800 p-2 rounded text-sm text-center"
                >
                  {skill}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-900 mb-4 border-b-2 border-blue-900 pb-2">
              Education
            </h2>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-4">
                <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-blue-700">{edu.school}</p>
                <p className="text-gray-600 text-sm">{edu.year}</p>
              </div>
            ))}
          </section>
            </div>
        </div>
    </div>
  )}