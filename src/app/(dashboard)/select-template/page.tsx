"use client";

import { useMemo, useState, useEffect } from "react";
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
  Sparkles,
  Crown,
} from "lucide-react";
import { templates } from "../editor/utils/templateMap";
import { useAuth, useUser } from "@clerk/nextjs";
import { SignedIn } from "@clerk/nextjs";
import { CheckoutButton } from "@clerk/nextjs/experimental";

export default function TemplateSelectionPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const { has } = useAuth();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | string>("All");
  const [selected, setSelected] = useState<string | null>(null);
  const [isProUser, setIsProUser] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user has pro plan
  useEffect(() => {
    const checkProStatus = async () => {
      if (!isLoaded || !user) {
        setLoading(false);
        return;
      }

      try {
        // Check if user has pro plan using Clerk's has() function
        const hasProPlan = await has({ plan: "pro" });
        setIsProUser(hasProPlan);
      } catch (error) {
        console.error("Error checking pro status:", error);
        setIsProUser(false);
      } finally {
        setLoading(false);
      }
    };

    checkProStatus();
  }, [user, isLoaded, has]);

  // Filter templates based on user plan
  const filtered = useMemo(() => {
    let availableTemplates = templates;

    // If user is not pro, only show templates with "Free" in the name
    if (!isProUser && !loading) {
      availableTemplates = templates.filter((t) =>
        t.name.toLowerCase().includes("free"),
      );
    }

    return availableTemplates.filter((t) => {
      const matchCat = category === "All" || t.category === category;
      const q = query.trim().toLowerCase();
      const matchQ =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        (t.category || "").toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [query, category, isProUser, loading]);

  const handleContinue = () => {
    if (!selected) return;

    // Check if selected template requires pro
    const selectedTemplate = templates.find((t) => t.id === selected);
    const isProTemplate =
      selectedTemplate && !selectedTemplate.name.toLowerCase().includes("free");

    if (isProTemplate && !isProUser) {
      // Show upgrade message or redirect to upgrade page
      alert("Upgrade to Pro to use this premium template! 🚀");
      return;
    }

    router.push(`/editor?templateId=${selected}`);
  };

  // Check if selected template requires pro
  const selectedTemplate = selected
    ? templates.find((t) => t.id === selected)
    : null;
  const isSelectedTemplatePro =
    selectedTemplate && !selectedTemplate.name.toLowerCase().includes("free");

  if (loading) {
    return (
      <div className="w-full max-w-full overflow-x-hidden px-4 animate-fade-in">
        <div className="flex justify-center items-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

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
            {isProUser
              ? "Access all premium templates with your Pro plan 🎉"
              : "Free plan: Basic template only. Upgrade to Pro for unlimited options!"}
          </p>
        </div>
      </div>

      {/* Upgrade Banner for Free Users */}
      {!isProUser && (
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Crown className="h-5 w-5 text-blue-600" />
              <div>
                <h3 className="font-semibold text-blue-900">Upgrade to Pro</h3>
                <p className="text-blue-700 text-sm">
                  Unlock all premium templates, unlimited CVs, and advanced
                  features
                </p>
              </div>
            </div>
            <SignedIn>
              <CheckoutButton
                planId="cplan_334J23pEpXcBH3uvZ6K3Sn9RlyZ"
                planPeriod="month"
                checkoutProps={{
                  appearance: {
                    
                  },
                }}
                onSubscriptionComplete={() => {
                  console.log("Subscription completed!");
                }}
                newSubscriptionRedirectUrl="/dashboard"
              >
                Upgrade Now
              </CheckoutButton>
            </SignedIn>
          </div>
        </div>
      )}

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
                  placeholder={
                    isProUser
                      ? "Search templates by name, category, or description..."
                      : "Search available templates..."
                  }
                  className="pl-10 border-gray-300 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[
                "All",
                "Business",
                "Creative",
                "Modern",
                "Simple",
                "Professional",
              ].map((c) => (
                <Button
                  key={c}
                  variant={category === c ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCategory(c)}
                  className={
                    category === c
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                      : "border-gray-300 hover:bg-gray-50 transition-colors"
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
            {filtered.length} template{filtered.length !== 1 ? "s" : ""}{" "}
            available
            {!isProUser && " (Free plan)"}
          </span>
        </div>

        {selected && (
          <Badge
            className={
              isSelectedTemplatePro && !isProUser
                ? "bg-orange-100 text-orange-800 border-orange-200"
                : "bg-green-100 text-green-800 border-green-200"
            }
          >
            <CheckCircle2 className="h-3 w-3 mr-1" />
            {isSelectedTemplatePro && !isProUser
              ? "Pro Template Selected"
              : "Template Selected"}
          </Badge>
        )}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {filtered.map((t) => {
          const isProTemplate = !t.name.toLowerCase().includes("free");
          const isLocked = isProTemplate && !isProUser;

          return (
            <TemplateCard
              key={t.id}
              template={t}
              isSelected={selected === t.id}
              isLocked={isLocked}
              onSelect={() => {
                if (isLocked) {
                  alert("Upgrade to Pro to unlock this premium template! 🚀");
                  return;
                }
                setSelected(t.id);
                // Auto-navigate to editor when selected
                setTimeout(() => {
                  router.push(`/editor?templateId=${t.id}`);
                }, 300);
              }}
            />
          );
        })}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <LayoutTemplate className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {isProUser ? "No templates found" : "No available templates"}
          </h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            {isProUser
              ? "Try adjusting your search criteria or browse all templates."
              : "Free users have access to basic templates only. Upgrade to Pro for more options!"}
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
              variant="outline"
              className="border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Clear filters
            </Button>
            {!isProUser && (
              <Button
                onClick={() => router.push("/pricing")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
              >
                <Crown className="h-4 w-4 mr-2" />
                Upgrade to Pro
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
