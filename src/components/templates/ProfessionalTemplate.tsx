import { CVTemplateProps } from '@/types/cv';
import { Mail, Phone, MapPin, Linkedin, Briefcase, User, GraduationCap } from 'lucide-react';

export default function ProfessionalTemplate({ data }: CVTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl font-sans grid grid-cols-1 md:grid-cols-[1fr,2.5fr]">
      {/* Sidebar */}
      <aside className="bg-gray-800 text-gray-300 p-8">
        {data.personal.photoUrl && (
          <div className="w-36 h-36 mx-auto rounded-full overflow-hidden border-4 border-gray-700">
            <img
              src={data.personal.photoUrl}
              alt="Profielfoto"
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <div className="text-center mt-6">
          <h1 className="text-2xl font-bold text-white">{data.personal.name}</h1>
          <p className="text-blue-400 mt-1">{data.personal.title}</p>
        </div>

        <div className="mt-10">
          <h2 className="text-sm font-semibold uppercase text-gray-400 tracking-wider">Contact</h2>
          <div className="w-full space-y-3 mt-4 text-sm">
            <div className="flex items-center gap-3">
              <Mail className="text-blue-400" size={16} />
              <span>{data.personal.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-blue-400" size={16} />
              <span>{data.personal.phone}</span>
            </div>
            {/* Voeg optionele velden toe als ze bestaan */}
            {data.personal.address && (
              <div className="flex items-start gap-3">
                <MapPin className="text-blue-400 mt-1" size={16} />
                <span>{data.personal.address}</span>
              </div>
            )}
            {data.personal.linkedin && (
               <div className="flex items-center gap-3">
                <Linkedin className="text-blue-400" size={16} />
                <span>{data.personal.linkedin}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-sm font-semibold uppercase text-gray-400 tracking-wider">Skills</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {data.skills.map((skill, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="p-10">
        <section>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <User size={24} className="text-blue-600" /> Profiel
          </h2>
          <p className="text-sm text-gray-600 mt-4 leading-relaxed border-l-4 border-gray-200 pl-4">
            {data.profile}
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <Briefcase size={24} className="text-blue-600" /> Werkervaring
          </h2>
          <div className="space-y-8 mt-6">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-semibold text-gray-700">{exp.job}</h3>
                  <p className="text-xs text-gray-500 font-mono">{exp.period}</p>
                </div>
                <p className="text-md text-blue-700 font-medium italic">{exp.company}</p>
                <p className="text-sm text-gray-600 mt-2">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <GraduationCap size={24} className="text-blue-600" /> Opleiding
          </h2>
          <div className="space-y-4 mt-6">
            {data.education.map((edu, i) => (
              <div key={i} className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">{edu.degree}</h3>
                  <p className="text-md text-gray-600">{edu.school}</p>
                </div>
                <span className="text-sm text-gray-500 font-medium">{edu.year}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}