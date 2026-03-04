import { Link } from "react-router-dom";
import { ArrowRight, Clock, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import TempleCard from "@/components/TempleCard";
import { temples } from "@/data/mockData";
import { useLanguage } from "@/i18n/LanguageContext";
import heroImage from "@/assets/hero-temple.jpg";

const Index = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Clock, title: t("hero.feature.booking"), desc: t("hero.feature.bookingDesc") },
    { icon: Users, title: t("hero.feature.crowd"), desc: t("hero.feature.crowdDesc") },
    { icon: Shield, title: t("hero.feature.qr"), desc: t("hero.feature.qrDesc") },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
        <img src={heroImage} alt="Temple at golden hour" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <h1 className="animate-fade-in font-display text-4xl font-bold leading-tight text-primary-foreground sm:text-5xl md:text-6xl">
            {t("hero.title")}
          </h1>
          <p className="mt-4 animate-fade-in text-lg text-primary-foreground/80 [animation-delay:200ms]">
            {t("hero.subtitle")}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center animate-fade-in [animation-delay:400ms]">
            <Link to="/temples">
              <Button size="lg" className="gap-2 gradient-saffron border-0 text-primary-foreground hover:opacity-90 px-8 text-base">
                {t("hero.cta")} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 text-base">
                {t("hero.signin")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-20">
        <h2 className="text-center font-display text-3xl font-bold text-foreground">{t("hero.whyTitle")}</h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-muted-foreground">
          {t("hero.whySubtitle")}
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="group rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-elevated">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg gradient-saffron">
                <f.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Temples */}
      <section className="container pb-20">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-3xl font-bold text-foreground">{t("hero.popularTemples")}</h2>
          <Link to="/temples" className="text-sm font-medium text-primary hover:underline">
            {t("hero.viewAll")}
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {temples.slice(0, 6).map((temple) => (
            <TempleCard key={temple.id} temple={temple} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p className="font-display text-lg font-semibold text-foreground">Darshan Ease</p>
          <p className="mt-1">{t("footer.tagline")}</p>
          <p className="mt-4">{t("footer.rights")}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;