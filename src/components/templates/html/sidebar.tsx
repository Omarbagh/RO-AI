/**
 * "Sidebar" template (Pro). Two-column layout: a full-height dark left rail
 * (#15172B, ~36%) carrying the identity + "lighter" sections (skills,
 * languages, certifications), and a white main column (~64%) with the
 * narrative-heavy sections (summary, experience, education, projects).
 *
 * Both columns are driven from getOrderedSections(data) so editor reordering,
 * hide/show and custom sections keep working — we simply partition the resolved
 * list by kind: skills/languages/certifications -> sidebar, the rest -> main.
 */
import type { ReactNode } from "react";
import type { TemplateRenderProps } from "@/lib/templates/types";
import {
  getOrderedSections,
  type ResolvedSection,
} from "@/lib/resume/sections";
import {
  contactLine,
  formatRange,
  groupSkills,
  initials,
  proficiencyLabel,
  profileLinks,
} from "@/lib/templates/format";

// Palette (shared design tokens).
const TEXT = "#1A1A22";
const BODY = "#3b3a42";
const MUTED = "#6B6A77";
const INK = "#15172B";
const HAIR = "#E8E5DD";
const SURFACE2 = "#F4F2ED";

// Sidebar text tones over the dark rail.
const ON_DARK = "#ffffff";
const ON_DARK_SOFT = "rgba(255,255,255,0.74)";
const ON_DARK_FAINT = "rgba(255,255,255,0.5)";
const ON_DARK_HAIR = "rgba(255,255,255,0.14)";
const ON_DARK_CHIP = "rgba(255,255,255,0.08)";

const SIDEBAR_KINDS = new Set<ResolvedSection["kind"]>([
  "skills",
  "languages",
  "certifications",
]);

export default function SidebarTemplate({ data, accent }: TemplateRenderProps) {
  const s = data.settings.fontScale;
  const p = data.personal;
  const sections = getOrderedSections(data);
  const sidebarSections = sections.filter((sec) => SIDEBAR_KINDS.has(sec.kind));
  const mainSections = sections.filter((sec) => !SIDEBAR_KINDS.has(sec.kind));

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
        display: "flex",
        alignItems: "stretch",
      }}
    >
      {/* ---------------------------------------------------------------- */}
      {/* LEFT DARK SIDEBAR (~36%)                                         */}
      {/* ---------------------------------------------------------------- */}
      <aside
        style={{
          width: 286, // ~36% of 794
          flex: "0 0 286px",
          alignSelf: "stretch",
          background: INK,
          color: ON_DARK,
          boxSizing: "border-box",
          padding: `${36 * s}px ${26 * s}px ${40 * s}px`,
          display: "flex",
          flexDirection: "column",
          gap: 24 * s,
        }}
      >
        {/* Identity */}
        <div>
          {p.photoUrl ? (
            <img
              src={p.photoUrl}
              alt=""
              style={{
                width: 92 * s,
                height: 92 * s,
                borderRadius: "50%",
                objectFit: "cover",
                display: "block",
                margin: `0 0 ${16 * s}px`,
                border: `3px solid ${accent}`,
              }}
            />
          ) : (
            <div
              style={{
                width: 64 * s,
                height: 64 * s,
                borderRadius: "50%",
                background: accent,
                color: ON_DARK,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22 * s,
                fontWeight: 700,
                letterSpacing: 0.5,
                margin: `0 0 ${16 * s}px`,
              }}
            >
              {initials(p.fullName)}
            </div>
          )}
          {p.fullName ? (
            <div
              style={{
                fontSize: 25 * s,
                lineHeight: 1.12,
                fontWeight: 700,
                letterSpacing: -0.3,
                color: ON_DARK,
              }}
            >
              {p.fullName}
            </div>
          ) : null}
          {p.headline ? (
            <div
              style={{
                marginTop: 7 * s,
                fontSize: 11.5 * s,
                lineHeight: 1.4,
                fontWeight: 500,
                color: accent,
              }}
            >
              {p.headline}
            </div>
          ) : null}
        </div>

        {/* Contact */}
        {contacts.length > 0 || links.length > 0 ? (
          <div>
            <SidebarHeading accent={accent} s={s}>
              Contact
            </SidebarHeading>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6 * s,
                fontSize: 10 * s,
                lineHeight: 1.45,
                color: ON_DARK_SOFT,
              }}
            >
              {contacts.map((c) => (
                <div key={c} style={{ wordBreak: "break-word" }}>
                  {c}
                </div>
              ))}
              {links.map((l) => (
                <div key={l.label} style={{ wordBreak: "break-word" }}>
                  <span style={{ color: ON_DARK_FAINT }}>{l.label}: </span>
                  <span style={{ color: ON_DARK_SOFT }}>{l.value}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Sidebar sections (skills / languages / certifications) */}
        {sidebarSections.map((sec) => (
          <div key={sec.token}>
            <SidebarHeading accent={accent} s={s}>
              {sec.title}
            </SidebarHeading>
            <SidebarSectionBody data={data} accent={accent} s={s} section={sec} />
          </div>
        ))}
      </aside>

      {/* ---------------------------------------------------------------- */}
      {/* RIGHT MAIN COLUMN (~64%)                                         */}
      {/* ---------------------------------------------------------------- */}
      <main
        style={{
          flex: "1 1 auto",
          minWidth: 0,
          boxSizing: "border-box",
          padding: `${40 * s}px ${42 * s}px ${44 * s}px`,
          display: "flex",
          flexDirection: "column",
          gap: 22 * s,
        }}
      >
        {mainSections.map((sec) => (
          <section key={sec.token}>
            <MainHeading accent={accent} s={s}>
              {sec.title}
            </MainHeading>
            <MainSectionBody data={data} accent={accent} s={s} section={sec} />
          </section>
        ))}
      </main>
    </div>
  );
}

