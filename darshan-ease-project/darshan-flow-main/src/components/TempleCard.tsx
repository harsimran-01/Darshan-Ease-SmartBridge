import { Link } from "react-router-dom";
import { MapPin, DoorOpen, Clock } from "lucide-react";
import { Temple } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const typeLabels: Record<string, string> = {
  temple: "🛕 Temple",
  gurudwara: "🙏 Gurudwara",
  mosque: "🕌 Mosque",
  church: "⛪ Church",
};

const TempleCard = ({ temple }: { temple: Temple }) => (
  <div className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all hover:shadow-elevated">
    <div className="relative h-52 overflow-hidden">
      <img
        src={temple.image}
        alt={temple.name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute top-3 left-3">
        <Badge variant="secondary" className="bg-card/80 backdrop-blur-sm text-foreground text-xs">
          {typeLabels[temple.type] || "🛕 Temple"}
        </Badge>
      </div>
      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-card/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
        <DoorOpen className="h-3.5 w-3.5" /> {temple.entryGates} Gates
      </div>
    </div>
    <div className="p-5">
      <h3 className="font-display text-lg font-semibold text-foreground">{temple.name}</h3>
      <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
        <MapPin className="h-3.5 w-3.5" /> {temple.location}
      </p>
      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{temple.description}</p>
      {temple.timings && (
        <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" /> {temple.timings}
        </p>
      )}
      {temple.specialFeature && (
        <p className="mt-1 text-xs font-medium text-primary">✨ {temple.specialFeature}</p>
      )}
      <Link to={`/temples/${temple.id}`}>
        <Button className="mt-4 w-full gradient-saffron border-0 text-primary-foreground hover:opacity-90">
          Book Darshan
        </Button>
      </Link>
    </div>
  </div>
);

export default TempleCard;
