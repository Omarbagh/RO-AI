import { CVTemplateProps } from "@/types/cv";
import {  Users, Heart } from "lucide-react";

export function NonProfitTemplate({ data }: CVTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white">
      <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-3">{data.personal.name}</h1>
          <p className="text-xl text-green-100">{data.personal.title}</p>
          <div className="flex justify-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              {data.personal.email}
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              {data.personal.phone}
            </div>
          </div>
        </div>
      </div>
      <div className="p-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Mission & Vision
          </h2>
          <div className="bg-green-50 border-l-4 border-green-500 p-6">
            <p className="text-gray-700 leading-relaxed">{data.profile}</p>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-teal-600 mb-6">
            Impact & Experience
          </h2>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-6 bg-teal-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900">{exp.job}</h3>
              <p className="text-teal-600 font-medium">{exp.company}</p>
              <p className="text-gray-700 mt-2">{exp.description}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}