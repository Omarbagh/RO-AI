import { CVTemplateProps } from "@/types/cv";
import {
  Mail,
  Phone,
  User,
  Briefcase,
  GraduationCap,
  Star,
} from "lucide-react";

export default function ModernCardTemplate({ data }: CVTemplateProps) {
  return (
    <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      {/* Profile Card */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
          <div className="flex items-center gap-6">
            {data.personal.photoUrl && (
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30">
                <img
                  src={data.personal.photoUrl}
                  alt={data.personal.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <h1 className="text-4xl font-bold mb-2">{data.personal.name}</h1>
              <p className="text-xl text-blue-100">{data.personal.title}</p>
              <div className="flex gap-4 mt-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4" />
                  {data.personal.email}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4" />
                  {data.personal.phone}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">Over Mij</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            {data.profile}
          </p>
        </div>
      </div>

      {/* Experience Cards */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Briefcase className="w-6 h-6 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-800">Werkervaring</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {data.experience.map((exp, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{exp.job}</h3>
                  <p className="text-blue-600 font-semibold">{exp.company}</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-full">
                  <Star className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills & Education Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Skills */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Vaardigheden
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {data.skills.map((skill, i) => (
              <div
                key={i}
                className="bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 rounded-xl p-3 text-center"
              >
                <span className="text-blue-800 font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">Opleiding</h2>
          </div>
          <div className="space-y-4">
            {data.education.map((edu, i) => (
              <div
                key={i}
                className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl"
              >
                <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                <p className="text-blue-600 font-semibold">{edu.school}</p>
                <p className="text-gray-600">{edu.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
