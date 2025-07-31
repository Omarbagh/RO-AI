import { CVTemplateProps } from '@/types/cv';
import { Mail, Phone } from 'lucide-react';

export function SidebarDarkTemplate({ data }: CVTemplateProps) {
  const accent = data.settings?.accent || "#1E40AF";

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-4 h-full" style={{ '--accent': accent } as React.CSSProperties}>
      <aside
        className="col-span-1 text-white p-8 flex flex-col justify-between"
        style={{ backgroundColor: 'var(--accent)' }}
      >
        <div>
          {data.personal.photoUrl && (
            <img
              src={data.personal.photoUrl}
              alt=""
              className="w-24 h-24 rounded-full mb-4 border-4"
              style={{ borderColor: '#fff' }}
            />
          )}
          <h1 className="text-2xl font-bold">{data.personal.name}</h1>
          <p className="italic mt-1" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {data.personal.title}
          </p>
        </div>
        <div className="space-y-4 text-sm">
          <p className="flex items-center gap-2">
            <Mail size={16} style={{ color: '#fff' }} /> {data.personal.email}
          </p>
          <p className="flex items-center gap-2">
            <Phone size={16} style={{ color: '#fff' }} /> {data.personal.phone}
          </p>
        </div>
      </aside>
      <main className="col-span-3 p-8 space-y-8 bg-white">
        <section>
          <h2
            className="text-xl font-semibold border-b pb-1"
            style={{
              color: 'var(--accent)',
              borderColor: 'var(--accent)',
            }}
          >
            Profile
          </h2>
          <p className="mt-2 text-sm text-gray-800">{data.profile}</p>
        </section>
        <section>
          <h2
            className="text-xl font-semibold border-b pb-1"
            style={{
              color: 'var(--accent)',
              borderColor: 'var(--accent)',
            }}
          >
            Work Experience
          </h2>
          {data.experience.map((e, i) => (
            <div key={i} className="mt-4">
              <p className="font-medium">
                {e.job} <span style={{ color: 'var(--accent)' }}>@ {e.company}</span>{' '}
                <span className="text-xs" style={{ color: 'var(--accent)' }}>{e.year}</span>
              </p>
              <p className="text-sm text-gray-700 mt-1">
                {e.description}
              </p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