// ===================================================================
// Headings
// ===================================================================

function SidebarHeading({
  children,
  accent,
  s,
}: {
  children: string;
  accent: string;
  s: number;
}) {
  return (
    <div
      style={{
        fontSize: 10 * s,
        fontWeight: 700,
        letterSpacing: 1.6,
        textTransform: "uppercase",
        color: accent,
        marginBottom: 9 * s,
        paddingBottom: 7 * s,
        borderBottom: `1px solid ${ON_DARK_HAIR}`,
      }}
    >
      {children}
    </div>
  );
}

function MainHeading({
  children,
  accent,
  s,
}: {
  children: string;
  accent: string;
  s: number;
}) {
  return (
    <div
      style={{
        fontSize: 11 * s,
        fontWeight: 700,
        letterSpacing: 1.8,
        textTransform: "uppercase",
        color: accent,
        marginBottom: 11 * s,
        paddingBottom: 7 * s,
        borderBottom: `1px solid ${HAIR}`,
      }}
    >
      {children}
    </div>
  );
}

// ===================================================================
// Sidebar section bodies
// ===================================================================

function SidebarSectionBody({
  data,
  accent,
  s,
  section,
}: {
  data: TemplateRenderProps["data"];
  accent: string;
  s: number;
  section: ResolvedSection;
}) {
  switch (section.kind) {
    case "skills":
      return <SidebarSkills data={data} accent={accent} s={s} />;
    case "languages":
      return <SidebarLanguages data={data} s={s} />;
    case "certifications":
      return <SidebarCertifications data={data} accent={accent} s={s} />;
    default:
      return null;
  }
}

