import { CVTemplateProps } from "@/types/cv";
import { Mail, Phone, Award, Building } from "lucide-react";

export default function ExecutiveTemplate({ data }: CVTemplateProps) {
  return (
    <div className="max-w-5xl mx-auto bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            {data.personal.photoUrl && (
              <div className="w-28 h-28 rounded-lg overflow-hidden border-4 border-yellow-400">
                <img
                  src={data.personal.photoUrl}
                  alt={data.personal.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <h1 className="text-4xl font-bold mb-2">{data.personal.name}</h1>
              <p className="text-xl text-yellow-300">{data.personal.title}</p>
              <div className="mt-4 flex gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {data.personal.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {data.personal.phone}
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-bold">
              EXECUTIVE
            </div>
          </div>
        </div>
      </div>

      <div className="p-10">
        {/* Executive Summary */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-yellow-600" />
            <h2 className="text-2xl font-bold text-gray-800">
              Executive Summary
            </h2>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
            <p className="text-gray-700 leading-relaxed text-lg">
              {data.profile}
            </p>
          </div>
        </section>

        {/* Professional Experience */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <Building className="w-6 h-6 text-yellow-600" />
            <h2 className="text-2xl font-bold text-gray-800">
              Professional Experience
            </h2>
          </div>
          <div className="space-y-8">
            {data.experience.map((exp, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {exp.job}
                    </h3>
                    <p className="text-lg text-yellow-600 font-semibold">
                      {exp.company}
                    </p>
                  </div>
                  <div className="bg-gray-100 px-3 py-1 rounded text-sm text-gray-600">
                    Senior Role
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Core Competencies */}
        <div className="grid md:grid-cols-2 gap-10">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Education & Credentials
            </h2>
            <div className="space-y-4">
              {data.education.map((edu, i) => (
                <div
                  key={i}
                  className="bg-gray-50 border-l-4 border-yellow-400 p-4 rounded-r-lg"
                >
                  <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                  <p className="text-yellow-600 font-semibold">{edu.school}</p>
                  <p className="text-gray-600">{edu.year}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Core Competencies
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {data.skills.map((skill, i) => (
                <div
                  key={i}
                  className="bg-yellow-100 border border-yellow-300 px-4 py-3 rounded-lg"
                >
                  <span className="font-semibold text-gray-800">{skill}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
