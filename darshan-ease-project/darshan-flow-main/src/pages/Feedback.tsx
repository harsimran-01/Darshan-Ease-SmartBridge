import Header from "@/components/Header";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { temples } from "@/data/mockData";
import { Star, Send, MessageSquare } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Feedback = () => {
  const { t } = useLanguage();
  const [templeId, setTempleId] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState<{ temple: string; rating: number; comment: string }[]>([]);

  const handleSubmit = () => {
    if (!templeId || rating === 0) {
      toast({ title: t("feedback.selectTemple"), variant: "destructive" });
      return;
    }
    const temple = temples.find((tp) => tp.id === templeId);
    setSubmitted((prev) => [{ temple: temple?.name || "", rating, comment }, ...prev]);
    toast({ title: "🙏", description: t("feedback.submit") });
    setRating(0);
    setComment("");
    setTempleId("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-10">
        <h1 className="font-display text-3xl font-bold text-foreground">{t("feedback.title")}</h1>
        <p className="mt-1 text-muted-foreground">{t("feedback.subtitle")}</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h3 className="font-display text-lg font-semibold text-foreground">{t("feedback.writeReview")}</h3>

            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">{t("feedback.selectTemple")}</label>
                <select
                  value={templeId}
                  onChange={(e) => setTempleId(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground"
                >
                  <option value="">{t("feedback.chooseTemple")}</option>
                  {temples.map((tp) => (
                    <option key={tp.id} value={tp.id}>{tp.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">{t("feedback.yourRating")}</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      onMouseEnter={() => setHoveredStar(s)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={() => setRating(s)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          s <= (hoveredStar || rating) ? "fill-primary text-primary" : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">{t("feedback.comments")}</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  placeholder={t("feedback.placeholder")}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <Button onClick={handleSubmit} className="w-full gap-2 gradient-saffron border-0 text-primary-foreground hover:opacity-90">
                <Send className="h-4 w-4" /> {t("feedback.submit")}
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">
              <MessageSquare className="mr-2 inline h-5 w-5 text-primary" />
              {t("feedback.recentReviews")}
            </h3>
            {submitted.length === 0 ? (
              <div className="rounded-xl border border-border bg-card p-8 text-center">
                <p className="text-muted-foreground">{t("feedback.noReviews")}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {submitted.map((r, i) => (
                  <div key={i} className="rounded-xl border border-border bg-card p-4 shadow-card">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-foreground">{r.temple}</p>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={`h-4 w-4 ${s <= r.rating ? "fill-primary text-primary" : "text-muted"}`} />
                        ))}
                      </div>
                    </div>
                    {r.comment && <p className="mt-2 text-sm text-muted-foreground">{r.comment}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;