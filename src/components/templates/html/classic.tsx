/**
 * "Classic" template — a traditional, conservative single-column CV.
 *
 * Layout: a centered header (large name, headline, centered contact line) above
 * a full-width horizontal rule. Below it, a single column of sections whose
 * headings are bold UPPERCASE with a full-width bottom border. Accent is used
 * sparingly (rules / headings) and defaults to near-black ink.
 *
 * Pure presentation component — no hooks, no "use client" — so it renders on the
 * server (thumbnails) and the client (editor preview). All styling is inline px
 * so the print canvas stays self-contained.
 */
import type { CSSProperties, ReactNode } from "react";
import type { TemplateRenderProps } from "@/lib/templates/types";
import {
  contactLine,
  formatRange,
  groupSkills,
  proficiencyLabel,
  profileLinks,
} from "@/lib/templates/format";
import { getOrderedSections } from "@/lib/resume/sections";

// Shared palette (see contract).
const TEXT = "#1A1A22";
const BODY = "#3b3a42";
const MUTED = "#6B6A77";
const SUBTLE = "#9A98A2";
const HAIRLINE = "#E8E5DD";
const SURFACE2 = "#F4F2ED";

export default function ClassicTemplate({ data, accent }: TemplateRenderProps) {
  const s = data.settings.fontScale;
  const { personal } = data;
  const sections = getOrderedSections(data);

  const contacts = contactLine(data);
  const links = profileLinks(data);

  // --- Reusable atoms -------------------------------------------------------

  const sectionHeading: CSSProperties = {
    fontSize: 12 * s,
    fontWeight: 700,
    letterSpacing: 1.6 * s,
    textTransform: "uppercase",
    color: accent,
    margin: 0,
    paddingBottom: 5 * s,
    borderBottom: `1.5px solid ${accent}`,
  };

  const sectionWrap: CSSProperties = {
    marginTop: 22 * s,
  };

  const bodyText: CSSProperties = {
    fontSize: 10 * s,
    lineHeight: 1.55,
    color: BODY,
    margin: 0,
  };

  const itemTitle: CSSProperties = {
    fontSize: 11 * s,
    fontWeight: 600,
    color: TEXT,
    margin: 0,
  };

  const metaText: CSSProperties = {
    fontSize: 9.5 * s,
    color: MUTED,
    margin: 0,
  };

  const rangeText: CSSProperties = {
    fontSize: 9.5 * s,
    color: MUTED,
    whiteSpace: "nowrap",
    paddingLeft: 12 * s,
    fontStyle: "italic",
  };

  // Header row with a left content block and a right-aligned date range.
  const titleRow = (left: ReactNode, range: string) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
      }}
    >
      <div style={{ minWidth: 0 }}>{left}</div>
      {range ? <span style={rangeText}>{range}</span> : null}
    </div>
  );

  const bulletList = (items: string[]) => (
    <ul
      style={{
        margin: `${6 * s}px 0 0`,
        paddingLeft: 16 * s,
        listStyleType: "disc",
      }}
    >
      {items
        .filter((b) => b && b.trim().length > 0)
        .map((b, i) => (
          <li
            key={i}
            style={{
              ...bodyText,
              marginBottom: 3 * s,
              paddingLeft: 2 * s,
            }}
          >
            {b}
          </li>
        ))}
    </ul>
  );

  // Joins non-empty meta parts with a middot separator.
  const metaJoin = (parts: (string | undefined)[]) =>
    parts.filter((p): p is string => Boolean(p && p.trim().length > 0)).join("  ·  ");

  const chip: CSSProperties = {
    display: "inline-block",
    fontSize: 9 * s,
    color: BODY,
    background: SURFACE2,
    border: `0.75px solid ${HAIRLINE}`,
    borderRadius: 3,
    padding: `${2.5 * s}px ${8 * s}px`,
    marginRight: 6 * s,
    marginTop: 6 * s,
    lineHeight: 1.3,
  };

  // --- Section renderers ----------------------------------------------------

  function renderSummary() {
    return <p style={bodyText}>{data.summary}</p>;
  }

  function renderExperience() {
    return (
      <div>
        {data.experience.map((item, idx) => (
          <div key={item.id} style={{ marginTop: idx === 0 ? 0 : 14 * s }}>
            {titleRow(
              <>
                <p style={itemTitle}>{item.role}</p>
                <p style={{ ...metaText, marginTop: 1 * s }}>
                  {metaJoin([item.company, item.location])}
                </p>
              </>,
              formatRange(item.startDate, item.endDate, item.current),
            )}
            {item.summary && item.summary.trim().length > 0 ? (
              <p style={{ ...bodyText, marginTop: 5 * s }}>{item.summary}</p>
            ) : null}
            {item.highlights.length > 0 ? bulletList(item.highlights) : null}
          </div>
        ))}
      </div>
    );
  }

  function renderEducation() {
    return (
      <div>
        {data.education.map((item, idx) => {
          const degree = metaJoin([
            item.degree,
            item.field && item.field !== item.degree ? item.field : undefined,
          ]);
          return (
            <div key={item.id} style={{ marginTop: idx === 0 ? 0 : 14 * s }}>
              {titleRow(
                <>
                  <p style={itemTitle}>{degree || item.institution}</p>
                  <p style={{ ...metaText, marginTop: 1 * s }}>
                    {metaJoin([
                      degree ? item.institution : undefined,
                      item.location,
                      item.grade,
                    ])}
                  </p>
                </>,
                formatRange(item.startDate, item.endDate, item.current),
              )}
              {item.description && item.description.trim().length > 0 ? (
                <p style={{ ...bodyText, marginTop: 5 * s }}>{item.description}</p>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  }

  function renderSkills() {
    const groups = groupSkills(data.skills);
    return (
      <div>
        {groups.map((group, idx) => (
          <div
            key={group.category || `group-${idx}`}
            style={{
              display: "flex",
              gap: 10 * s,
              marginTop: idx === 0 ? 4 * s : 8 * s,
              alignItems: "baseline",
            }}
          >
            {group.category ? (
              <span
                style={{
                  fontSize: 10 * s,
                  fontWeight: 600,
                  color: TEXT,
                  minWidth: 110 * s,
                  flexShrink: 0,
                }}
              >
                {group.category}
              </span>
            ) : null}
            <span style={{ ...bodyText, flex: 1 }}>
              {group.items.map((sk) => sk.name).join("  ·  ")}
            </span>
          </div>
        ))}
      </div>
    );
  }

  function renderProjects() {
    return (
      <div>
        {data.projects.map((item, idx) => (
          <div key={item.id} style={{ marginTop: idx === 0 ? 0 : 14 * s }}>
            {titleRow(
              <p style={itemTitle}>{metaJoin([item.name, item.role])}</p>,
              formatRange(item.startDate, item.endDate),
            )}
            {item.description && item.description.trim().length > 0 ? (
              <p style={{ ...bodyText, marginTop: 4 * s }}>{item.description}</p>
            ) : null}
            {item.highlights.length > 0 ? bulletList(item.highlights) : null}
            {item.technologies.length > 0 ? (
              <div style={{ marginTop: 2 * s }}>
                {item.technologies.map((tech, i) => (
                  <span key={i} style={chip}>
                    {tech}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    );
  }

  function renderCertifications() {
    return (
      <div>
        {data.certifications.map((item, idx) => (
          <div key={item.id} style={{ marginTop: idx === 0 ? 0 : 8 * s }}>
            {titleRow(
              <p style={{ ...itemTitle, fontWeight: 500 }}>
                <span style={{ fontWeight: 600 }}>{item.name}</span>
                {item.issuer ? (
                  <span style={{ color: MUTED, fontWeight: 400 }}>
                    {"  ·  "}
                    {item.issuer}
                  </span>
                ) : null}
              </p>,
              item.date,
            )}
          </div>
        ))}
      </div>
    );
  }

  function renderLanguages() {
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          columnGap: 28 * s,
          rowGap: 6 * s,
          marginTop: 2 * s,
        }}
      >
        {data.languages.map((lang) => (
          <div key={lang.id} style={{ fontSize: 10 * s, color: BODY }}>
            <span style={{ fontWeight: 600, color: TEXT }}>{lang.name}</span>
            <span style={{ color: MUTED }}>
              {"  —  "}
              {proficiencyLabel(lang.proficiency)}
            </span>
          </div>
        ))}
      </div>
    );
  }

  function renderCustom(customId: string) {
    const custom = data.customSections.find((c) => c.id === customId);
    if (!custom) return null;
    return (
      <div>
        {custom.entries.map((entry, idx) => (
          <div key={entry.id} style={{ marginTop: idx === 0 ? 0 : 14 * s }}>
            {titleRow(
              <>
                {entry.title ? <p style={itemTitle}>{entry.title}</p> : null}
                {entry.subtitle ? (
                  <p style={{ ...metaText, marginTop: 1 * s }}>{entry.subtitle}</p>
                ) : null}
              </>,
              entry.date,
            )}
            {entry.description && entry.description.trim().length > 0 ? (
              <p style={{ ...bodyText, marginTop: 5 * s }}>{entry.description}</p>
            ) : null}
            {entry.bullets.length > 0 ? bulletList(entry.bullets) : null}
          </div>
        ))}
      </div>
    );
  }

  function renderSectionBody(
    kind: (typeof sections)[number]["kind"],
    customId?: string,
  ) {
    switch (kind) {
      case "summary":
        return renderSummary();
      case "experience":
        return renderExperience();
      case "education":
        return renderEducation();
      case "skills":
        return renderSkills();
      case "projects":
        return renderProjects();
      case "certifications":
        return renderCertifications();
      case "languages":
        return renderLanguages();
      case "custom":
        return customId ? renderCustom(customId) : null;
      default:
        return null;
    }
  }

  // --- Document -------------------------------------------------------------

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
        padding: `${52 * s}px ${60 * s}px`,
      }}
    >
      {/* Centered header */}
      <header style={{ textAlign: "center" }}>
        {personal.fullName ? (
          <h1
            style={{
              fontSize: 30 * s,
              fontWeight: 600,
              letterSpacing: 0.5 * s,
              color: TEXT,
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            {personal.fullName}
          </h1>
        ) : null}

        {personal.headline ? (
          <p
            style={{
              fontSize: 12.5 * s,
              fontWeight: 500,
              color: accent,
              letterSpacing: 0.5 * s,
              margin: `${6 * s}px 0 0`,
            }}
          >
            {personal.headline}
          </p>
        ) : null}

        {contacts.length > 0 || links.length > 0 ? (
          <p
            style={{
              fontSize: 9.5 * s,
              color: MUTED,
              margin: `${10 * s}px 0 0`,
              lineHeight: 1.6,
            }}
          >
            {contacts.join("   ·   ")}
            {contacts.length > 0 && links.length > 0 ? "   ·   " : ""}
            {links.map((l, i) => (
              <span key={l.label}>
                {i > 0 ? "   ·   " : ""}
                {l.value}
              </span>
            ))}
          </p>
        ) : null}
      </header>

      {/* Full-width rule under the header */}
      <div
        style={{
          height: 2,
          background: accent,
          margin: `${18 * s}px 0 0`,
        }}
      />
      <div
        style={{
          height: 1,
          background: SUBTLE,
          opacity: 0.35,
          marginTop: 2,
        }}
      />

      {/* Single-column body */}
      <main>
        {sections.map((section) => (
          <section key={section.token} style={sectionWrap}>
            <h2 style={sectionHeading}>{section.title}</h2>
            <div style={{ marginTop: 10 * s }}>
              {renderSectionBody(section.kind, section.customId)}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
