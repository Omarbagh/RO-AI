import { CVTemplateProps } from "@/types/cv";
import { Mail, Phone, Zap, Target, Award } from "lucide-react";

export default function BoldTemplate({ data }: CVTemplateProps) {
  return (
    <div className="max-w-5xl mx-auto bg-white">
      {/* Bold Header */}
      <div className="bg-black text-white p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-6xl font-black mb-4 tracking-tight">
              {data.personal.name.toUpperCase()}
            </h1>
            <p className="text-3xl text-red-400 font-bold mb-6">
              {data.personal.title}
            </p>
            <div className="flex gap-8 text-lg">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-red-400" />
                {data.personal.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-red-400" />
                {data.personal.phone}
              </div>
            </div>
          </div>
          {data.personal.photoUrl && (
            <div className="w-40 h-40 rounded-lg overflow-hidden border-4 border-red-400">
              <img
                src={data.personal.photoUrl}
                alt={data.personal.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <div className="p-12">
        {/* Impact Statement */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <Zap className="w-8 h-8 text-red-600" />
            <h2 className="text-4xl font-black text-black">IMPACT</h2>
          </div>
          <div className="bg-red-50 border-l-8 border-red-600 p-8">
            <p className="text-xl text-gray-800 font-medium leading-relaxed">
              {data.profile}
            </p>
          </div>
        </section>

        {/* Experience */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <Target className="w-8 h-8 text-red-600" />
            <h2 className="text-4xl font-black text-black">EXPERIENCE</h2>
          </div>
          <div className="space-y-8">
            {data.experience.map((exp, i) => (
              <div
                key={i}
                className="bg-gray-900 text-white p-8 rounded-lg relative"
              >
                <div className="absolute top-4 right-4 bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-black text-xl">
                  {i + 1}
                </div>
                <h3 className="text-2xl font-black mb-2 text-red-400">
                  {exp.job}
                </h3>
                <p className="text-xl font-bold mb-4">{exp.company}</p>
                <p className="text-gray-300 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Education */}
        <div className="grid md:grid-cols-2 gap-12">
          <section>
            <div className="flex items-center gap-4 mb-8">
              <Award className="w-8 h-8 text-red-600" />
              <h2 className="text-3xl font-black text-black">SKILLS</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {data.skills.map((skill, i) => (
                <div
                  key={i}
                  className="bg-black text-white p-4 rounded-lg text-center font-bold"
                >
                  {skill}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black text-black mb-8">EDUCATION</h2>
            <div className="space-y-6">
              {data.education.map((edu, i) => (
                <div
                  key={i}
                  className="bg-red-50 border border-red-200 p-6 rounded-lg"
                >
                  <h3 className="text-xl font-black text-black">
                    {edu.degree}
                  </h3>
                  <p className="text-red-600 font-bold">{edu.school}</p>
                  <p className="text-gray-700 font-semibold">{edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
