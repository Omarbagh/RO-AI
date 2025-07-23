import React from "react";
import { CheckCircle } from "lucide-react";
import { stepIcons } from "../types/templateTypes";

export function AnimatedStepIndicator({
  steps,
  currentStep,
}: {
  steps: string[];
  currentStep: number;
}) {
  return (
    <div className="relative">
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200"></div>
      <div
        className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700 ease-out"
        style={{
          width: `${(currentStep / (steps.length - 1)) * 100}%`,
        }}
      ></div>
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const Icon = stepIcons[index];
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          return (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 border-transparent text-white shadow-lg scale-110"
                    : isCurrent
                      ? "bg-white border-indigo-500 text-indigo-500 shadow-lg scale-110 animate-pulse"
                      : "bg-gray-100 border-gray-300 text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>
              <span
                className={`text-xs mt-2 font-medium transition-colors duration-300 ${
                  isCompleted || isCurrent ? "text-indigo-600" : "text-gray-400"
                }`}
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
