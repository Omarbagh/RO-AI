import { CVTemplateProps } from "@/types/cv";

// Template 13: Newspaper Style
export function NewspaperTemplate({ data }: CVTemplateProps) {
  return (
    <div className="max-w-5xl mx-auto bg-white border-8 border-black">
      <div className="bg-black text-white p-4 text-center">
        <h1 className="text-4xl font-bold font-serif">
          THE PROFESSIONAL TIMES
        </h1>
        <p className="text-sm">Career Edition • {new Date().getFullYear()}</p>
      </div>

      <div className="p-8">
        <div className="border-b-4 border-black pb-6 mb-6">
          <h1 className="text-6xl font-bold font-serif text-center mb-2">
            {data.personal.name}
          </h1>
          <p className="text-2xl text-center text-gray-600 font-serif italic">
            {data.personal.title}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <h2 className="text-2xl font-bold font-serif border-b-2 border-black mb-4">
              BREAKING: Professional Profile
            </h2>
            <p className="text-gray-800 leading-relaxed mb-6 font-serif">
              {data.profile}
            </p>

            <h2 className="text-2xl font-bold font-serif border-b-2 border-black mb-4">
              CAREER HIGHLIGHTS
            </h2>
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-6 border-l-4 border-black pl-4">
                <h3 className="text-lg font-bold font-serif">{exp.job}</h3>
                <p className="font-serif italic text-gray-600">{exp.company}</p>
                <p className="font-serif text-sm text-gray-800">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>

          <div className="border-l-4 border-black pl-6">
            <h3 className="text-lg font-bold font-serif border-b border-black mb-4">
              CONTACT INFO
            </h3>
            <div className="space-y-2 text-sm font-serif mb-6">
              <div>{data.personal.email}</div>
              <div>{data.personal.phone}</div>
            </div>

            <h3 className="text-lg font-bold font-serif border-b border-black mb-4">
              EXPERTISE
            </h3>
            {data.skills.map((skill, i) => (
              <div key={i} className="text-sm font-serif mb-1">
                • {skill}
              </div>
            ))}

            <h3 className="text-lg font-bold font-serif border-b border-black mb-4 mt-6">
              CREDENTIALS
            </h3>
            {data.education.map((edu, i) => (
              <div key={i} className="text-sm font-serif mb-3">
                <div className="font-bold">{edu.degree}</div>
                <div>{edu.school}</div>
                <div className="text-gray-600">{edu.year}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
