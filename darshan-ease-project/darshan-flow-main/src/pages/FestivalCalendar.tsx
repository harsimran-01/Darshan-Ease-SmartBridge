import Header from "@/components/Header";
import { useLanguage } from "@/i18n/LanguageContext";
import { temples } from "@/data/mockData";
import { Calendar, MapPin, Star } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface Festival {
  id: string;
  name: string;
  templeId: string;
  date: string;
  month: string;
  description: string;
  expectedCrowd: "moderate" | "high" | "extreme";
  specialRituals: string[];
}

const festivals: Festival[] = [
  { id: "f1", name: "Meenakshi Thirukalyanam", templeId: "1", date: "April 14-25", month: "April", description: "The grand celestial wedding of Goddess Meenakshi and Lord Sundareswarar, a 12-day celebration.", expectedCrowd: "extreme", specialRituals: ["Chariot procession", "Celestial wedding", "Float festival"] },
  { id: "f2", name: "Guru Nanak Jayanti", templeId: "2", date: "November 15", month: "November", description: "Birth anniversary of Guru Nanak Dev Ji, the founder of Sikhism. 48-hour Akhand Path recitation.", expectedCrowd: "extreme", specialRituals: ["Akhand Path", "Nagar Kirtan", "Special Langar"] },
  { id: "f3", name: "Maha Shivaratri", templeId: "3", date: "February 26", month: "February", description: "The great night of Lord Shiva, observed with night-long prayers and abhishekam.", expectedCrowd: "high", specialRituals: ["Night vigil", "Abhishekam", "Special Pooja"] },
  { id: "f4", name: "Brahmotsavam", templeId: "4", date: "September 27 - Oct 5", month: "September", description: "The annual 9-day grand festival at Tirumala with chariot processions and special sevas.", expectedCrowd: "extreme", specialRituals: ["Garuda Seva", "Rathotsavam", "Chakra Snanam"] },
  { id: "f5", name: "Navratri", templeId: "5", date: "October 3-11", month: "October", description: "Nine nights of worship dedicated to Goddess Durga at the mountain shrine.", expectedCrowd: "extreme", specialRituals: ["Special Aarti", "Jagran", "Bhavan decoration"] },
  { id: "f6", name: "Dev Deepawali", templeId: "6", date: "November 27", month: "November", description: "The festival of lights on the Ganges ghats, celebrated 15 days after Diwali.", expectedCrowd: "high", specialRituals: ["Ghat illumination", "Ganga Aarti", "Deep Daan"] },
  { id: "f7", name: "Rath Yatra", templeId: "7", date: "July 7", month: "July", description: "The famous chariot festival where deities ride massive wooden chariots through the city.", expectedCrowd: "extreme", specialRituals: ["Chariot pulling", "Pahandi", "Chhera Pahanra"] },
  { id: "f8", name: "Baisakhi", templeId: "8", date: "April 13", month: "April", description: "Sikh New Year and harvest festival, marking the founding of the Khalsa.", expectedCrowd: "high", specialRituals: ["Nagar Kirtan", "Gatka display", "Special Langar"] },
  { id: "f9", name: "Kartik Purnima", templeId: "9", date: "November 15", month: "November", description: "Full moon celebrations with a spectacular light & sound show at the seaside temple.", expectedCrowd: "high", specialRituals: ["Light & Sound show", "Special Aarti", "Deep Daan"] },
  { id: "f10", name: "Ganesh Chaturthi", templeId: "10", date: "September 7", month: "September", description: "The grand 10-day celebration of Lord Ganesha's birth at the Siddhivinayak Temple.", expectedCrowd: "extreme", specialRituals: ["Modak offering", "Aarti", "Visarjan procession"] },
];

const months = ["All", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const crowdColors: Record<string, string> = {
  moderate: "bg-[hsl(var(--crowd-low))] text-primary-foreground",
  high: "bg-[hsl(var(--crowd-medium))] text-foreground",
  extreme: "bg-[hsl(var(--crowd-high))] text-primary-foreground",
};

const FestivalCalendar = () => {
  const { t } = useLanguage();
  const [selectedMonth, setSelectedMonth] = useState("All");

  const filtered = selectedMonth === "All" ? festivals : festivals.filter((f) => f.month === selectedMonth);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-10">
        <h1 className="font-display text-3xl font-bold text-foreground">{t("festival.title")}</h1>
        <p className="mt-1 text-muted-foreground">{t("festival.subtitle")}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {months.map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMonth(m)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                selectedMonth === m ? "gradient-saffron text-primary-foreground" : "border border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {m === "All" ? t("festival.all") : m}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          {filtered.map((festival) => {
            const temple = temples.find((tp) => tp.id === festival.templeId);
            return (
              <div key={festival.id} className="rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-elevated">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-lg font-semibold text-foreground">{festival.name}</h3>
                      <Badge className={crowdColors[festival.expectedCrowd]}>{festival.expectedCrowd} {t("festival.crowd")}</Badge>
                    </div>
                    <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" /> {temple?.name} — {temple?.location}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">{festival.description}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">{festival.date}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {festival.specialRituals.map((r) => (
                    <span key={r} className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      <Star className="h-3 w-3" /> {r}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && <p className="py-12 text-center text-muted-foreground">{t("festival.noFestivals")}</p>}
        </div>
      </div>
    </div>
  );
};

export default FestivalCalendar;