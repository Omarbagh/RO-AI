/**
 * Executive — a refined, senior two-column-header CV template (Pro).
 *
 * Look: name large on the left, contact stacked on the right, an accent divider
 * under the header, small-caps accent section headings with generous spacing,
 * and emphasized job titles / companies. Plenty of breathing room.
 *
 * Plain server-renderable component (no hooks, no "use client"). Inline styles
 * with px units so it is self-contained on a fixed print canvas.
 */
import type { TemplateRenderProps } from "@/lib/templates/types";
import {
  getOrderedSections,
  type ResolvedSection,
} from "@/lib/resume/sections";
import {
  contactLine,
  formatRange,
  groupSkills,
  proficiencyLabel,
  profileLinks,
} from "@/lib/templates/format";
import type {
  CustomSection,
  ResumeData,
} from "@/lib/resume/schema";

// Palette ------------------------------------------------------------------
const TEXT = "#1A1A22";
const BODY = "#3b3a42";
const MUTED = "#6B6A77";
const SUBTLE = "#9A98A2";
const HAIRLINE = "#E8E5DD";
const SURFACE_2 = "#F4F2ED";

export default function ExecutiveTemplate({
  data,
  accent,
}: TemplateRenderProps): React.ReactElement {
  const s = data.settings.fontScale;
  const sections = getOrderedSections(data);
  const contacts = contactLine(data);
  const links = profileLinks(data);
  const { personal } = data;

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
        padding: "64px 64px 72px",
        lineHeight: 1.5,
      }}
    >
      {/* Header ---------------------------------------------------------- */}
      <header
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 32,
        }}
      >
        {/* Left: name + headline (with optional avatar) */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, minWidth: 0 }}>
          {personal.photoUrl ? (
            <img
              src={personal.photoUrl}
              alt={personal.fullName}
              style={{
                width: 76,
                height: 76,
                borderRadius: "50%",
                objectFit: "cover",
                flexShrink: 0,
                border: `1px solid ${HAIRLINE}`,
              }}
            />
          ) : null}
          <div style={{ minWidth: 0 }}>
            <h1
              style={{
                margin: 0,
                fontSize: 32 * s,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.08,
                color: TEXT,
              }}
            >
              {personal.fullName}
            </h1>
            {personal.headline ? (
              <p
                style={{
                  margin: "8px 0 0",
                  fontSize: 13 * s,
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                  color: accent,
                }}
              >
                {personal.headline}
              </p>
            ) : null}
          </div>
        </div>

        {/* Right: contact stacked */}
        {contacts.length > 0 || links.length > 0 ? (
          <div
            style={{
              flexShrink: 0,
              textAlign: "right",
              fontSize: 9.5 * s,
              color: MUTED,
              lineHeight: 1.7,
              maxWidth: 240,
            }}
          >
            {contacts.map((c) => (
              <div key={c}>{c}</div>
            ))}
            {links.map((l) => (
              <div key={l.label} style={{ color: accent }}>
                {l.value}
              </div>
            ))}
          </div>
        ) : null}
      </header>

      {/* Accent divider under header */}
      <div
        style={{
          marginTop: 24,
          height: 2,
          background: accent,
          width: "100%",
        }}
      />

      {/* Body ------------------------------------------------------------ */}
      <main style={{ marginTop: 36 }}>
        {sections.map((section, i) => (
          <Section
            key={section.token}
            section={section}
            data={data}
            accent={accent}
            s={s}
            first={i === 0}
          />
        ))}
      </main>
    </div>
  );
}

// Section dispatcher -------------------------------------------------------
function Section({
  section,
  data,
  accent,
  s,
  first,
}: {
  section: ResolvedSection;
  data: ResumeData;
  accent: string;
  s: number;
  first: boolean;
}): React.ReactElement {
  return (
    <section style={{ marginTop: first ? 0 : 32 }}>
      <Heading title={section.title} accent={accent} s={s} />
      <SectionBody section={section} data={data} accent={accent} s={s} />
    </section>
  );
}

