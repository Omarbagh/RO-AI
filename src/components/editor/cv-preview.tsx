import type { CvData } from "@/components/editor/sample-cv";

// Static "paper" preview of the CV with sample data.
// TODO: replace with the real template render engine driven by the CV data model.
export function CvPreview({ cv }: { cv: CvData }) {
  return (
    <div className="w-[520px] max-w-full flex-none overflow-hidden rounded-[3px] bg-white shadow-[0_12px_40px_-12px_rgba(20,20,30,.25)]">
      {/* Header band */}
      <div className="bg-ink px-10 pb-7 pt-[34px] text-white">
        <div className="text-[30px] font-semibold tracking-[-0.01em]">
          {cv.fullName}
        </div>
        <div className="mt-1 text-sm font-medium text-[#9DB6FF]">
          {cv.headline}
        </div>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[11.5px] text-[#B8BACB]">
          <span>{cv.contact.email}</span>
          <span>{cv.contact.phone}</span>
          <span>{cv.contact.location}</span>
          <span>{cv.contact.linkedin}</span>
        </div>
      </div>

      {/* Body */}
      <div className="px-10 pb-10 pt-7 text-text-body">
        {/* Profiel */}
        <section className="mb-[22px]">
          <h3 className="mb-[9px] text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
            Profiel
          </h3>
          <p className="text-[12.5px] leading-relaxed">{cv.summary}</p>
        </section>

        {/* Werkervaring */}
        <section className="mb-[22px]">
          <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
            Werkervaring
          </h3>
          {cv.experience.map((exp) => (
            <div key={exp.id} className="mb-4 last:mb-0">
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] font-semibold text-ink">
                  {exp.role}
                </span>
                <span className="text-[11px] text-subtle">{exp.period}</span>
              </div>
              <div className="mb-1.5 text-xs font-medium text-primary">
                {exp.company}
              </div>
              {exp.bullets.map((bullet, i) => (
                <p
                  key={i}
                  className="text-xs leading-[1.55] text-[#4b4a52]"
                >
                  {bullet}
                </p>
              ))}
            </div>
          ))}
        </section>

        {/* Opleiding */}
        <section className="mb-[22px]">
          <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
            Opleiding
          </h3>
          {cv.education.map((edu) => (
            <div key={edu.id} className="mb-2 last:mb-0">
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] font-semibold text-ink">
                  {edu.degree}
                </span>
                <span className="text-[11px] text-subtle">{edu.period}</span>
              </div>
              <div className="text-xs font-medium text-primary">
                {edu.school}
              </div>
            </div>
          ))}
        </section>

        {/* Vaardigheden */}
        <section>
          <h3 className="mb-[10px] text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
            Vaardigheden
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {cv.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-[5px] bg-surface-2 px-[9px] py-1 text-[11px] text-text-body"
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
