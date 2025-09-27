"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TemplateCard } from "../editor/components/TemplateCard";
import {
  CheckCircle2,
  Filter,
  LayoutTemplate,
  Search,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { templates } from "../editor/utils/templateMap";
import Link from "next/link";

export default function TemplateSelectionPage() {
  const router = useRouter();
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

  const handleContinue = () => {
    if (!selected) return;
    router.push(`/editor?templateId=${selected}`);
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden px-4 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-indigo-700 bg-clip-text text-transparent">
            Choose a Template
          </h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-1">
            <Sparkles className="h-4 w-4 text-indigo-500" />
            Select the perfect template for your resume
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search templates by name, category, or description..."
                  className="pl-10 border-gray-300 focus:border-indigo-500"
                />
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {["All", "Business", "Creative", "Modern", "Simple", "Professional"].map((c) => (
                <Button
                  key={c}
                  variant={category === c ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCategory(c)}
                  className={
                    category === c
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : "border-gray-300"
                  }
                >
                  <Filter className="mr-2 h-3 w-3" /> 
                  {c}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-gray-600">
          <LayoutTemplate className="h-5 w-5" />
          <span className="text-sm font-medium">
            {filtered.length} template{filtered.length !== 1 ? 's' : ''} found
          </span>
        </div>
        
        {selected && (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Template selected
          </Badge>
        )}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {filtered.map((t) => (
          <TemplateCard
            key={t.id}
            template={t}
            isSelected={selected === t.id}
            onSelect={() => {
              setSelected(t.id);
              // Auto-navigate to editor when selected
              setTimeout(() => {
                router.push(`/editor?templateId=${t.id}`);
              }, 300);
            }}
          />
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <LayoutTemplate className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No templates found
          </h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            Try adjusting your search criteria or browse all templates.
          </p>
          <Button
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            variant="outline"
          >
            Clear filters
          </Button>
        </div>
      )}

      {/* Selection Confirmation */}
      {selected && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-lg px-6 py-4 z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="font-medium">
                {templates.find((x) => x.id === selected)?.name} selected
              </span>
            </div>
            <Button 
              onClick={handleContinue}
              className="bg-indigo-600 hover:bg-indigo-700"
              size="sm"
            >
              Continue to Editor
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}