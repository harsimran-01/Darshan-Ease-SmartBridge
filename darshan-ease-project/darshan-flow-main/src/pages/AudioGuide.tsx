import { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useLanguage } from "@/i18n/LanguageContext";
import { temples } from "@/data/mockData";
import { audioGuides } from "@/data/audioGuideData";
import { ArrowLeft, Headphones, Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react";

const AudioGuide = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const temple = temples.find((tp) => tp.id === id);
  const guides = audioGuides.filter((g) => g.templeId === id);
  const [activeTrack, setActiveTrack] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const stopInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const togglePlay = () => {
    if (playing) {
      stopInterval();
      setPlaying(false);
    } else {
      setPlaying(true);
      stopInterval();
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            stopInterval();
            setPlaying(false);
            return 0;
          }
          return p + 0.5;
        });
      }, 100);
    }
  };

  const nextTrack = () => {
    stopInterval();
    setActiveTrack((t) => (t + 1) % guides.length);
    setProgress(0);
    setPlaying(false);
  };
  const prevTrack = () => {
    stopInterval();
    setActiveTrack((t) => (t - 1 + guides.length) % guides.length);
    setProgress(0);
    setPlaying(false);
  };
  const current = guides[activeTrack];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-10">
        <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div className="flex items-center gap-3">
          <Headphones className="h-7 w-7 text-primary" />
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">{t("audioguide.title")}</h1>
            <p className="text-muted-foreground">{temple.name}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Player */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              {current && (
                <>
                  <div className="flex items-start gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Volume2 className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground">{current.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{current.duration}</p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{current.description}</p>

                  {/* Progress bar */}
                  <div className="mt-6">
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="mt-4 flex items-center justify-center gap-4">
                    <button onClick={prevTrack} className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground">
                      <SkipBack className="h-4 w-4" />
                    </button>
                    <button
                      onClick={togglePlay}
                      className="flex h-14 w-14 items-center justify-center rounded-full gradient-saffron text-primary-foreground shadow-lg hover:opacity-90"
                    >
                      {playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
                    </button>
                    <button onClick={nextTrack} className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground">
                      <SkipForward className="h-4 w-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Track list */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-card">
            <h3 className="font-display text-lg font-semibold text-foreground">Tracks</h3>
            <div className="mt-3 space-y-1">
              {guides.map((guide, i) => (
                <button
                  key={guide.id}
                  onClick={() => { setActiveTrack(i); setProgress(0); setPlaying(false); }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors ${
                    activeTrack === i ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{guide.title}</p>
                    <p className="text-xs opacity-70">{guide.duration}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioGuide;
