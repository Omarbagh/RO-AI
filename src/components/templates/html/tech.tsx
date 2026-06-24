/**
 * Template "Tech" (Pro) — compact, dense, engineer-friendly.
 *
 * Design language:
 *  - Header with name + headline + contact, plus a top SKILLS strip rendered
 *    as prominent rounded chips (surface-2 background, accent text).
 *  - Uppercase, letter-tracked Poppins labels as "mono"-style section headers,
 *    each preceded by a small accent square marker.
 *  - Projects + their technologies are prominent (accent tech chips).
 *  - High information density, smaller line-height, accent for links + keyword
 *    chips.
 *
 * Plain component (no hooks, no "use client") so it renders identically on the
 * server (thumbnails) and the client (editor preview). All styling is inline
 * with px units for a portable, fixed print canvas.
 */
import type { TemplateRenderProps } from "@/lib/templates/types";
import type { ResumeData } from "@/lib/resume/schema";
import { getOrderedSections } from "@/lib/resume/sections";
import {
  contactLine,
  formatRange,
  groupSkills,
  profileLinks,
  proficiencyLabel,
} from "@/lib/templates/format";

// ---------------------------------------------------------------------------
// Palette
// ---------------------------------------------------------------------------

const TEXT = "#1A1A22";
const BODY = "#3b3a42";
const MUTED = "#6B6A77";
const SUBTLE = "#9A98A2";
const HAIRLINE = "#E8E5DD";
const HAIRLINE_SOFT = "#F0EEE9";
const SURFACE_2 = "#F4F2ED";

