/**
 * "Modern" — the default CVhero template.
 *
 * Full-width ink header band with the name in white, an accent-tinted headline,
 * and a muted-on-dark contact line; then a single-column white body whose
 * section headings are accent-coloured uppercase eyebrows over a hairline rule.
 *
 * Pure presentation over ResumeData. No hooks / no "use client" so it renders
 * identically on the server (thumbnails) and the client (editor preview).
 */
import type { CSSProperties, ReactNode } from "react";
import type { ResumeData } from "@/lib/resume/schema";
import type { TemplateRenderProps } from "@/lib/templates/types";
import { getOrderedSections } from "@/lib/resume/sections";
import {
  contactLine,
  formatRange,
  groupSkills,
  profileLinks,
  proficiencyLabel,
} from "@/lib/templates/format";

// Palette (from the design system).
const TEXT = "#1A1A22";
const BODY = "#3b3a42";
const MUTED = "#6B6A77";
const SUBTLE = "#9A98A2";
const INK = "#15172B";
const HAIRLINE = "#E8E5DD";
const SURFACE_2 = "#F4F2ED";

// On-dark tints for the ink header band.
const ON_DARK_CONTACT = "#9DB6FF";
const ON_DARK_MUTED = "#B8BACB";

export default function ModernTemplate({ data, accent }: TemplateRenderProps) {
  const s = data.settings.fontScale;
  const p = data.personal;
  const contacts = contactLine(data);
  const links = profileLinks(data);
  const sections = getOrderedSections(data);

  const root: CSSProperties = {
    width: 794,
    minHeight: 1123,
    background: "#ffffff",
    color: TEXT,
    boxSizing: "border-box",
    fontFamily: "'Poppins', sans-serif",
    overflow: "hidden",
    position: "relative",
  };

  return (
    <div style={root}>
      {/* ---------- INK HEADER BAND ---------- */}
      <header
        style={{
          background: INK,
          color: "#ffffff",
          padding: "46px 56px 40px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {p.photoUrl ? (
            <img
              src={p.photoUrl}
              alt={p.fullName}
              style={{
                width: 84,
                height: 84,
                borderRadius: "50%",
                objectFit: "cover",
                flex: "none",
                border: `2px solid ${accent}`,
              }}
            />
          ) : null}
          <div style={{ minWidth: 0 }}>
            {p.fullName ? (
              <div
                style={{
                  fontSize: 28 * s,
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                  color: "#ffffff",
                }}
              >
                {p.fullName}
              </div>
            ) : null}
            {p.headline ? (
              <div
                style={{
                  fontSize: 14 * s,
                  fontWeight: 500,
                  color: ON_DARK_CONTACT,
                  marginTop: 6,
                }}
              >
                {p.headline}
              </div>
            ) : null}
          </div>
        </div>

        {(contacts.length > 0 || links.length > 0) && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px 18px",
              marginTop: 18,
              fontSize: 11.5 * s,
              color: ON_DARK_MUTED,
            }}
          >
            {contacts.map((c) => (
              <span key={c}>{c}</span>
            ))}
            {links.map((l) => (
              <span key={l.label} style={{ color: ON_DARK_CONTACT }}>
                {l.value}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* ---------- BODY ---------- */}
      <main style={{ padding: "36px 56px 56px" }}>
        {sections.map((section, idx) => (
          <section
            key={section.token}
            style={{ marginBottom: idx === sections.length - 1 ? 0 : 26 }}
          >
            <SectionHeading title={section.title} accent={accent} s={s} />
            {renderSection(section, data, accent, s)}
          </section>
        ))}
      </main>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section heading: accent uppercase eyebrow + hairline rule.
// ---------------------------------------------------------------------------

function SectionHeading({
  title,
  accent,
  s,
}: {
  title: string;
  accent: string;
  s: number;
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div
        style={{
          fontSize: 11 * s,
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: accent,
        }}
      >
        {title}
      </div>
      <div
        style={{
          height: 1,
          background: HAIRLINE,
          marginTop: 7,
        }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Body renderers per section kind.
// ---------------------------------------------------------------------------

function renderSection(
  section: ReturnType<typeof getOrderedSections>[number],
  data: ResumeData,
  accent: string,
  s: number,
) {
  switch (section.kind) {
    case "summary":
      return <SummaryBlock summary={data.summary} s={s} />;
    case "experience":
      return <ExperienceBlock items={data.experience} accent={accent} s={s} />;
    case "education":
      return <EducationBlock items={data.education} accent={accent} s={s} />;
    case "skills":
      return <SkillsBlock skills={data.skills} s={s} />;
    case "projects":
      return <ProjectsBlock items={data.projects} accent={accent} s={s} />;
    case "certifications":
      return <CertificationsBlock items={data.certifications} s={s} />;
    case "languages":
      return <LanguagesBlock items={data.languages} s={s} />;
    case "custom": {
      const custom = data.customSections.find((c) => c.id === section.customId);
      if (!custom) return null;
      return <CustomBlock entries={custom.entries} accent={accent} s={s} />;
    }
  }
}

// --- shared bits -----------------------------------------------------------

function MetaRow({
  title,
  range,
  s,
}: {
  title: ReactNode;
  range: string;
  s: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: 12,
      }}
    >
      <div style={{ fontSize: 13 * s, fontWeight: 600, color: INK }}>
        {title}
      </div>
      {range ? (
        <div
          style={{
            fontSize: 11 * s,
            color: SUBTLE,
            whiteSpace: "nowrap",
            flex: "none",
          }}
        >
          {range}
        </div>
      ) : null}
    </div>
  );
}

function SubLine({ children, s }: { children: ReactNode; s: number }) {
  return (
    <div style={{ fontSize: 12 * s, color: MUTED, marginTop: 2 }}>
      {children}
    </div>
  );
}

function Bullets({ items, s }: { items: string[]; s: number }) {
  if (items.length === 0) return null;
  return (
    <ul
      style={{
        margin: "7px 0 0",
        paddingLeft: 16,
        listStyleType: "disc",
      }}
    >
      {items.map((h, i) => (
        <li
          key={i}
          style={{
            fontSize: 12 * s,
            lineHeight: 1.55,
            color: BODY,
            marginBottom: 3,
          }}
        >
          {h}
        </li>
      ))}
    </ul>
  );
}

function Prose({ text, s }: { text: string; s: number }) {
  return (
    <p
      style={{
        margin: "6px 0 0",
        fontSize: 12 * s,
        lineHeight: 1.6,
        color: BODY,
      }}
    >
      {text}
    </p>
  );
}

/** Join non-empty parts with a middot separator. */
function joinDot(parts: (string | undefined)[]): string {
  return parts.filter((v) => v && v.trim().length > 0).join(" · ");
}

// --- summary ---------------------------------------------------------------

function SummaryBlock({ summary, s }: { summary: string; s: number }) {
  return (
    <p style={{ margin: 0, fontSize: 12.5 * s, lineHeight: 1.6, color: BODY }}>
      {summary}
    </p>
  );
}

// --- experience ------------------------------------------------------------

function ExperienceBlock({
  items,
  accent,
  s,
}: {
  items: ResumeData["experience"];
  accent: string;
  s: number;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {items.map((item) => {
        const sub = joinDot([item.company, item.location]);
        return (
          <div key={item.id}>
            <MetaRow
              title={item.role}
              range={formatRange(item.startDate, item.endDate, item.current)}
              s={s}
            />
            {sub ? (
              <div
                style={{
                  fontSize: 12 * s,
                  fontWeight: 500,
                  color: accent,
                  marginTop: 2,
                }}
              >
                {sub}
              </div>
            ) : null}
            {item.summary ? <Prose text={item.summary} s={s} /> : null}
            <Bullets items={item.highlights} s={s} />
          </div>
        );
      })}
    </div>
  );
}

// --- education -------------------------------------------------------------

function EducationBlock({
  items,
  accent,
  s,
}: {
  items: ResumeData["education"];
  accent: string;
  s: number;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {items.map((item) => {
        const degree = joinDot([item.degree, item.field]);
        const sub = joinDot([item.institution, item.location]);
        return (
          <div key={item.id}>
            <MetaRow
              title={degree || item.institution}
              range={formatRange(item.startDate, item.endDate, item.current)}
              s={s}
            />
            {degree && sub ? (
              <div
                style={{
                  fontSize: 12 * s,
                  fontWeight: 500,
                  color: accent,
                  marginTop: 2,
                }}
              >
                {sub}
              </div>
            ) : null}
            {item.grade ? <SubLine s={s}>{item.grade}</SubLine> : null}
            {item.description ? <Prose text={item.description} s={s} /> : null}
          </div>
        );
      })}
    </div>
  );
}

// --- skills ----------------------------------------------------------------

function Chip({ label, s }: { label: string; s: number }) {
  return (
    <span
      style={{
        fontSize: 11 * s,
        color: BODY,
        background: SURFACE_2,
        padding: "4px 9px",
        borderRadius: 5,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

function SkillsBlock({
  skills,
  s,
}: {
  skills: ResumeData["skills"];
  s: number;
}) {
  const groups = groupSkills(skills);
  const hasCategories = groups.some((g) => g.category.trim().length > 0);

  if (!hasCategories) {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {skills.map((sk) => (
          <Chip key={sk.id} label={sk.name} s={s} />
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {groups.map((g) => (
        <div
          key={g.category || "_"}
          style={{ display: "flex", gap: 12, alignItems: "baseline" }}
        >
          {g.category ? (
            <div
              style={{
                fontSize: 11.5 * s,
                fontWeight: 600,
                color: MUTED,
                width: 120,
                flex: "none",
              }}
            >
              {g.category}
            </div>
          ) : null}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, flex: 1 }}>
            {g.items.map((sk) => (
              <Chip key={sk.id} label={sk.name} s={s} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// --- projects --------------------------------------------------------------

function ProjectsBlock({
  items,
  accent,
  s,
}: {
  items: ResumeData["projects"];
  accent: string;
  s: number;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {items.map((item) => {
        const sub = joinDot([item.role]);
        return (
          <div key={item.id}>
            <MetaRow
              title={item.name}
              range={formatRange(item.startDate, item.endDate)}
              s={s}
            />
            {sub ? (
              <div
                style={{
                  fontSize: 12 * s,
                  fontWeight: 500,
                  color: accent,
                  marginTop: 2,
                }}
              >
                {sub}
              </div>
            ) : null}
            {item.description ? <Prose text={item.description} s={s} /> : null}
            <Bullets items={item.highlights} s={s} />
            {item.technologies.length > 0 ? (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                  marginTop: 8,
                }}
              >
                {item.technologies.map((t) => (
                  <Chip key={t} label={t} s={s} />
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

// --- certifications --------------------------------------------------------

function CertificationsBlock({
  items,
  s,
}: {
  items: ResumeData["certifications"];
  s: number;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: 12,
          }}
        >
          <div style={{ fontSize: 12.5 * s, color: TEXT }}>
            <span style={{ fontWeight: 600, color: INK }}>{item.name}</span>
            {item.issuer ? (
              <span style={{ color: MUTED }}> · {item.issuer}</span>
            ) : null}
          </div>
          {item.date ? (
            <div
              style={{
                fontSize: 11 * s,
                color: SUBTLE,
                whiteSpace: "nowrap",
                flex: "none",
              }}
            >
              {item.date}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

// --- languages -------------------------------------------------------------

function LanguagesBlock({
  items,
  s,
}: {
  items: ResumeData["languages"];
  s: number;
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 24px" }}>
      {items.map((item) => (
        <div key={item.id} style={{ fontSize: 12 * s }}>
          <span style={{ fontWeight: 600, color: INK }}>{item.name}</span>
          <span style={{ color: MUTED }}>
            {" "}
            · {proficiencyLabel(item.proficiency)}
          </span>
        </div>
      ))}
    </div>
  );
}

// --- custom ----------------------------------------------------------------

function CustomBlock({
  entries,
  accent,
  s,
}: {
  entries: ResumeData["customSections"][number]["entries"];
  accent: string;
  s: number;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {entries.map((entry) => (
        <div key={entry.id}>
          {entry.title || entry.date ? (
            <MetaRow title={entry.title} range={entry.date} s={s} />
          ) : null}
          {entry.subtitle ? (
            <div
              style={{
                fontSize: 12 * s,
                fontWeight: 500,
                color: accent,
                marginTop: 2,
              }}
            >
              {entry.subtitle}
            </div>
          ) : null}
          {entry.description ? <Prose text={entry.description} s={s} /> : null}
          <Bullets items={entry.bullets} s={s} />
        </div>
      ))}
    </div>
  );
}

export { ModernTemplate };
