import { useState } from "react";
import Header from "@/components/Header";
import { useLanguage } from "@/i18n/LanguageContext";
import { temples } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, IndianRupee, QrCode, CheckCircle2, Gift, Flame, BookOpen, Utensils } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const presetAmounts = [101, 251, 501, 1001, 2501, 5001];

interface DonationRecord {
  id: string;
  templeName: string;
  amount: number;
  purpose: string;
  date: string;
  txnId: string;
}

const Donation = () => {
  const { t } = useLanguage();

  const donationPurposes = [
    { id: "general", label: t("donation.general"), icon: Heart, desc: t("donation.generalDesc") },
    { id: "annadaan", label: t("donation.annadaan"), icon: Utensils, desc: t("donation.annadaanDesc") },
    { id: "pooja", label: t("donation.pooja"), icon: Flame, desc: t("donation.poojaDesc") },
    { id: "education", label: t("donation.education"), icon: BookOpen, desc: t("donation.educationDesc") },
    { id: "festival", label: t("donation.festival"), icon: Gift, desc: t("donation.festivalDesc") },
  ];

  const [selectedTemple, setSelectedTemple] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [customAmount, setCustomAmount] = useState("");
  const [purpose, setPurpose] = useState("general");
  const [donorName, setDonorName] = useState("");
  const [step, setStep] = useState<"form" | "payment" | "success">("form");
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [currentTxn, setCurrentTxn] = useState("");

  const finalAmount = amount || Number(customAmount) || 0;
  const selectedTempleObj = temples.find((tp) => tp.id === selectedTemple);
  const selectedPurpose = donationPurposes.find((p) => p.id === purpose);

  const handleProceed = () => {
    if (!selectedTemple) { toast({ title: t("donation.selectTemple"), variant: "destructive" }); return; }
    if (finalAmount < 1) { toast({ title: t("donation.enterAmount"), variant: "destructive" }); return; }
    if (!donorName.trim()) { toast({ title: t("donation.yourName"), variant: "destructive" }); return; }
    setStep("payment");
  };

  const handlePayment = () => {
    const txnId = `TXN${Date.now().toString(36).toUpperCase()}`;
    setCurrentTxn(txnId);
    const record: DonationRecord = {
      id: `d-${Date.now()}`,
      templeName: selectedTempleObj?.name || "",
      amount: finalAmount,
      purpose: selectedPurpose?.label || "",
      date: new Date().toLocaleDateString(),
      txnId,
    };
    setDonations((prev) => [record, ...prev]);
    setStep("success");
    toast({ title: t("donation.success"), description: `₹${finalAmount} ${t("donation.to")} ${selectedTempleObj?.name}` });
  };

  const resetForm = () => {
    setStep("form");
    setAmount("");
    setCustomAmount("");
    setSelectedTemple("");
    setDonorName("");
    setPurpose("general");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-10">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">{t("donation.title")}</h1>
          <p className="mt-1 text-muted-foreground">{t("donation.subtitle")}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {step === "form" && (
              <div className="space-y-6">
                <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <h2 className="font-display text-lg font-semibold text-foreground">{t("donation.selectTemple")}</h2>
                  <select
                    value={selectedTemple}
                    onChange={(e) => setSelectedTemple(e.target.value)}
                    className="mt-3 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">{t("donation.chooseTemple")}</option>
                    {temples.map((tp) => (
                      <option key={tp.id} value={tp.id}>{tp.name} – {tp.location}</option>
                    ))}
                  </select>
                </div>

                <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <h2 className="font-display text-lg font-semibold text-foreground">{t("donation.purpose")}</h2>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {donationPurposes.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPurpose(p.id)}
                        className={`flex items-start gap-3 rounded-lg border p-4 text-left transition-all ${
                          purpose === p.id ? "border-primary bg-primary/5 ring-2 ring-ring" : "border-border hover:border-primary/40"
                        }`}
                      >
                        <p.icon className={`mt-0.5 h-5 w-5 shrink-0 ${purpose === p.id ? "text-primary" : "text-muted-foreground"}`} />
                        <div>
                          <p className="text-sm font-medium text-foreground">{p.label}</p>
                          <p className="text-xs text-muted-foreground">{p.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <h2 className="font-display text-lg font-semibold text-foreground">{t("donation.amount")}</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {presetAmounts.map((a) => (
                      <button
                        key={a}
                        onClick={() => { setAmount(a); setCustomAmount(""); }}
                        className={`rounded-lg border px-5 py-2.5 text-sm font-medium transition-all ${
                          amount === a ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:border-primary/40"
                        }`}
                      >
                        ₹{a.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{t("donation.customAmount")}</span>
                    <div className="relative flex-1">
                      <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="number"
                        placeholder={t("donation.enterAmount")}
                        value={customAmount}
                        onChange={(e) => { setCustomAmount(e.target.value); setAmount(""); }}
                        className="w-full rounded-lg border border-input bg-background py-2.5 pl-9 pr-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <h2 className="font-display text-lg font-semibold text-foreground">{t("donation.donorDetails")}</h2>
                  <input
                    type="text"
                    placeholder={t("donation.yourName")}
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="mt-3 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <Button onClick={handleProceed} size="lg" className="w-full gap-2 gradient-saffron border-0 text-primary-foreground hover:opacity-90 text-base">
                  <IndianRupee className="h-5 w-5" /> {t("donation.proceed")} ₹{finalAmount > 0 ? finalAmount.toLocaleString() : "..."}
                </Button>
              </div>
            )}

            {step === "payment" && (
              <div className="rounded-xl border border-border bg-card p-8 shadow-card text-center space-y-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <QrCode className="h-8 w-8 text-primary" />
                </div>
                <h2 className="font-display text-xl font-bold text-foreground">{t("donation.scanPay")}</h2>
                <p className="text-muted-foreground">{t("donation.donating")} <span className="font-semibold text-foreground">₹{finalAmount.toLocaleString()}</span> {t("donation.to")} <span className="font-semibold text-foreground">{selectedTempleObj?.name}</span></p>
                <p className="text-sm text-muted-foreground">{t("donation.purpose_label")} {selectedPurpose?.label}</p>

                <div className="mx-auto flex h-52 w-52 items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted">
                  <div className="text-center">
                    <QrCode className="mx-auto h-20 w-20 text-muted-foreground/50" />
                    <p className="mt-2 text-xs text-muted-foreground">{t("donation.upiQr")}</p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">{t("donation.payTo")} <span className="font-mono font-medium text-foreground">darshanease@upi</span></p>

                <div className="flex gap-3 justify-center">
                  <Button variant="outline" onClick={() => setStep("form")}>{t("donation.back")}</Button>
                  <Button onClick={handlePayment} className="gap-2 gradient-saffron border-0 text-primary-foreground hover:opacity-90">
                    <CheckCircle2 className="h-4 w-4" /> {t("donation.completed")}
                  </Button>
                </div>
              </div>
            )}

            {step === "success" && (
              <div className="rounded-xl border border-border bg-card p-8 shadow-card text-center space-y-5">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle2 className="h-10 w-10 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground">{t("donation.success")}</h2>
                <p className="text-muted-foreground">{t("donation.thankYou")} <span className="font-semibold text-foreground">{donorName}</span> 🙏</p>
                <div className="mx-auto max-w-sm rounded-lg border border-border bg-muted/50 p-4 text-sm space-y-1">
                  <p><span className="text-muted-foreground">{t("donation.temple")}</span> <span className="font-medium text-foreground">{selectedTempleObj?.name}</span></p>
                  <p><span className="text-muted-foreground">{t("donation.amountLabel")}</span> <span className="font-medium text-foreground">₹{finalAmount.toLocaleString()}</span></p>
                  <p><span className="text-muted-foreground">{t("donation.purpose_label")}</span> <span className="font-medium text-foreground">{selectedPurpose?.label}</span></p>
                  <p><span className="text-muted-foreground">{t("donation.txnId")}</span> <span className="font-mono text-foreground">{currentTxn}</span></p>
                </div>
                <p className="text-xs text-muted-foreground">{t("donation.receipt")}</p>
                <Button onClick={resetForm} className="gradient-saffron border-0 text-primary-foreground hover:opacity-90">{t("donation.makeAnother")}</Button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-display text-lg font-semibold text-foreground">{t("donation.history")}</h3>
              {donations.length === 0 ? (
                <p className="mt-4 text-sm text-muted-foreground">{t("donation.noDonations")}</p>
              ) : (
                <div className="mt-4 space-y-3">
                  {donations.map((d) => (
                    <div key={d.id} className="rounded-lg border border-border bg-muted/30 p-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-foreground">{d.templeName}</p>
                        <Badge variant="secondary" className="text-xs">₹{d.amount.toLocaleString()}</Badge>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{d.purpose} · {d.date}</p>
                      <p className="text-xs font-mono text-muted-foreground">{d.txnId}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-display text-base font-semibold text-foreground">{t("donation.whyDonate")}</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>• {t("donation.reason1")}</li>
                <li>• {t("donation.reason2")}</li>
                <li>• {t("donation.reason3")}</li>
                <li>• {t("donation.reason4")}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donation;