function SectionBody({
  section,
  data,
  accent,
  s,
}: {
  section: ResolvedSection;
  data: ResumeData;
  accent: string;
  s: number;
}): React.ReactElement | null {
  switch (section.kind) {
    case "summary":
      return (
        <p
          style={{
            margin: 0,
            fontSize: 10.5 * s,
            color: BODY,
            lineHeight: 1.65,
          }}
        >
          {data.summary}
        </p>
      );

    case "experience":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {data.experience.map((item) => {
            const range = formatRange(item.startDate, item.endDate, item.current);
            return (
              <div key={item.id}>
                <EntryHead
                  primary={item.role}
                  secondary={joinDot([item.company, item.location])}
                  range={range}
                  accent={accent}
                  s={s}
                />
                {item.summary ? (
                  <p
                    style={{
                      margin: "6px 0 0",
                      fontSize: 10 * s,
                      color: BODY,
                      lineHeight: 1.6,
                    }}
                  >
                    {item.summary}
                  </p>
                ) : null}
                <Bullets items={item.highlights} accent={accent} s={s} />
              </div>
            );
          })}
        </div>
      );

    case "education":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {data.education.map((item) => {
            const degree = joinSpace([
              item.degree,
              item.field ? `· ${item.field}` : "",
            ]);
            const range = formatRange(item.startDate, item.endDate, item.current);
            return (
              <div key={item.id}>
                <EntryHead
                  primary={degree}
                  secondary={joinDot([item.institution, item.location])}
                  range={range}
                  accent={accent}
                  s={s}
                />
                {item.grade ? (
                  <p
                    style={{
                      margin: "4px 0 0",
                      fontSize: 9.5 * s,
                      color: MUTED,
                    }}
                  >
                    {item.grade}
                  </p>
                ) : null}
                {item.description ? (
                  <p
                    style={{
                      margin: "6px 0 0",
                      fontSize: 10 * s,
                      color: BODY,
                      lineHeight: 1.6,
                    }}
                  >
                    {item.description}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      );

    case "skills":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {groupSkills(data.skills).map((group, gi) => (
            <div
              key={group.category || `group-${gi}`}
              style={{ display: "flex", gap: 14, alignItems: "baseline" }}
            >
              {group.category ? (
                <div
                  style={{
                    flexShrink: 0,
                    width: 130,
                    fontSize: 9.5 * s,
                    fontWeight: 600,
                    color: TEXT,
                    lineHeight: 1.5,
                  }}
                >
                  {group.category}
                </div>
              ) : null}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 7,
                  flex: 1,
                  minWidth: 0,
                }}
              >
                {group.items.map((skill) => (
                  <span
                    key={skill.id}
                    style={{
                      fontSize: 9.5 * s,
                      color: BODY,
                      background: SURFACE_2,
                      border: `1px solid ${HAIRLINE}`,
                      borderRadius: 3,
                      padding: "3px 9px",
                      lineHeight: 1.4,
                    }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );

    case "projects":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {data.projects.map((item) => {
            const range = formatRange(item.startDate, item.endDate);
            return (
              <div key={item.id}>
                <EntryHead
                  primary={item.name}
                  secondary={item.role}
                  range={range}
                  accent={accent}
                  s={s}
                />
                {item.description ? (
                  <p
                    style={{
                      margin: "6px 0 0",
                      fontSize: 10 * s,
                      color: BODY,
                      lineHeight: 1.6,
                    }}
                  >
                    {item.description}
                  </p>
                ) : null}
                <Bullets items={item.highlights} accent={accent} s={s} />
                {item.technologies.length > 0 ? (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                      marginTop: 8,
                    }}
                  >
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontSize: 8.5 * s,
                          color: MUTED,
                          border: `1px solid ${HAIRLINE}`,
                          borderRadius: 3,
                          padding: "2px 7px",
                          lineHeight: 1.4,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      );

    case "certifications":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {data.certifications.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: 16,
              }}
            >
              <div style={{ minWidth: 0 }}>
                <span
                  style={{ fontSize: 10.5 * s, fontWeight: 600, color: TEXT }}
                >
                  {item.name}
                </span>
                {item.issuer ? (
                  <span style={{ fontSize: 10 * s, color: MUTED }}>
                    {`  ·  ${item.issuer}`}
                  </span>
                ) : null}
              </div>
              {item.date ? (
                <span
                  style={{
                    flexShrink: 0,
                    fontSize: 9.5 * s,
                    color: SUBTLE,
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.date}
                </span>
              ) : null}
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
            columnGap: 36,
            rowGap: 10,
          }}
        >
          {data.languages.map((item) => (
            <div
              key={item.id}
              style={{ display: "flex", alignItems: "baseline", gap: 8 }}
            >
              <span style={{ fontSize: 10.5 * s, fontWeight: 600, color: TEXT }}>
                {item.name}
              </span>
              <span style={{ fontSize: 9.5 * s, color: MUTED }}>
                {proficiencyLabel(item.proficiency)}
              </span>
            </div>
          ))}
        </div>
      );

    case "custom":
      return (
        <CustomBody
          custom={data.customSections.find((c) => c.id === section.customId)}
          accent={accent}
          s={s}
        />
      );

    default:
      return null;
  }
}

// Custom section body ------------------------------------------------------
function CustomBody({
  custom,
  accent,
  s,
}: {
  custom: CustomSection | undefined;
  accent: string;
  s: number;
}): React.ReactElement | null {
  if (!custom) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {custom.entries.map((entry) => (
        <div key={entry.id}>
          <EntryHead
            primary={entry.title}
            secondary={entry.subtitle}
            range={entry.date}
            accent={accent}
            s={s}
          />
          {entry.description ? (
            <p
              style={{
                margin: "6px 0 0",
                fontSize: 10 * s,
                color: BODY,
                lineHeight: 1.6,
              }}
            >
              {entry.description}
            </p>
          ) : null}
          <Bullets items={entry.bullets} accent={accent} s={s} />
        </div>
      ))}
    </div>
  );
}

// Shared bits --------------------------------------------------------------
function Heading({
  title,
  accent,
  s,
}: {
  title: string;
  accent: string;
  s: number;
}): React.ReactElement {
  return (
    <h2
      style={{
        margin: "0 0 16px",
        fontSize: 11 * s,
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: accent,
      }}
    >
      {title}
    </h2>
  );
}

/**
 * One entry header: emphasized primary (job title), a secondary line
 * (company · location), and a right-aligned date range.
 */
function EntryHead({
  primary,
  secondary,
  range,
  accent,
  s,
}: {
  primary: string;
  secondary: string;
  range: string;
  accent: string;
  s: number;
}): React.ReactElement {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 16,
        }}
      >
        <span
          style={{
            fontSize: 12 * s,
            fontWeight: 600,
            color: TEXT,
            letterSpacing: "-0.005em",
          }}
        >
          {primary}
        </span>
        {range ? (
          <span
            style={{
              flexShrink: 0,
              fontSize: 9.5 * s,
              color: SUBTLE,
              whiteSpace: "nowrap",
            }}
          >
            {range}
          </span>
        ) : null}
      </div>
      {secondary ? (
        <div
          style={{
            marginTop: 2,
            fontSize: 10.5 * s,
            fontWeight: 600,
            color: accent,
          }}
        >
          {secondary}
        </div>
      ) : null}
    </div>
  );
}

function Bullets({
  items,
  accent,
  s,
}: {
  items: string[];
  accent: string;
  s: number;
}): React.ReactElement | null {
  if (items.length === 0) return null;
  return (
    <ul
      style={{
        margin: "8px 0 0",
        padding: 0,
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        gap: 5,
      }}
    >
      {items.map((bullet, i) => (
        <li
          key={i}
          style={{
            display: "flex",
            gap: 10,
            fontSize: 10 * s,
            color: BODY,
            lineHeight: 1.55,
          }}
        >
          <span
            style={{
              flexShrink: 0,
              marginTop: 7 * s,
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: accent,
            }}
          />
          <span style={{ minWidth: 0 }}>{bullet}</span>
        </li>
      ))}
    </ul>
  );
}

// Text join helpers --------------------------------------------------------
function joinDot(parts: string[]): string {
  return parts.filter((p) => p && p.trim().length > 0).join("  ·  ");
}

function joinSpace(parts: string[]): string {
  return parts.filter((p) => p && p.trim().length > 0).join(" ");
}

// Template metadata --------------------------------------------------------
export const meta = {
  id: "executive",
  name: "Executive",
  category: "executive" as const,
  isPro: true,
  description:
    "Refined and senior. A two-part header with a large name, stacked contact details, an accent divider, and small-caps section headings.",
  defaultAccent: "#15172B",
};

export { ExecutiveTemplate };
