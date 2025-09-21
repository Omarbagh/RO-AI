import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Crown,
  Eye,
  TrendingUp,
  Star,
  ChevronRight,
} from "lucide-react";
import { TemplateType } from "../types/templateTypes";
import { defaultPreviewData } from "../data/dummyPreviewData";

export function TemplateCard({
  template,
  isSelected,
  onSelect,
  isPro,
  index,
}: {
  template: TemplateType;
  isSelected: boolean;
  onSelect: () => void;
  isPro: boolean;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const Preview = template.comp;
  const isLocked = template.pro && !isPro;

  return (
    <div
      className="group relative transition-all duration-500 hover:scale-[1.02] animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        className={`h-full relative overflow-hidden transition-all duration-300 ${
          isSelected
            ? "ring-2 ring-indigo-500 shadow-2xl border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50"
            : "border-gray-200 hover:border-indigo-300 hover:shadow-xl"
        } ${isLocked ? "opacity-75" : ""}`}
      >
        {/* PRO badge */}
        {template.pro && (
          <div className="absolute top-4 left-4 z-20">
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg">
              <Crown className="w-3 h-3 mr-1" />
              PRO
            </Badge>
          </div>
        )}

        {/* Popularity badge */}
        <div className="absolute top-4 right-4 z-20">
          <Badge
            variant="secondary"
            className="bg-white/90 backdrop-blur-sm text-gray-700 border-0 shadow-lg"
          >
            <TrendingUp className="w-3 h-3 mr-1" />
            {template.popularity}%
          </Badge>
        </div>

        {/* Selected indicator */}
        {isSelected && (
          <div className="absolute top-4 right-16 z-20 bg-indigo-500 text-white rounded-full p-1.5 shadow-lg animate-bounce">
            <CheckCircle className="w-4 h-4" />
          </div>
        )}

        {/* Locked overlay */}
        {isLocked && (
          <div className="absolute inset-0 z-30 bg-black/30 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 shadow-2xl text-center max-w-48">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Premium Template
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Upgrade to unlock this design
              </p>
              <Button
                size="sm"
                className="bg-gradient-to-r from-amber-500 to-orange-500"
              >
                Upgrade Now
              </Button>
            </div>
          </div>
        )}

        {/* Template preview */}
        <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden rounded-t-lg relative">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-5`}
          />
          <div className="relative z-10 transform scale-[0.28] origin-top-left w-[357%] h-[357%] pointer-events-none">
            <div className="bg-white rounded-lg shadow-sm">
              <Preview data={defaultPreviewData} />
            </div>
          </div>

          {/* Hover overlay */}
          <div
            className={`absolute inset-0 z-20 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
              isHovered && !isLocked ? "opacity-100" : "opacity-0"
            }`}
          >
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 shadow-xl transform scale-110"
              onClick={onSelect}
            >
              <Eye className="w-5 h-5 mr-2" />
              Preview Template
            </Button>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-1">
                {template.name}
              </h3>
              <Badge
                variant="outline"
                className={`text-xs bg-gradient-to-r ${template.color} text-white border-0`}
              >
                {template.category}
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(template.popularity / 20)
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            {template.description}
          </p>
          <div className="space-y-2 mb-4">
            {template.features.map((feature: string, idx: number) => (
              <div key={idx} className="flex items-center gap-2 text-xs">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span className="text-gray-600">{feature}</span>
              </div>
            ))}
          </div>
          <Button
            size="sm"
            onClick={!isLocked ? onSelect : undefined}
            disabled={isLocked}
            className={`w-full transition-all duration-300 ${
              isSelected
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg"
                : isLocked
                ? "bg-gradient-to-r from-amber-500 to-orange-500"
                : "bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700"
            }`}
          >
            {isSelected ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Selected Template
              </>
            ) : isLocked ? (
              <>
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Use
              </>
            ) : (
              <>
                <ChevronRight className="w-4 h-4 mr-2" />
                Select Template
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
