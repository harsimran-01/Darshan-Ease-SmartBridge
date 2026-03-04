import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useLanguage } from "@/i18n/LanguageContext";
import { temples } from "@/data/mockData";
import { ArrowLeft, Navigation, MapPin, Info } from "lucide-react";

const areas = [
  { id: "entrance", label: "Main Entrance", x: 50, y: 90, color: "bg-primary" },
  { id: "sanctum", label: "Sanctum Sanctorum", x: 50, y: 30, color: "bg-crowd-high" },
  { id: "hall", label: "Prayer Hall", x: 50, y: 55, color: "bg-crowd-medium" },
  { id: "shoe", label: "Shoe Counter", x: 15, y: 85, color: "bg-muted-foreground" },
  { id: "prasad", label: "Prasad Counter", x: 85, y: 60, color: "bg-crowd-low" },
  { id: "parking", label: "Parking Area", x: 15, y: 95, color: "bg-muted-foreground" },
  { id: "queue", label: "Queue Start", x: 30, y: 70, color: "bg-crowd-medium" },
  { id: "exit", label: "Exit Gate", x: 85, y: 90, color: "bg-primary" },
];

const TempleNavigation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const temple = temples.find((tp) => tp.id === id);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const activeArea = areas.find((a) => a.id === selectedArea);

  if (!temple) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center text-muted-foreground">Temple not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-10">
        <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div className="flex items-center gap-3">
          <Navigation className="h-7 w-7 text-primary" />
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">{t("navigation.title")}</h1>
            <p className="text-muted-foreground">{temple.name} — {t("navigation.subtitle")}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Map */}
          <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6 shadow-card">
            <div className="relative aspect-[4/3] rounded-lg bg-muted/50 border border-border overflow-hidden">
              {/* Grid lines */}
              <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
                {[20, 40, 60, 80].map((v) => (
                  <g key={v}>
                    <line x1={`${v}%`} y1="0" x2={`${v}%`} y2="100%" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4" />
                    <line x1="0" y1={`${v}%`} x2="100%" y2={`${v}%`} stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4" />
                  </g>
                ))}
              </svg>

              {/* Path */}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <polyline
                  points="50,90 50,70 30,70 30,55 50,55 50,30"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="1"
                  strokeDasharray="2"
                  opacity="0.6"
                />
              </svg>

              {/* Pins */}
              {areas.map((area) => (
                <button
                  key={area.id}
                  onClick={() => setSelectedArea(selectedArea === area.id ? null : area.id)}
                  className={`absolute flex flex-col items-center transition-transform hover:scale-110 ${
                    selectedArea === area.id ? "scale-125 z-10" : ""
                  }`}
                  style={{ left: `${area.x}%`, top: `${area.y}%`, transform: "translate(-50%, -50%)" }}
                >
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full ${area.color} text-primary-foreground shadow-md`}>
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span className="mt-1 rounded bg-card/90 px-1.5 py-0.5 text-[10px] font-medium text-foreground shadow-sm whitespace-nowrap">
                    {area.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Legend / Info */}
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <h3 className="font-display text-lg font-semibold text-foreground">Locations</h3>
              <div className="mt-3 space-y-2">
                {areas.map((area) => (
                  <button
                    key={area.id}
                    onClick={() => setSelectedArea(area.id)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                      selectedArea === area.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <span className={`h-3 w-3 rounded-full ${area.color}`} />
                    {area.label}
                  </button>
                ))}
              </div>
            </div>

            {activeArea && (
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 animate-in fade-in">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold text-primary">{activeArea.label}</h4>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Tap on the map to navigate. Follow the dashed path from entrance to sanctum for the recommended route.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempleNavigation;
