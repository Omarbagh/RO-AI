import { CVTemplateProps } from "@/types/cv";

export function InfluencerTemplate({ data }: CVTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 p-8 text-white text-center">
          {data.personal.photoUrl && (
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white mb-6">
              <img
                src={data.personal.photoUrl}
                alt={data.personal.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <h1 className="text-4xl font-bold mb-2">{data.personal.name}</h1>
          <p className="text-xl text-pink-100">{data.personal.title}</p>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <span>{data.personal.email}</span>
            <span>{data.personal.phone}</span>
          </div>
        </div>
        <div className="p-8">
          <section className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">
              About Me
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.profile}</p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-purple-600 mb-6">
              Brand Collaborations
            </h2>
            <div className="grid gap-4">
              {data.experience.map((exp, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6"
                >
                  <h3 className="font-bold text-gray-800">{exp.job}</h3>
                  <p className="text-purple-600">{exp.company}</p>
                  <p className="text-gray-700 text-sm mt-2">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
