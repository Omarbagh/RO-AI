import { CVTemplateProps } from "@/types/cv";
import { Mail, Phone } from "lucide-react";

export default function TimelineTemplate({ data }: CVTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Header */}
      <div className="text-center py-12 bg-gradient-to-b from-slate-50 to-white">
        {data.personal.photoUrl && (
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-slate-300 mb-6">
            <img
              src={data.personal.photoUrl}
              alt={data.personal.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <h1 className="text-5xl font-bold text-slate-800 mb-3">
          {data.personal.name}
        </h1>
        <p className="text-2xl text-slate-600 mb-6">{data.personal.title}</p>
        <div className="flex justify-center gap-8 text-slate-600">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            {data.personal.email}
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            {data.personal.phone}
          </div>
        </div>
      </div>

      <div className="px-8 pb-12">
        {/* Profile */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-8">
            Professioneel Profiel
          </h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-slate-700 leading-relaxed">
              {data.profile}
            </p>
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">
            Carrière Timeline
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-slate-300 h-full"></div>

            {data.experience.map((exp, i) => (
              <div key={i} className="relative mb-12">
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-slate-600 rounded-full border-4 border-white shadow-lg z-10"></div>

                {/* Content card */}
                <div
                  className={`flex ${
                    i % 2 === 0 ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`w-5/12 ${
                      i % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
                    }`}
                  >
                    <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-lg">
                      <h3 className="text-xl font-bold text-slate-800 mb-2">
                        {exp.job}
                      </h3>
                      <p className="text-slate-600 font-semibold mb-3">
                        {exp.company}
                      </p>
                      <p className="text-slate-700">{exp.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Education */}
        <div className="grid md:grid-cols-2 gap-12">
          <section>
            <h2 className="text-3xl font-bold text-slate-800 text-center mb-8">
              Vaardigheden
            </h2>
            <div className="space-y-3">
              {data.skills.map((skill, i) => (
                <div
                  key={i}
                  className="bg-slate-100 border border-slate-200 rounded-lg p-4 text-center"
                >
                  <span className="text-slate-800 font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-800 text-center mb-8">
              Opleiding
            </h2>
            <div className="space-y-6">
              {data.education.map((edu, i) => (
                <div
                  key={i}
                  className="text-center bg-slate-50 border border-slate-200 rounded-lg p-6"
                >
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    {edu.degree}
                  </h3>
                  <p className="text-slate-600 font-semibold mb-1">
                    {edu.school}
                  </p>
                  <p className="text-slate-500">{edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
