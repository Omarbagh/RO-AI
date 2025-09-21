"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TemplateCard } from "./TemplateCard";
import {
  CheckCircle2,
  Filter,
  LayoutTemplate,
  Search,
  Sparkles,
} from "lucide-react";

import { templates } from "../utils/templateMap";

export default function TemplateSelectionPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | string>("All");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return templates.filter((t) => {
      const matchCat = category === "All" || t.category === category;
      const q = query.trim().toLowerCase();
      const matchQ =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        (t.category || "").toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [query, category]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-brand to-indigo-600 shadow-inner" />
            <span className="text-lg font-semibold tracking-tight">Templates</span>
          </div>
          <Button variant="outline" className="hidden sm:inline-flex">
            <Sparkles className="mr-2" /> Feedback
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <section className="mb-10">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-3 bg-gradient-to-r from-brand to-indigo-600 text-white border-0">
              New: Improved selection experience
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Choose a template
            </h1>
            <p className="mt-3 text-slate-600">
              A clean and modern UI to quickly find the best template for your resume.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="col-span-2 flex items-center gap-3 rounded-xl border bg-white p-2 shadow-sm">
              <Search className="ml-2 h-5 w-5 text-slate-400" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, category..."
                className="border-0 shadow-none focus-visible:ring-0"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto">
              {["All", "Business", "Creative", "Tech", "Simple"].map((c) => (
                <Button
                  key={c}
                  variant={category === c ? "default" : "outline"}
                  onClick={() => setCategory(c)}
                  className={
                    category === c
                      ? "bg-gradient-to-r from-brand to-indigo-600 text-white border-0"
                      : ""
                  }
                >
                  <Filter className="mr-2 h-4 w-4" /> {c}
                </Button>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-600">
              <LayoutTemplate />
              <span className="text-sm">{filtered.length} templates</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t, idx) => (
              <TemplateCard
                key={t.id}
                template={t}
                isSelected={selected === t.id}
                onSelect={() => setSelected(t.id)}
                isPro={t.pro ?? false}
                index={idx}
              />
            ))}
          </div>

          {selected && (
            <div className="mt-8 flex items-center justify-center">
              <Button className="bg-gradient-to-r from-brand to-indigo-600 text-white">
                <CheckCircle2 className="mr-2" /> Selected:{" "}
                {templates.find((x) => x.id === selected)?.name}
              </Button>
            </div>
          )}
        </section>
      </main>

      <footer className="mt-12 border-t bg-white/60">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Templates. Modern and clean.
        </div>
      </footer>
    </div>
  );
}

