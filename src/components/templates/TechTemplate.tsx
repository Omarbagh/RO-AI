import { CVTemplateProps } from "@/types/cv";
import { Code, Terminal, Cpu } from "lucide-react";

export default function TechTemplate({ data }: CVTemplateProps) {
  return (
    <div className="max-w-5xl mx-auto bg-gray-900 text-green-400 font-mono overflow-hidden">
      {/* Terminal Header */}
      <div className="bg-black border-b border-green-500 p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-4 text-green-400">
            terminal - developer_resume
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            <span className="text-blue-400">$</span>
            <span className="text-white">whoami</span>
          </div>
          <div className="ml-6">
            <h1 className="text-3xl font-bold text-white">
              {data.personal.name}
            </h1>
            <p className="text-cyan-400 text-xl">{data.personal.title}</p>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <span className="text-blue-400">$</span>
            <span className="text-white">cat contact.info</span>
          </div>
          <div className="ml-6 space-y-1">
            <div className="text-green-300">📧 {data.personal.email}</div>
            <div className="text-green-300">📱 {data.personal.phone}</div>
          </div>
        </div>
      </div>

      <div className="p-8 bg-gray-900">
        {/* About/Profile */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-400">$</span>
            <span className="text-white">cat README.md</span>
          </div>
          <div className="bg-gray-800 border border-green-500 rounded p-6 ml-6">
            <h2 className="text-xl font-bold text-cyan-400 mb-4"># About</h2>
            <p className="text-gray-300 leading-relaxed">
              ```
              {data.profile}
              ```
            </p>
          </div>
        </section>

        {/* Experience */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-400">$</span>
            <span className="text-white">git log --oneline</span>
          </div>
          <div className="ml-6 space-y-4">
            {data.experience.map((exp, i) => (
              <div key={i} className="border-l-2 border-green-500 pl-6 pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-4 h-4 text-yellow-400" />
                  <h3 className="text-lg font-bold text-white">{exp.job}</h3>
                  <span className="text-cyan-400">@{exp.company}</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                   {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Education */}
        <div className="grid md:grid-cols-2 gap-8">
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-blue-400">$</span>
              <span className="text-white">npm list --global</span>
            </div>
            <div className="bg-gray-800 border border-green-500 rounded p-6 ml-6">
              <div className="space-y-2">
                {data.skills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-green-400">├──</span>
                    <Cpu className="w-4 h-4 text-yellow-400" />
                    <span className="text-white">{skill}</span>
                    <span className="text-green-400">@latest</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-blue-400">$</span>
              <span className="text-white">cat education.json</span>
            </div>
            <div className="bg-gray-800 border border-green-500 rounded p-6 ml-6">
              <div className="space-y-4">
                {data.education.map((edu, i) => (
                  <div key={i} className="text-sm">
                    <div className="text-cyan-400">
                      &quot;{edu.degree}&quot;: {`{`}
                    </div>
                    <div className="ml-4 text-gray-300">
                      &quot;institution&quot;: &quot;{edu.school}&quot;,
                    </div>
                    <div className="ml-4 text-gray-300">
                      &quot;year&quot;: &quot;{edu.year}&quot;
                    </div>
                    <div className="text-cyan-400">{`}`}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-8 flex items-center gap-2">
          <span className="text-blue-400">$</span>
          <span className="text-white">
            echo &quot;Thanks for reviewing my profile!&quot;
          </span>
        </div>
        <div className="ml-6 text-green-400">
          Thanks for reviewing my profile!
        </div>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-blue-400">$</span>
          <span className="text-green-400 animate-pulse">_</span>
        </div>
      </div>
    </div>
  );
}
