import Link from "next/link";

type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

const COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Functies", href: "#features" },
      { label: "Templates", href: "/templates" },
      { label: "Prijzen", href: "#pricing" },
      { label: "Cover letters", href: "#features" },
    ],
  },
  {
    title: "Bedrijf",
    links: [
      { label: "Over ons", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Carrière", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Juridisch",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Voorwaarden", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
];

export function MarketingFooter() {
  return (
    <footer className="border-t border-border-subtle bg-card">
      <div className="mx-auto grid max-w-[1140px] grid-cols-2 gap-8 px-5 py-12 sm:px-8 md:grid-cols-[2fr_1fr_1fr_1fr]">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="mb-[14px] flex items-center gap-[10px]">
            <span className="flex size-[26px] items-center justify-center rounded-[7px] bg-ink text-sm font-semibold text-white">
              C
            </span>
            <span className="text-[15px] font-semibold text-foreground">
              CVhero
            </span>
          </Link>
          <p className="max-w-[240px] text-[13px] leading-relaxed text-subtle">
            AI-gedreven cv-builder. Sneller schrijven, slimmer solliciteren.
          </p>
        </div>

        {/* Link columns */}
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <div className="mb-[14px] text-xs font-semibold text-foreground">
              {col.title}
            </div>
            <div className="flex flex-col gap-[9px] text-[13px] text-muted-foreground">
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border-subtle">
        <div className="mx-auto flex max-w-[1140px] flex-col gap-2 px-5 py-5 text-xs text-subtle sm:flex-row sm:justify-between sm:px-8">
          <span>© 2026 CVhero. Alle rechten voorbehouden.</span>
          <span>Gemaakt in Amsterdam 🇳🇱</span>
        </div>
      </div>
    </footer>
  );
}
