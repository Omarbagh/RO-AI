import { CVTemplateProps } from "@/types/cv";
import { Mail, Phone } from "lucide-react";

export function MagazineTemplate({ data }: CVTemplateProps) {
  const firstName = data.personal.name.split(" ")[0] || "";
  const lastName = data.personal.name.split(" ")[1] || "";

  return (
    <div className="max-w-5xl mx-auto bg-white">
      <div className="grid grid-cols-3 gap-0">
        <div className="col-span-2 p-10">
          <h1 className="text-7xl font-black text-gray-900 leading-none mb-2">
            {firstName}
          </h1>
          <h1
            className="text-7xl font-black leading-none mb-4"
            style={{ color: "var(--accent)" }}
          >
            {lastName}
          </h1>
          <p className="text-2xl text-gray-600 mb-8">{data.personal.title}</p>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {data.profile}
          </p>

          {data.experience.map((exp, i) => (
            <div key={i} className="mb-6">
              <h3 className="text-xl font-bold text-gray-900">{exp.job}</h3>
              <p
                className="font-semibold"
                style={{ color: "var(--accent)" }}
              >
                {exp.company}
              </p>
              <p className="text-gray-700 text-sm">{exp.description}</p>
            </div>
          ))}
        </div>

        <div
          className="text-white p-8"
          style={{ background: "var(--accent)" }}
        >
          {data.personal.photoUrl && (
            <div className="w-full h-32 mb-6">
              <img
                src={data.personal.photoUrl}
                alt={data.personal.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="space-y-4 text-sm">
            <div>
              <Mail className="w-4 h-4 inline mr-2" />
              {data.personal.email}
            </div>
            <div>
              <Phone className="w-4 h-4 inline mr-2" />
              {data.personal.phone}
            </div>
          </div>

          <h3 className="text-lg font-bold mt-8 mb-4">Skills</h3>
          {data.skills.map((skill, i) => (
            <div key={i} className="text-sm mb-2">
              {skill}
            </div>
          ))}

          <h3 className="text-lg font-bold mt-8 mb-4">Education</h3>
          {data.education.map((edu, i) => (
            <div key={i} className="text-sm mb-4">
              <div className="font-semibold">{edu.degree}</div>
              <div>{edu.school}</div>
              <div>{edu.year}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
