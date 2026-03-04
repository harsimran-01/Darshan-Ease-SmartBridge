import Header from "@/components/Header";
import TempleCard from "@/components/TempleCard";
import { temples } from "@/data/mockData";
import { useLanguage } from "@/i18n/LanguageContext";
import { Search } from "lucide-react";
import { useState } from "react";

const Temples = () => {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [stateFilter, setStateFilter] = useState("All States");

  const types = [
    { value: "all", label: t("temples.allPlaces") },
    { value: "temple", label: t("temples.temples") },
    { value: "gurudwara", label: t("temples.gurudwaras") },
  ];

  const states = [t("temples.allStates"), ...Array.from(new Set(temples.map((tp) => tp.state)))];

  const filtered = temples.filter((tp) => {
    const matchesSearch = tp.name.toLowerCase().includes(search.toLowerCase()) || tp.location.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || tp.type === typeFilter;
    const matchesState = stateFilter === t("temples.allStates") || stateFilter === "All States" || tp.state === stateFilter;
    return matchesSearch && matchesType && matchesState;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-10">
        <h1 className="font-display text-3xl font-bold text-foreground">{t("temples.title")}</h1>
        <p className="mt-1 text-muted-foreground">{temples.length} {t("temples.subtitle")}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("temples.search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-input bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground"
          >
            {types.map((tp) => <option key={tp.value} value={tp.value}>{tp.label}</option>)}
          </select>
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground"
          >
            {states.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">{filtered.length} {t("temples.found")}</p>

        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((temple) => (
            <TempleCard key={temple.id} temple={temple} />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-muted-foreground py-12">{t("temples.noResults")}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Temples;