import { CVTemplateProps } from "@/types/cv";
import { Mail, Phone, Calendar } from "lucide-react";

export default function ClassicTemplate({ data }: CVTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg">
      {/* Header */}
      <div className="bg-navy-900 text-white p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">{data.personal.name}</h1>
            <p className="text-xl text-blue-200">{data.personal.title}</p>
          </div>
          {data.personal.photoUrl && (
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20">
              <img
                src={data.personal.photoUrl}
                alt={data.personal.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
        <div className="mt-6 flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            {data.personal.email}
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            {data.personal.phone}
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {new Date().getFullYear()}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Profile */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
            Professioneel Profiel
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.profile}</p>
        </section>

        {/* Experience */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
            Werkervaring
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, i) => (
              <div key={i} className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  {exp.job}
                </h3>
                <p className="text-blue-600 font-medium mb-2">{exp.company}</p>
                <p className="text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Skills */}
        <div className="grid md:grid-cols-2 gap-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
              Opleiding
            </h2>
            <div className="space-y-4">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                  <p className="text-blue-600">{edu.school}</p>
                  <p className="text-gray-600 text-sm">{edu.year}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
              Vaardigheden
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {data.skills.map((skill, i) => (
                <div
                  key={i}
                  className="bg-blue-50 text-blue-800 px-3 py-2 rounded text-sm"
                >
                  {skill}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
