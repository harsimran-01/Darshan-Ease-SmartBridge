import Header from "@/components/Header";
import { useLanguage } from "@/i18n/LanguageContext";
import { temples } from "@/data/mockData";
import { parkingData } from "@/data/parkingData";
import { Car, MapPin } from "lucide-react";

const ParkingStatus = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-10">
        <div className="flex items-center gap-3">
          <Car className="h-7 w-7 text-primary" />
          <h1 className="font-display text-3xl font-bold text-foreground">{t("parking.title")}</h1>
        </div>
        <p className="mt-2 text-muted-foreground">{t("parking.subtitle")}</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {parkingData.map((lot) => {
            const temple = temples.find((tp) => tp.id === lot.templeId);
            const pct = Math.round((lot.occupied / lot.total) * 100);
            const isFull = pct >= 95;
            return (
              <div key={lot.id} className="rounded-xl border border-border bg-card p-5 shadow-card">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">{lot.name}</h3>
                    <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" /> {temple?.name}
                    </p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    isFull ? "bg-crowd-high/20 text-crowd-high" : pct > 70 ? "bg-crowd-medium/20 text-crowd-medium" : "bg-crowd-low/20 text-crowd-low"
                  }`}>
                    {isFull ? t("parking.full") : `${lot.total - lot.occupied} ${t("parking.spots")}`}
                  </span>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>{lot.occupied} / {lot.total}</span>
                    <span>{pct}%</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isFull ? "bg-crowd-high" : pct > 70 ? "bg-crowd-medium" : "bg-crowd-low"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {lot.types.map((type) => (
                    <span key={type} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">{type}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ParkingStatus;