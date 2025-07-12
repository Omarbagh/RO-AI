import { CVTemplateProps } from '@/types/cv';
import { Briefcase, GraduationCap, User, Calendar } from 'lucide-react';

export default function CreativeTemplate({ data }: CVTemplateProps) {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden font-serif">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-indigo-50 to-white p-8 md:space-x-6 border-b border-indigo-200">
        {/* Foto */}
        {data.personal.photoUrl && (
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-indigo-300">
            <img
              src={data.personal.photoUrl}
              alt="Profielfoto"
              className="object-cover w-full h-full"
            />
          </div>
        )}
        {/* Naam & Titel */}
        <div className="mt-4 md:mt-0 text-center md:text-left space-y-1">
          <h1 className="text-4xl font-bold text-indigo-700 tracking-tight">
            {data.personal.name}
          </h1>
          <p className="text-md italic text-gray-600">{data.personal.title}</p>
          <p className="text-sm text-gray-500 mt-1">
            <User size={16} className="inline-block mr-1 text-indigo-600" />
            {data.personal.email} • <Calendar size={16} className="inline-block mx-1 text-indigo-600" />{data.personal.phone}
          </p>
        </div>
      </div>

      <div className="p-8 space-y-10 bg-gray-50">
        {/* Profiel */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-indigo-600">
            <User size={20} />
            <h2 className="text-xl font-semibold uppercase">Profiel</h2>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{data.profile}</p>
        </section>

        {/* Werkervaring */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-indigo-600">
            <Briefcase size={20} />
            <h2 className="text-xl font-semibold uppercase">Werkervaring</h2>
          </div>
          <div className="space-y-6">
            {data.experience.map((exp, i) => (
              <div key={i} className="flex flex-col md:flex-row md:justify-between md:items-start">
                <div className="md:w-2/3">
                  <h3 className="text-lg font-semibold text-gray-900">{exp.job}</h3>
                  <p className="text-sm text-indigo-600 font-medium">{exp.company}</p>
                </div>
                <p className="md:w-1/3 mt-2 md:mt-0 text-sm text-gray-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Opleiding */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-indigo-600">
            <GraduationCap size={20} />
            <h2 className="text-xl font-semibold uppercase">Opleiding</h2>
          </div>
          <div className="space-y-4">
            {data.education.map((edu, i) => (
              <div key={i} className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold text-gray-900">{edu.degree}</p>
                  <p className="text-sm text-gray-600">{edu.school}</p>
                </div>
                <span className="text-sm text-indigo-600">{edu.year}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold uppercase text-indigo-600">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span
                key={i}
                className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
