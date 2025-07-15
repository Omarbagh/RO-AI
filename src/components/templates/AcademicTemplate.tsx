import { CVTemplateProps } from '@/types/cv';


export function AcademicTemplate({ data }: CVTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white">
      <div className="border-t-8 border-blue-800 pt-8 pb-6 mb-8">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-gray-900 mb-3">
            {data.personal.name}
          </h1>
          <p className="text-xl text-blue-800 mb-4">{data.personal.title}</p>
          <div className="flex justify-center gap-6 text-gray-600">
            <span>{data.personal.email}</span>
            <span>{data.personal.phone}</span>
          </div>
        </div>
      </div>

      <div className="px-8">
        <section className="mb-8">
          <h2 className="text-2xl font-serif text-blue-800 border-b-2 border-blue-800 pb-2 mb-4">
            Research Interests
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.profile}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-serif text-blue-800 border-b-2 border-blue-800 pb-2 mb-6">
            Academic Positions
          </h2>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">{exp.job}</h3>
              <p className="text-blue-700 italic">{exp.company}</p>
              <p className="text-gray-700 mt-2">{exp.description}</p>
            </div>
          ))}
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <section>
            <h2 className="text-2xl font-serif text-blue-800 border-b-2 border-blue-800 pb-2 mb-4">
              Research Skills
            </h2>
            <ul className="space-y-2">
              {data.skills.map((skill, i) => (
                <li key={i} className="text-gray-700 flex items-start">
                  <span className="text-blue-800 mr-2">•</span>
                  {skill}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-blue-800 border-b-2 border-blue-800 pb-2 mb-4">
              Education
            </h2>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-4">
                <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-blue-700 italic">{edu.school}</p>
                <p className="text-gray-600">{edu.year}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
