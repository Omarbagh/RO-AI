import { CVTemplateProps } from "@/types/cv";


export function MedicalTemplate({ data }: CVTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white">
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Dr. {data.personal.name}
            </h1>
            <p className="text-xl text-blue-100">{data.personal.title}</p>
            <div className="mt-4 flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                {data.personal.email}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                {data.personal.phone}
              </div>
            </div>
          </div>
          {data.personal.photoUrl && (
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30">
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
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Professional Profile
            </h2>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r">
            <p className="text-gray-700 leading-relaxed">{data.profile}</p>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Clinical Experience
            </h2>
          </div>
          {data.experience.map((exp, i) => (
            <div
              key={i}
              className="mb-6 bg-white border border-gray-200 rounded p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-800">{exp.job}</h3>
              <p className="text-teal-600 font-medium">{exp.company}</p>
              <p className="text-gray-700 mt-2">{exp.description}</p>
            </div>
          ))}
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Specializations
              </h2>
            </div>
            <div className="space-y-2">
              {data.skills.map((skill, i) => (
                <div
                  key={i}
                  className="bg-green-50 border border-green-200 rounded p-3"
                >
                  <span className="text-green-800 font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Medical Education
              </h2>
            </div>
            {data.education.map((edu, i) => (
              <div
                key={i}
                className="mb-4 bg-purple-50 border-l-4 border-purple-600 p-4 rounded-r"
              >
                <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                <p className="text-purple-600">{edu.school}</p>
                <p className="text-gray-600 text-sm">{edu.year}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}