function SidebarSkills({
  data,
  accent,
  s,
}: {
  data: TemplateRenderProps["data"];
  accent: string;
  s: number;
}) {
  const groups = groupSkills(data.skills);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 13 * s }}>
      {groups.map((g, gi) => (
        <div key={g.category || `g-${gi}`}>
          {g.category ? (
            <div
              style={{
                fontSize: 9 * s,
                fontWeight: 600,
                letterSpacing: 0.6,
                textTransform: "uppercase",
                color: ON_DARK_FAINT,
                marginBottom: 6 * s,
              }}
            >
              {g.category}
            </div>
          ) : null}
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: 5 * s }}
          >
            {g.items.map((sk) => (
              <span
                key={sk.id}
                style={{
                  fontSize: 9.5 * s,
                  lineHeight: 1.3,
                  color: ON_DARK_SOFT,
                  background: ON_DARK_CHIP,
                  border: `1px solid ${ON_DARK_HAIR}`,
                  borderRadius: 999,
                  padding: `${3 * s}px ${9 * s}px`,
                }}
              >
                {sk.name}
                {sk.level ? (
                  <span style={{ color: accent, marginLeft: 5 * s }}>
                    {"•"}
                  </span>
                ) : null}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function SidebarLanguages({
  data,
  s,
}: {
  data: TemplateRenderProps["data"];
  s: number;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 * s }}>
      {data.languages.map((l) => (
        <div
          key={l.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: 8 * s,
            fontSize: 10 * s,
            lineHeight: 1.35,
          }}
        >
          <span style={{ color: ON_DARK, fontWeight: 500 }}>{l.name}</span>
          <span style={{ color: ON_DARK_FAINT, whiteSpace: "nowrap" }}>
            {proficiencyLabel(l.proficiency)}
          </span>
        </div>
      ))}
    </div>
  );
}

function SidebarCertifications({
  data,
  accent,
  s,
}: {
  data: TemplateRenderProps["data"];
  accent: string;
  s: number;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 * s }}>
      {data.certifications.map((c) => (
        <div key={c.id}>
          <div
            style={{
              fontSize: 10.5 * s,
              fontWeight: 600,
              lineHeight: 1.3,
              color: ON_DARK,
            }}
          >
            {c.name}
          </div>
          {c.issuer || c.date ? (
            <div
              style={{
                marginTop: 2 * s,
                fontSize: 9.5 * s,
                lineHeight: 1.3,
                color: ON_DARK_SOFT,
              }}
            >
              {c.issuer}
              {c.issuer && c.date ? (
                <span style={{ color: accent }}> {"·"} </span>
              ) : null}
              {c.date}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

// ===================================================================
// Main section bodies
// ===================================================================

function MainSectionBody({
  data,
  accent,
  s,
  section,
}: {
  data: TemplateRenderProps["data"];
  accent: string;
  s: number;
  section: ResolvedSection;
}) {
  switch (section.kind) {
    case "summary":
      return (
        <p
          style={{
            margin: 0,
            fontSize: 10.5 * s,
            lineHeight: 1.6,
            color: BODY,
          }}
        >
          {data.summary}
        </p>
      );
    case "experience":
      return <MainExperience data={data} accent={accent} s={s} />;
    case "education":
      return <MainEducation data={data} accent={accent} s={s} />;
    case "projects":
      return <MainProjects data={data} accent={accent} s={s} />;
    case "custom":
      return section.customId ? (
        <MainCustom data={data} accent={accent} s={s} customId={section.customId} />
      ) : null;
    // skills/languages/certifications are rendered in the sidebar.
    default:
      return null;
  }
}

function ItemHeaderRow({
  title,
  meta,
  range,
  accent,
  s,
}: {
  title: ReactNode;
  meta?: string;
  range?: string;
  accent: string;
  s: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: 12 * s,
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: 11.5 * s,
            lineHeight: 1.3,
            color: TEXT,
            fontWeight: 600,
          }}
        >
          {title}
        </div>
        {meta ? (
          <div
            style={{
              marginTop: 1 * s,
              fontSize: 10 * s,
              lineHeight: 1.35,
              color: MUTED,
            }}
          >
            {meta}
          </div>
        ) : null}
      </div>
      {range ? (
        <div
          style={{
            flex: "0 0 auto",
            fontSize: 9.5 * s,
            lineHeight: 1.3,
            fontWeight: 600,
            color: accent,
            whiteSpace: "nowrap",
            textAlign: "right",
          }}
        >
          {range}
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
}) {
  if (items.length === 0) return null;
  return (
    <ul
      style={{
        margin: `${6 * s}px 0 0`,
        padding: 0,
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        gap: 4 * s,
      }}
    >
      {items.map((h, i) => (
        <li
          key={i}
          style={{
            position: "relative",
            paddingLeft: 13 * s,
            fontSize: 10 * s,
            lineHeight: 1.5,
            color: BODY,
          }}
        >
          <span
            style={{
              position: "absolute",
              left: 0,
              top: 6.5 * s,
              width: 4 * s,
              height: 4 * s,
              borderRadius: "50%",
              background: accent,
            }}
          />
          {h}
        </li>
      ))}
    </ul>
  );
}

function MainExperience({
  data,
  accent,
  s,
}: {
  data: TemplateRenderProps["data"];
  accent: string;
  s: number;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 15 * s }}>
      {data.experience.map((e) => {
        const meta = [e.company, e.location].filter(Boolean).join(" · ");
        return (
          <div key={e.id}>
            <ItemHeaderRow
              title={e.role}
              meta={meta || undefined}
              range={formatRange(e.startDate, e.endDate, e.current)}
              accent={accent}
              s={s}
            />
            {e.summary ? (
              <p
                style={{
                  margin: `${5 * s}px 0 0`,
                  fontSize: 10 * s,
                  lineHeight: 1.55,
                  color: BODY,
                }}
              >
                {e.summary}
              </p>
            ) : null}
            <Bullets items={e.highlights} accent={accent} s={s} />
          </div>
        );
      })}
    </div>
  );
}

function MainEducation({
  data,
  accent,
  s,
}: {
  data: TemplateRenderProps["data"];
  accent: string;
  s: number;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 13 * s }}>
      {data.education.map((ed) => {
        const title = [ed.degree, ed.field].filter(Boolean).join(", ");
        const meta = [ed.institution, ed.location].filter(Boolean).join(" · ");
        return (
          <div key={ed.id}>
            <ItemHeaderRow
              title={title || ed.institution}
              meta={title ? meta || undefined : ed.location || undefined}
              range={formatRange(ed.startDate, ed.endDate, ed.current)}
              accent={accent}
              s={s}
            />
            {ed.grade ? (
              <div
                style={{
                  marginTop: 3 * s,
                  fontSize: 9.5 * s,
                  lineHeight: 1.4,
                  color: MUTED,
                }}
              >
                {ed.grade}
              </div>
            ) : null}
            {ed.description ? (
              <p
                style={{
                  margin: `${4 * s}px 0 0`,
                  fontSize: 10 * s,
                  lineHeight: 1.55,
                  color: BODY,
                }}
              >
                {ed.description}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function MainProjects({
  data,
  accent,
  s,
}: {
  data: TemplateRenderProps["data"];
  accent: string;
  s: number;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 * s }}>
      {data.projects.map((pr) => (
        <div key={pr.id}>
          <ItemHeaderRow
            title={pr.name}
            meta={pr.role || undefined}
            range={formatRange(pr.startDate, pr.endDate)}
            accent={accent}
            s={s}
          />
          {pr.description ? (
            <p
              style={{
                margin: `${5 * s}px 0 0`,
                fontSize: 10 * s,
                lineHeight: 1.55,
                color: BODY,
              }}
            >
              {pr.description}
            </p>
          ) : null}
          <Bullets items={pr.highlights} accent={accent} s={s} />
          {pr.technologies.length > 0 ? (
            <div
              style={{
                marginTop: 7 * s,
                display: "flex",
                flexWrap: "wrap",
                gap: 5 * s,
              }}
            >
              {pr.technologies.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 9 * s,
                    lineHeight: 1.3,
                    color: BODY,
                    background: SURFACE2,
                    border: `1px solid ${HAIR}`,
                    borderRadius: 999,
                    padding: `${2.5 * s}px ${8 * s}px`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function MainCustom({
  data,
  accent,
  s,
  customId,
}: {
  data: TemplateRenderProps["data"];
  accent: string;
  s: number;
  customId: string;
}) {
  const custom = data.customSections.find((c) => c.id === customId);
  if (!custom) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 13 * s }}>
      {custom.entries.map((entry) => {
        const meta = entry.subtitle || undefined;
        return (
          <div key={entry.id}>
            <ItemHeaderRow
              title={entry.title}
              meta={meta}
              range={entry.date || undefined}
              accent={accent}
              s={s}
            />
            {entry.description ? (
              <p
                style={{
                  margin: `${5 * s}px 0 0`,
                  fontSize: 10 * s,
                  lineHeight: 1.55,
                  color: BODY,
                }}
              >
                {entry.description}
              </p>
            ) : null}
            <Bullets items={entry.bullets} accent={accent} s={s} />
          </div>
        );
      })}
    </div>
  );
}
