const zones = [
  { name: "Main Sanctum", crowd: 92, x: 45, y: 30 },
  { name: "East Gate", crowd: 65, x: 85, y: 50 },
  { name: "West Gate", crowd: 30, x: 10, y: 50 },
  { name: "Prasad Counter", crowd: 78, x: 60, y: 70 },
  { name: "Parking Area", crowd: 45, x: 20, y: 85 },
  { name: "Shoe Counter", crowd: 55, x: 75, y: 85 },
  { name: "Queue Area", crowd: 88, x: 45, y: 55 },
];

const getColor = (crowd: number) => {
  if (crowd < 40) return "bg-green-500/70";
  if (crowd < 70) return "bg-yellow-500/70";
  return "bg-red-500/70";
};

const HeatmapView = () => (
  <div className="rounded-xl border border-border bg-card p-5 shadow-card">
    <h3 className="font-display text-lg font-semibold text-foreground mb-4">🗺️ Crowd Heatmap</h3>
    <div className="relative aspect-[16/10] rounded-lg bg-muted overflow-hidden">
      {/* Temple outline */}
      <div className="absolute inset-4 rounded-lg border-2 border-dashed border-border" />
      <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-md bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
        Temple Premises
      </div>

      {zones.map((zone) => (
        <div
          key={zone.name}
          className="absolute flex flex-col items-center gap-1 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
        >
          <div className={`h-8 w-8 rounded-full ${getColor(zone.crowd)} animate-pulse flex items-center justify-center`}>
            <span className="text-[10px] font-bold text-white">{zone.crowd}%</span>
          </div>
          <span className="text-[9px] font-medium text-foreground whitespace-nowrap bg-card/80 px-1 rounded">
            {zone.name}
          </span>
        </div>
      ))}
    </div>

    <div className="mt-4 flex items-center justify-center gap-6 text-xs text-muted-foreground">
      <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-green-500" /> Low (&lt;40%)</span>
      <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-yellow-500" /> Medium (40-70%)</span>
      <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-red-500" /> High (&gt;70%)</span>
    </div>
  </div>
);

export default HeatmapView;
