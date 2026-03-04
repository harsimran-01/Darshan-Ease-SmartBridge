import { cn } from "@/lib/utils";

interface CrowdIndicatorProps {
  level: "low" | "medium" | "high";
  showLabel?: boolean;
  size?: "sm" | "md";
}

const config = {
  low: { label: "Low Crowd", colorClass: "bg-crowd-low", waitTime: "~5 min" },
  medium: { label: "Medium Crowd", colorClass: "bg-crowd-medium", waitTime: "~20 min" },
  high: { label: "High Crowd", colorClass: "bg-crowd-high", waitTime: "~45 min" },
};

const CrowdIndicator = ({ level, showLabel = true, size = "md" }: CrowdIndicatorProps) => {
  const { label, colorClass, waitTime } = config[level];
  return (
    <div className="flex items-center gap-2">
      <span className={cn("rounded-full animate-pulse", colorClass, size === "sm" ? "h-2.5 w-2.5" : "h-3.5 w-3.5")} />
      {showLabel && (
        <div className="flex flex-col">
          <span className={cn("font-medium leading-tight", size === "sm" ? "text-xs" : "text-sm")}>{label}</span>
          <span className="text-xs text-muted-foreground">Wait: {waitTime}</span>
        </div>
      )}
    </div>
  );
};

export default CrowdIndicator;
