import { CVTemplateProps } from '@/types/cv';


export function ArchitectTemplate({ data }: CVTemplateProps) {
  return (
    <div className="max-w-5xl mx-auto bg-white">
      <div className="grid grid-cols-4 min-h-screen">
        <div className="bg-gray-900 text-white p-8">
          {data.personal.photoUrl && (
            <div className="w-full h-32 mb-6 overflow-hidden">
              <img
                src={data.personal.photoUrl}
                alt={data.personal.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <h1 className="text-2xl font-bold mb-2">{data.personal.name}</h1>
          <p className="text-gray-300 text-sm mb-6">{data.personal.title}</p>

          <div className="space-y-4 text-xs">
            <div>
              <h3 className="font-bold mb-2">CONTACT</h3>
              <div className="space-y-1 text-gray-300">
                <div>{data.personal.email}</div>
                <div>{data.personal.phone}</div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-2">SKILLS</h3>
              <div className="space-y-1 text-gray-300">
                {data.skills.map((skill, i) => (
                  <div key={i}>• {skill}</div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-2">EDUCATION</h3>
              {data.education.map((edu, i) => (
                <div key={i} className="mb-3 text-gray-300">
                  <div className="font-semibold text-white text-xs">
                    {edu.degree}
                  </div>
                  <div className="text-xs">{edu.school}</div>
                  <div className="text-xs">{edu.year}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-3 p-12">
          <section className="mb-12">
            <h2 className="text-4xl font-light text-gray-800 mb-8">
              PROJECT STATEMENT
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed font-light">
              {data.profile}
            </p>
          </section>

          <section>
            <h2 className="text-4xl font-light text-gray-800 mb-8">
              PORTFOLIO
            </h2>
            <div className="space-y-12">
              {data.experience.map((exp, i) => (
                <div key={i} className="border-b border-gray-200 pb-8">
                  <div className="grid grid-cols-3 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {exp.job}
                      </h3>
                      <p className="text-gray-600 text-sm uppercase tracking-wide">
                        {exp.company}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-700 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}