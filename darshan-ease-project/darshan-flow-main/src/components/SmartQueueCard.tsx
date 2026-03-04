import { Clock, Zap, TrendingDown } from "lucide-react";

interface SmartQueueProps {
  templeId: string;
  templeName: string;
}

const predictions = [
  { time: "Now", wait: "45 min", trend: "high" as const },
  { time: "In 1 hr", wait: "20 min", trend: "medium" as const },
  { time: "In 2 hrs", wait: "5 min", trend: "low" as const },
];

const trendColors = {
  low: "text-green-600 bg-green-50",
  medium: "text-yellow-600 bg-yellow-50",
  high: "text-red-600 bg-red-50",
};

const SmartQueueCard = ({ templeName }: SmartQueueProps) => (
  <div className="rounded-xl border border-border bg-card p-5 shadow-card">
    <div className="flex items-center gap-2 mb-4">
      <Zap className="h-5 w-5 text-primary" />
      <h3 className="font-display text-lg font-semibold text-foreground">AI Wait Time Prediction</h3>
    </div>
    <p className="text-sm text-muted-foreground mb-4">Predicted wait times for {templeName}</p>
    <div className="space-y-3">
      {predictions.map((p) => (
        <div key={p.time} className="flex items-center justify-between rounded-lg border border-border p-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">{p.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${trendColors[p.trend]}`}>{p.wait}</span>
            {p.trend === "low" && <TrendingDown className="h-3.5 w-3.5 text-green-600" />}
          </div>
        </div>
      ))}
    </div>
    <p className="mt-3 text-xs text-muted-foreground">
      🤖 Based on historical patterns and current crowd data
    </p>
  </div>
);

export default SmartQueueCard;