export default function TechTemplate({ data, accent }: TemplateRenderProps) {
  const s = data.settings.fontScale;
  const sections = getOrderedSections(data);
  const personal = data.personal;

  const contacts = contactLine(data);
  const links = profileLinks(data);

  return (
    <div
      style={{
        width: 794,
        minHeight: 1123,
        background: "#ffffff",
        color: TEXT,
        boxSizing: "border-box",
        fontFamily: "'Poppins', sans-serif",
        overflow: "hidden",
        position: "relative",
        padding: "40px 48px 48px",
        lineHeight: 1.35,
      }}
    >
      {/* ---------------------------------------------------------------- */}
      {/* Header */}
      {/* ---------------------------------------------------------------- */}
      <header
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 18,
          paddingBottom: 14,
          borderBottom: `2px solid ${accent}`,
        }}
      >
        {personal.photoUrl ? (
          <img
            src={personal.photoUrl}
            alt={personal.fullName}
            style={{
              width: 62,
              height: 62,
              borderRadius: 10,
              objectFit: "cover",
              flexShrink: 0,
              border: `1px solid ${HAIRLINE}`,
            }}
          />
        ) : null}

        <div style={{ flex: 1, minWidth: 0 }}>
          <h1
            style={{
              margin: 0,
              fontSize: 27 * s,
              fontWeight: 700,
              letterSpacing: -0.4,
              lineHeight: 1.1,
              color: TEXT,
            }}
          >
            {personal.fullName}
          </h1>
          {personal.headline ? (
            <p
              style={{
                margin: "3px 0 0",
                fontSize: 12 * s,
                fontWeight: 500,
                color: accent,
                letterSpacing: 0.2,
              }}
            >
              {personal.headline}
            </p>
          ) : null}

          {/* Contact + links on one dense, wrapping row */}
          {contacts.length > 0 || links.length > 0 ? (
            <div
              style={{
                marginTop: 9,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "4px 10px",
                fontSize: 9.5 * s,
                color: MUTED,
              }}
            >
              {contacts.map((c, i) => (
                <span key={`c-${i}`} style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                  <span>{c}</span>
                  {i < contacts.length - 1 || links.length > 0 ? (
                    <span style={{ color: HAIRLINE, fontWeight: 700 }}>/</span>
                  ) : null}
                </span>
              ))}
              {links.map((l, i) => (
                <span key={`l-${i}`} style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                  <span style={{ color: accent, fontWeight: 500 }}>{l.value}</span>
                  {i < links.length - 1 ? (
                    <span style={{ color: HAIRLINE, fontWeight: 700 }}>/</span>
                  ) : null}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </header>

      {/* ---------------------------------------------------------------- */}
      {/* Top SKILLS strip — prominent accent chips */}
      {/* ---------------------------------------------------------------- */}
      {data.skills.length > 0 ? (
        <div style={{ marginTop: 14 }}>
          <SectionLabel accent={accent} scale={s}>
            Stack
          </SectionLabel>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              marginTop: 8,
            }}
          >
            {data.skills.map((skill) => (
              <span key={skill.id} style={chipStyle(accent, s)}>
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {/* ---------------------------------------------------------------- */}
      {/* Body sections (ordered + visibility resolved upstream) */}
      {/* ---------------------------------------------------------------- */}
      <main style={{ marginTop: 18 }}>
        {sections.map((section) => {
          if (section.kind === "skills") return null; // already shown as top strip
          return (
            <section
              key={section.token}
              style={{ marginBottom: 18, breakInside: "avoid" }}
            >
              <SectionLabel accent={accent} scale={s}>
                {section.title}
              </SectionLabel>
              <div style={{ marginTop: 9 }}>
                {renderSection(section, data, accent, s)}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section dispatch
// ---------------------------------------------------------------------------

function renderSection(
  section: ReturnType<typeof getOrderedSections>[number],
  data: ResumeData,
  accent: string,
  s: number,
) {
  switch (section.kind) {
    case "summary":
      return (
        <p
          style={{
            margin: 0,
            fontSize: 10 * s,
            color: BODY,
            lineHeight: 1.45,
          }}
        >
          {data.summary}
        </p>
      );

    case "experience":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {data.experience.map((item) => (
            <article key={item.id} style={{ breakInside: "avoid" }}>
              <RowHead
                left={
                  <>
                    <span style={{ fontWeight: 600, color: TEXT }}>
                      {item.role}
                    </span>
                    {item.company ? (
                      <>
                        <Dot />
                        <span style={{ color: BODY }}>{item.company}</span>
                      </>
                    ) : null}
                    {item.location ? (
                      <>
                        <Dot />
                        <span style={{ color: MUTED }}>{item.location}</span>
                      </>
                    ) : null}
                  </>
                }
                right={formatRange(item.startDate, item.endDate, item.current)}
                accent={accent}
                scale={s}
              />
              {item.summary ? (
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: 9.5 * s,
                    color: BODY,
                    lineHeight: 1.45,
                  }}
                >
                  {item.summary}
                </p>
              ) : null}
              {item.highlights.length > 0 ? (
                <Bullets items={item.highlights} accent={accent} scale={s} />
              ) : null}
            </article>
          ))}
        </div>
      );

    case "education":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {data.education.map((item) => {
            const degree = [item.degree, item.field]
              .filter((v) => v && v.trim().length > 0)
              .join(", ");
            return (
              <article key={item.id} style={{ breakInside: "avoid" }}>
                <RowHead
                  left={
                    <>
                      <span style={{ fontWeight: 600, color: TEXT }}>
                        {degree || item.institution}
                      </span>
                      {degree && item.institution ? (
                        <>
                          <Dot />
                          <span style={{ color: BODY }}>{item.institution}</span>
                        </>
                      ) : null}
                      {item.location ? (
                        <>
                          <Dot />
                          <span style={{ color: MUTED }}>{item.location}</span>
                        </>
                      ) : null}
                    </>
                  }
                  right={formatRange(item.startDate, item.endDate, item.current)}
                  accent={accent}
                  scale={s}
                />
                {item.grade ? (
                  <p
                    style={{
                      margin: "3px 0 0",
                      fontSize: 9 * s,
                      color: MUTED,
                    }}
                  >
                    {item.grade}
                  </p>
                ) : null}
                {item.description ? (
                  <p
                    style={{
                      margin: "3px 0 0",
                      fontSize: 9.5 * s,
                      color: BODY,
                      lineHeight: 1.45,
                    }}
                  >
                    {item.description}
                  </p>
                ) : null}
              </article>
            );
          })}
        </div>
      );

    case "projects":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {data.projects.map((item) => (
            <article
              key={item.id}
              style={{
                breakInside: "avoid",
                borderLeft: `2px solid ${accent}`,
                paddingLeft: 10,
              }}
            >
              <RowHead
                left={
                  <>
                    <span style={{ fontWeight: 600, color: TEXT }}>
                      {item.name}
                    </span>
                    {item.role ? (
                      <>
                        <Dot />
                        <span style={{ color: accent }}>{item.role}</span>
                      </>
                    ) : null}
                  </>
                }
                right={formatRange(item.startDate, item.endDate)}
                accent={accent}
                scale={s}
              />
              {item.description ? (
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: 9.5 * s,
                    color: BODY,
                    lineHeight: 1.45,
                  }}
                >
                  {item.description}
                </p>
              ) : null}
              {item.highlights.length > 0 ? (
                <Bullets items={item.highlights} accent={accent} scale={s} />
              ) : null}
              {item.technologies.length > 0 ? (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 5,
                    marginTop: 6,
                  }}
                >
                  {item.technologies.map((tech, i) => (
                    <span key={i} style={techChipStyle(accent, s)}>
                      {tech}
                    </span>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      );

    case "certifications":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {data.certifications.map((item) => (
            <div key={item.id} style={{ breakInside: "avoid" }}>
              <RowHead
                left={
                  <>
                    <span style={{ fontWeight: 600, color: TEXT }}>
                      {item.name}
                    </span>
                    {item.issuer ? (
                      <>
                        <Dot />
                        <span style={{ color: BODY }}>{item.issuer}</span>
                      </>
                    ) : null}
                  </>
                }
                right={item.date}
                accent={accent}
                scale={s}
              />
            </div>
          ))}
        </div>
      );

    case "languages":
      return (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px 18px",
          }}
        >
          {data.languages.map((item) => (
            <span
              key={item.id}
              style={{
                fontSize: 9.5 * s,
                color: BODY,
                display: "inline-flex",
                alignItems: "baseline",
                gap: 6,
              }}
            >
              <span style={{ fontWeight: 600, color: TEXT }}>{item.name}</span>
              <span style={{ color: MUTED }}>
                {proficiencyLabel(item.proficiency)}
              </span>
            </span>
          ))}
        </div>
      );

    case "skills": {
      // Not reached in normal flow (rendered as the top strip), but kept for
      // completeness so every kind is handled. Renders grouped lines.
      const groups = groupSkills(data.skills);
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {groups.map((g, i) => (
            <div key={i}>
              {g.category ? (
                <div
                  style={{
                    fontSize: 8.5 * s,
                    fontWeight: 600,
                    color: MUTED,
                    textTransform: "uppercase",
                    letterSpacing: 0.6,
                    marginBottom: 4,
                  }}
                >
                  {g.category}
                </div>
              ) : null}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {g.items.map((skill) => (
                  <span key={skill.id} style={chipStyle(accent, s)}>
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    case "custom": {
      const custom = data.customSections.find((c) => c.id === section.customId);
      if (!custom) return null;
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {custom.entries.map((entry) => (
            <article key={entry.id} style={{ breakInside: "avoid" }}>
              {entry.title || entry.subtitle || entry.date ? (
                <RowHead
                  left={
                    <>
                      {entry.title ? (
                        <span style={{ fontWeight: 600, color: TEXT }}>
                          {entry.title}
                        </span>
                      ) : null}
                      {entry.subtitle ? (
                        <>
                          {entry.title ? <Dot /> : null}
                          <span style={{ color: BODY }}>{entry.subtitle}</span>
                        </>
                      ) : null}
                    </>
                  }
                  right={entry.date}
                  accent={accent}
                  scale={s}
                />
              ) : null}
              {entry.description ? (
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: 9.5 * s,
                    color: BODY,
                    lineHeight: 1.45,
                  }}
                >
                  {entry.description}
                </p>
              ) : null}
              {entry.bullets.length > 0 ? (
                <Bullets items={entry.bullets} accent={accent} scale={s} />
              ) : null}
            </article>
          ))}
        </div>
      );
    }

    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// Small presentational primitives
// ---------------------------------------------------------------------------

/** Uppercase, tracked "mono"-style section header with an accent square. */
function SectionLabel({
  children,
  accent,
  scale,
}: {
  children: React.ReactNode;
  accent: string;
  scale: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7,
        borderBottom: `1px solid ${HAIRLINE}`,
        paddingBottom: 4,
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          background: accent,
          flexShrink: 0,
          borderRadius: 1,
        }}
      />
      <h2
        style={{
          margin: 0,
          fontSize: 9.5 * scale,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: 1.6,
          color: TEXT,
        }}
      >
        {children}
      </h2>
    </div>
  );
}

/** A left title cluster + right-aligned date meta on one dense line. */
function RowHead({
  left,
  right,
  accent,
  scale,
}: {
  left: React.ReactNode;
  right: string;
  accent: string;
  scale: number;
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
      <div
        style={{
          fontSize: 10.5 * scale,
          display: "flex",
          alignItems: "baseline",
          flexWrap: "wrap",
          gap: "0 2px",
          minWidth: 0,
        }}
      >
        {left}
      </div>
      {right ? (
        <span
          style={{
            fontSize: 8.5 * scale,
            fontWeight: 600,
            color: accent,
            whiteSpace: "nowrap",
            letterSpacing: 0.3,
            flexShrink: 0,
          }}
        >
          {right}
        </span>
      ) : null}
    </div>
  );
}

function Dot() {
  return (
    <span style={{ color: SUBTLE, margin: "0 5px", fontWeight: 400 }}>·</span>
  );
}

function Bullets({
  items,
  accent,
  scale,
}: {
  items: string[];
  accent: string;
  scale: number;
}) {
  return (
    <ul
      style={{
        margin: "5px 0 0",
        padding: 0,
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {items.map((h, i) => (
        <li
          key={i}
          style={{
            position: "relative",
            paddingLeft: 13,
            fontSize: 9.5 * scale,
            color: BODY,
            lineHeight: 1.4,
          }}
        >
          <span
            style={{
              position: "absolute",
              left: 0,
              top: 5 * scale,
              width: 4,
              height: 4,
              borderRadius: 1,
              background: accent,
            }}
          />
          {h}
        </li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// Chip styles
// ---------------------------------------------------------------------------

/** Prominent rounded skill chip: surface-2 background, accent text. */
function chipStyle(accent: string, scale: number): React.CSSProperties {
  return {
    display: "inline-block",
    padding: "3px 9px",
    background: SURFACE_2,
    color: accent,
    fontSize: 9 * scale,
    fontWeight: 500,
    borderRadius: 5,
    border: `1px solid ${HAIRLINE_SOFT}`,
    letterSpacing: 0.2,
    lineHeight: 1.3,
  };
}

/** Small tech chip for projects — accent-tinted outline. */
function techChipStyle(accent: string, scale: number): React.CSSProperties {
  return {
    display: "inline-block",
    padding: "1.5px 7px",
    background: "#ffffff",
    color: accent,
    fontSize: 8 * scale,
    fontWeight: 500,
    borderRadius: 4,
    border: `1px solid ${accent}`,
    letterSpacing: 0.2,
    lineHeight: 1.3,
  };
}
