import type { CSSProperties, JSX } from "react";
import type { TemplateRenderProps } from "@/lib/templates/types";
import type {
  CustomEntry,
  EducationItem,
  ExperienceItem,
  LanguageItem,
  ProjectItem,
  CertificationItem,
} from "@/lib/resume/schema";
import { getOrderedSections } from "@/lib/resume/sections";
import {
  contactLine,
  formatRange,
  groupSkills,
  proficiencyLabel,
  profileLinks,
} from "@/lib/templates/format";

/**
 * Minimalist — very restrained, generous whitespace. Two-column section layout:
 * a small uppercase label in the left column, content on the right. Hairline
 * dividers separate sections. The accent shows up only as a tiny dot before the
 * name. ATS-friendly: real text, logical order, no text-in-images.
 */
export default function MinimalistTemplate({
  data,
  accent,
}: TemplateRenderProps): JSX.Element {
  const s = data.settings.fontScale;
  const personal = data.personal;
  const sections = getOrderedSections(data);

  // ---- shared palette ------------------------------------------------------
  const TEXT = "#1A1A22";
  const BODY = "#3b3a42";
  const MUTED = "#6B6A77";
  const SUBTLE = "#9A98A2";
  const HAIRLINE = "#F0EEE9";

  // ---- shared type helpers -------------------------------------------------
  const bodyText: CSSProperties = {
    fontSize: 10.5 * s,
    lineHeight: 1.65,
    color: BODY,
    margin: 0,
  };

  const labelStyle: CSSProperties = {
    width: 150,
    flex: "0 0 150px",
    fontSize: 10 * s,
    fontWeight: 600,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: MUTED,
    paddingRight: 24,
    boxSizing: "border-box",
  };

  const contentCol: CSSProperties = {
    flex: "1 1 auto",
    minWidth: 0,
  };

  const itemTitle: CSSProperties = {
    fontSize: 11.5 * s,
    fontWeight: 600,
    color: TEXT,
    margin: 0,
  };

  const itemMeta: CSSProperties = {
    fontSize: 10 * s,
    color: MUTED,
    margin: 0,
  };

  const rangeStyle: CSSProperties = {
    fontSize: 9.5 * s,
    color: SUBTLE,
    whiteSpace: "nowrap",
    flex: "0 0 auto",
    paddingLeft: 16,
  };

  // ---- small building blocks ----------------------------------------------
  const Bullets = ({ items }: { items: string[] }): JSX.Element | null => {
    const real = items.filter((b) => b.trim().length > 0);
    if (real.length === 0) return null;
    return (
      <ul
        style={{
          listStyle: "none",
          margin: "6px 0 0 0",
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: 4 * s,
        }}
      >
        {real.map((b, i) => (
          <li
            key={i}
            style={{
              ...bodyText,
              position: "relative",
              paddingLeft: 14,
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                color: SUBTLE,
              }}
            >
              –
            </span>
            {b}
          </li>
        ))}
      </ul>
    );
  };

  /** A row: degree/role line on the left, formatted range right-aligned. */
  const HeadRow = ({
    title,
    range,
  }: {
    title: string;
    range: string;
  }): JSX.Element => (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        gap: 8,
      }}
    >
      <p style={itemTitle}>{title}</p>
      {range ? <span style={rangeStyle}>{range}</span> : null}
    </div>
  );

  // ---- per-kind renderers --------------------------------------------------
  const renderExperience = (): JSX.Element => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 * s }}>
      {data.experience.map((item: ExperienceItem) => {
        const meta = [item.company, item.location]
          .filter((v) => v && v.trim().length > 0)
          .join(" · ");
        return (
          <div key={item.id}>
            <HeadRow
              title={item.role || item.company}
              range={formatRange(item.startDate, item.endDate, item.current)}
            />
            {meta ? (
              <p style={{ ...itemMeta, marginTop: 2 }}>{meta}</p>
            ) : null}
            {item.summary && item.summary.trim().length > 0 ? (
              <p style={{ ...bodyText, marginTop: 6 }}>{item.summary}</p>
            ) : null}
            <Bullets items={item.highlights} />
          </div>
        );
      })}
    </div>
  );

  const renderEducation = (): JSX.Element => (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 * s }}>
      {data.education.map((item: EducationItem) => {
        const title = [item.degree, item.field]
          .filter((v) => v && v.trim().length > 0)
          .join(", ");
        const meta = [item.institution, item.location]
          .filter((v) => v && v.trim().length > 0)
          .join(" · ");
        return (
          <div key={item.id}>
            <HeadRow
              title={title || item.institution}
              range={formatRange(item.startDate, item.endDate, item.current)}
            />
            {meta ? (
              <p style={{ ...itemMeta, marginTop: 2 }}>{meta}</p>
            ) : null}
            {item.grade && item.grade.trim().length > 0 ? (
              <p style={{ ...itemMeta, marginTop: 2 }}>{item.grade}</p>
            ) : null}
            {item.description && item.description.trim().length > 0 ? (
              <p style={{ ...bodyText, marginTop: 6 }}>{item.description}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );

  const renderSkills = (): JSX.Element => {
    const groups = groupSkills(data.skills);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 * s }}>
        {groups.map((group, gi) => (
          <div key={group.category || `g-${gi}`}>
            {group.category ? (
              <p
                style={{
                  fontSize: 9.5 * s,
                  fontWeight: 600,
                  color: TEXT,
                  margin: "0 0 6px 0",
                }}
              >
                {group.category}
              </p>
            ) : null}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 * s }}>
              {group.items.map((skill) => (
                <span
                  key={skill.id}
                  style={{
                    fontSize: 9.5 * s,
                    color: BODY,
                    border: `1px solid ${HAIRLINE}`,
                    borderRadius: 3,
                    padding: `${3 * s}px ${9 * s}px`,
                    lineHeight: 1.3,
                    whiteSpace: "nowrap",
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
  };

  const renderProjects = (): JSX.Element => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 * s }}>
      {data.projects.map((item: ProjectItem) => {
        const title = [item.name, item.role]
          .filter((v) => v && v.trim().length > 0)
          .join(" · ");
        return (
          <div key={item.id}>
            <HeadRow
              title={title || item.name}
              range={formatRange(item.startDate, item.endDate, false)}
            />
            {item.description && item.description.trim().length > 0 ? (
              <p style={{ ...bodyText, marginTop: 6 }}>{item.description}</p>
            ) : null}
            <Bullets items={item.highlights} />
            {item.technologies.length > 0 ? (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6 * s,
                  marginTop: 8,
                }}
              >
                {item.technologies.map((tech, ti) => (
                  <span
                    key={ti}
                    style={{
                      fontSize: 9 * s,
                      color: MUTED,
                      border: `1px solid ${HAIRLINE}`,
                      borderRadius: 3,
                      padding: `${2 * s}px ${7 * s}px`,
                      lineHeight: 1.3,
                      whiteSpace: "nowrap",
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

  const renderCertifications = (): JSX.Element => (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 * s }}>
      {data.certifications.map((item: CertificationItem) => {
        const meta = [item.issuer, item.date]
          .filter((v) => v && v.trim().length > 0)
          .join(" · ");
        return (
          <div key={item.id}>
            <p style={itemTitle}>{item.name}</p>
            {meta ? (
              <p style={{ ...itemMeta, marginTop: 2 }}>{meta}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );

  const renderLanguages = (): JSX.Element => (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 * s }}>
      {data.languages.map((item: LanguageItem) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 10.5 * s, color: TEXT }}>{item.name}</span>
          <span style={{ fontSize: 9.5 * s, color: MUTED }}>
            {proficiencyLabel(item.proficiency)}
          </span>
        </div>
      ))}
    </div>
  );

  const renderCustom = (customId: string): JSX.Element | null => {
    const section = data.customSections.find((c) => c.id === customId);
    if (!section) return null;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 * s }}>
        {section.entries.map((entry: CustomEntry) => {
          const meta = [entry.subtitle]
            .filter((v) => v && v.trim().length > 0)
            .join(" · ");
          return (
            <div key={entry.id}>
              <HeadRow title={entry.title} range={entry.date} />
              {meta ? (
                <p style={{ ...itemMeta, marginTop: 2 }}>{meta}</p>
              ) : null}
              {entry.description && entry.description.trim().length > 0 ? (
                <p style={{ ...bodyText, marginTop: 6 }}>{entry.description}</p>
              ) : null}
              <Bullets items={entry.bullets} />
            </div>
          );
        })}
      </div>
    );
  };

  const renderSummary = (): JSX.Element => (
    <p style={bodyText}>{data.summary}</p>
  );

  const renderBody = (
    section: ReturnType<typeof getOrderedSections>[number],
  ): JSX.Element | null => {
    switch (section.kind) {
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
        return renderCustom(section.customId);
      default:
        return null;
    }
  };

  // ---- header --------------------------------------------------------------
  const contacts = contactLine(data);
  const links = profileLinks(data);
  const headerLine = [
    ...contacts,
    ...links.map((l) => l.value),
  ];

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
        padding: "72px 72px 64px 72px",
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              width: 7 * s,
              height: 7 * s,
              borderRadius: "50%",
              background: accent,
              flex: "0 0 auto",
              display: "inline-block",
            }}
            aria-hidden="true"
          />
          <h1
            style={{
              fontSize: 24 * s,
              fontWeight: 600,
              letterSpacing: -0.2,
              color: TEXT,
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            {personal.fullName}
          </h1>
        </div>
        {personal.headline ? (
          <p
            style={{
              fontSize: 12 * s,
              fontWeight: 400,
              color: MUTED,
              margin: "8px 0 0 17px",
              lineHeight: 1.3,
            }}
          >
            {personal.headline}
          </p>
        ) : null}
        {headerLine.length > 0 ? (
          <p
            style={{
              fontSize: 9.5 * s,
              color: SUBTLE,
              margin: "10px 0 0 17px",
              lineHeight: 1.5,
            }}
          >
            {headerLine.map((part, i) => (
              <span key={i}>
                {i > 0 ? (
                  <span style={{ color: HAIRLINE, padding: "0 6px" }}>•</span>
                ) : null}
                {part}
              </span>
            ))}
          </p>
        ) : null}
      </header>

      {/* Body — two-column sections separated by hairlines */}
      <main>
        {sections.map((section) => {
          const content = renderBody(section);
          if (!content) return null;
          return (
            <section
              key={section.token}
              style={{
                display: "flex",
                alignItems: "flex-start",
                borderTop: `1px solid ${HAIRLINE}`,
                paddingTop: 22 * s,
                marginTop: 22 * s,
              }}
            >
              <div style={labelStyle}>{section.title}</div>
              <div style={contentCol}>{content}</div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
