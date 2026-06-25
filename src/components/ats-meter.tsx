import { cn } from "@/lib/utils";

const RADIUS = 36;
const STROKE_WIDTH = 8;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function AtsMeter({ score, size = 84 }: { score: number; size?: number }) {
  const progressColor =
    score >= 80 ? "#1E9E6A" : score >= 50 ? "#D98A1E" : "#DC4B3E";
  const dashOffset = CIRCUMFERENCE * (1 - score / 100);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 84 84">
        <circle
          cx={42}
          cy={42}
          r={RADIUS}
          fill="none"
          stroke="#EEF1F8"
          strokeWidth={STROKE_WIDTH}
        />
        <circle
          cx={42}
          cy={42}
          r={RADIUS}
          fill="none"
          stroke={progressColor}
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          transform="rotate(-90 42 42)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-ink">{score}</span>
        <span className="eyebrow text-[10px] text-subtle">ATS</span>
      </div>
    </div>
  );
}

export function AtsBar({
  label,
  value,
  tone = "accent",
}: {
  label: string;
  value: number;
  tone?: "accent" | "warning" | "success";
}) {
  const fillColor =
    tone === "warning"
      ? "bg-warning"
      : tone === "success"
      ? "bg-success"
      : "bg-primary";

  return (
    <div>
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold text-ink">{value}%</span>
      </div>
      <div className="mt-[7px] h-[7px] rounded bg-[#EEF1F8] overflow-hidden">
        <div className={cn("h-full rounded", fillColor)} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
