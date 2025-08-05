import React from "react";
import { HexColorPicker } from "react-colorful";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ColorPicker({
  color,
  onChange,
  isOpen,
  onToggle,
}: {
  color: string;
  onChange: (color: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const presetColors = [
    "#6366f1",
    "#8b5cf6",
    "#ec4899",
    "#f59e0b",
    "#10b981",
    "#3b82f6",
    "#ef4444",
    "#6b7280",
  ];

  return (
    <div className="relative">
      <label className="text-sm font-medium text-gray-700">Brand Color</label>
      <div className="flex items-center mt-2 mb-2 gap-3 bg-[#F4F4F4] flex-row px-[7px] w-[115px] h-[33px] rounded-[20px] order-1 grow-0 shrink-0">
        <button
          className="w-6 h-6 rounded-full border-2 shadow-lg transition-transform hover:scale-110 relative overflow-hidden" 
          style={{ backgroundColor: color }}
          onClick={onToggle}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
        </button>
        <span className="text-[#64748B] text-sm">{color}</span>
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 z-50 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 w-72">
          <div className="space-y-4">
            <div className="text-center">
              <h4 className="font-semibold text-gray-900 mb-2">
                Choose Your Brand Color
              </h4>
              <p className="text-sm text-gray-600">
                This color will be used throughout your resume
              </p>
            </div>
            <div className="flex justify-center">
              <HexColorPicker color={color} onChange={onChange} />
            </div>
            <div className="space-y-3">
              <h5 className="text-sm font-medium text-gray-700">
                Quick Select
              </h5>
              <div className="grid grid-cols-4 gap-2">
                {presetColors.map((presetColor) => (
                  <button
                    key={presetColor}
                    className={`w-12 h-8 rounded-lg border-2 transition-all hover:scale-110 ${
                      color === presetColor
                        ? "border-gray-400 ring-2 ring-gray-300"
                        : "border-gray-200"
                    }`}
                    style={{ backgroundColor: presetColor }}
                    onClick={() => onChange(presetColor)}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Hex:</span>
              <Input
                className="text-sm font-mono"
                value={color}
                onChange={(e) => onChange(e.target.value)}
              />
            </div>
            <Button onClick={onToggle} className="w-full">
              Apply Color
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
