import { CVTemplateProps } from "@/types/cv";
import { Palette, Sparkles, Heart } from "lucide-react";

export default function CreativeTemplate({ data }: CVTemplateProps) {
  return (
    <div className="max-w-5xl mx-auto bg-gradient-to-br from-purple-50 to-pink-50 overflow-hidden">
      {/* Artistic Header */}
      <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 p-10 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold mb-3 text-shadow">
                {data.personal.name}
              </h1>
              <p className="text-2xl text-yellow-200 font-light">
                {data.personal.title}
              </p>
              <div className="mt-6 flex items-center gap-6 text-lg">
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  {data.personal.email}
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  {data.personal.phone}
                </span>
              </div>
            </div>
            {data.personal.photoUrl && (
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/50 shadow-2xl">
                <img
                  src={data.personal.photoUrl}
                  alt={data.personal.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 text-white/30">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="absolute bottom-4 left-4 text-white/30">
          <Heart className="w-6 h-6" />
        </div>
      </div>

      <div className="p-10">
        {/* Creative Vision */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Creative Vision
            </h2>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100">
            <p className="text-gray-700 leading-relaxed text-lg italic">
              &quot;{data.profile}&quot;
            </p>
          </div>
        </section>

        {/* Portfolio & Experience */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
            Creative Journey
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-gradient-to-b from-purple-500 to-pink-500 transform hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {exp.job}
                    </h3>
                    <p className="text-lg text-purple-600 font-semibold">
                      {exp.company}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{i + 1}</span>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Education */}
        <div className="grid md:grid-cols-2 gap-10">
          <section>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Creative Skills
            </h2>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex flex-wrap gap-3">
                {data.skills.map((skill, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg transform hover:scale-110 transition-transform duration-200"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Learning Path
            </h2>
            <div className="space-y-4">
              {data.education.map((edu, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 shadow-lg border border-purple-100"
                >
                  <h3 className="font-bold text-gray-800 text-lg">
                    {edu.degree}
                  </h3>
                  <p className="text-purple-600 font-semibold">{edu.school}</p>
                  <p className="text-gray-600">{edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
