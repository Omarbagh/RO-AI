import { CVTemplateProps } from "@/types/cv";


export function GamingTemplate({ data }: CVTemplateProps) {
  return (
    <div className="max-w-5xl mx-auto bg-gray-900 text-green-400 font-mono border-4 border-green-400">
      <div className="bg-black p-4 border-b-2 border-green-400">
        <div className="text-center">
          <div className="text-green-400 text-sm mb-2">
            ██████���█████████████████████
          </div>
          <h1 className="text-2xl font-bold">PLAYER PROFILE LOADED</h1>
          <div className="text-green-400 text-sm mt-2">
            ████████████████████████████
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="border border-green-400 p-6 mb-6">
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">
            &gt; {data.personal.name.toUpperCase()}
          </h1>
          <p className="text-xl text-cyan-400 mb-4">
            CLASS: {data.personal.title}
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>EMAIL: {data.personal.email}</div>
            <div>PHONE: {data.personal.phone}</div>
          </div>
        </div>

        <div className="border border-green-400 p-6 mb-6">
          <h2 className="text-xl font-bold text-yellow-400 mb-4">
            [MISSION BRIEFING]
          </h2>
          <p className="text-green-300 leading-relaxed">{data.profile}</p>
        </div>

        <div className="border border-green-400 p-6 mb-6">
          <h2 className="text-xl font-bold text-yellow-400 mb-4">
            [QUEST LOG]
          </h2>
          {data.experience.map((exp, i) => (
            <div
              key={i}
              className="mb-4 bg-gray-800 p-4 border border-gray-600"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-cyan-400">{exp.job}</h3>
                <span className="text-yellow-400 text-sm">★ COMPLETED</span>
              </div>
              <p className="text-green-300 text-sm mb-2">
                Location: {exp.company}
              </p>
              <p className="text-gray-300 text-sm">{exp.description}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-green-400 p-6">
            <h2 className="text-xl font-bold text-yellow-400 mb-4">
              [SKILL TREE]
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {data.skills.map((skill, i) => (
                <div
                  key={i}
                  className="bg-gray-800 border border-gray-600 p-2 text-center text-sm"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          <div className="border border-green-400 p-6">
            <h2 className="text-xl font-bold text-yellow-400 mb-4">
              [ACHIEVEMENTS]
            </h2>
            {data.education.map((edu, i) => (
              <div
                key={i}
                className="mb-4 bg-gray-800 p-3 border border-gray-600"
              >
                <div className="text-cyan-400 font-bold text-sm">
                  {edu.degree}
                </div>
                <div className="text-green-300 text-sm">{edu.school}</div>
                <div className="text-gray-400 text-xs">{edu.year}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-6 text-green-400">
          &gt; PRESS ANY KEY TO CONTINUE...
        </div>
      </div>
    </div>
  );
}