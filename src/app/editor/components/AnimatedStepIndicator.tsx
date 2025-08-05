import React from "react";
import { Check } from "lucide-react";

export function AnimatedStepIndicator({
  steps,
  currentStep,
}: {
  steps: string[];
  currentStep: number;
}) {
  return (
    <div className="relative">
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-100"></div>
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          return (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                    ? "bg-[#ACFFB5] border-transparent text-black shadow-lg scale-110"
                    : isCurrent
                      ? "bg-[#4F46E5] border-white text-white shadow-lg scale-110 animate-pulse"
                      : "bg-gray-100 border-gray-300 text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-lg font-bold">{index + 1}</span>
                )}
              </div>
              <span
                className="text-xs mt-2 font-medium transition-colors duration-300 text-gray-400"
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
