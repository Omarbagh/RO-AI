import { CVTemplateProps } from "@/types/cv";
import { Mail, Phone } from "lucide-react";


export function SalesTemplate({ data }: CVTemplateProps) {
  return (
    <div className="max-w-5xl mx-auto bg-white">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-5xl font-bold mb-3">{data.personal.name}</h1>
            <p className="text-2xl text-green-200">{data.personal.title}</p>
            <div className="mt-6 space-y-2">
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
          <div className="text-center">
            <div className="bg-white text-green-600 rounded-lg p-4 mb-4">
              <div className="text-3xl font-bold">TOP</div>
              <div className="text-sm">PERFORMER</div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-10">
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-green-600 mb-6">
            Sales Philosophy
          </h2>
          <div className="bg-green-50 border-l-4 border-green-500 p-6">
            <p className="text-lg text-gray-800">{data.profile}</p>
          </div>
        </section>
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-blue-600 mb-8">
            Track Record
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold text-gray-800">{exp.job}</h3>
                <p className="text-blue-600 font-semibold">{exp.company}</p>
                <p className="text-gray-700 mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}