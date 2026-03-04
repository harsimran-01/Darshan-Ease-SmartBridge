import { useState } from "react";
import Header from "@/components/Header";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { temples } from "@/data/mockData";
import { prasadItems } from "@/data/prasadData";
import { ShoppingBag, Package, Truck, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const PrasadBooking = () => {
  const { t } = useLanguage();
  const [selectedTemple, setSelectedTemple] = useState(temples[0].id);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [deliveryMode, setDeliveryMode] = useState<"pickup" | "deliver">("pickup");
  const [ordered, setOrdered] = useState(false);

  const templeItems = prasadItems.filter((p) => p.templeId === selectedTemple);
  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = prasadItems.find((p) => p.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const addToCart = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const removeFromCart = (id: string) =>
    setCart((c) => {
      const next = { ...c };
      if (next[id] > 1) next[id]--;
      else delete next[id];
      return next;
    });

  const handleOrder = () => {
    if (Object.keys(cart).length === 0) return;
    setOrdered(true);
    toast({ title: t("prasad.orderConfirmed"), description: `₹${total} — ${deliveryMode === "deliver" ? t("prasad.deliver") : t("prasad.pickup")}` });
  };

  if (ordered) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container flex flex-col items-center justify-center py-20 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Check className="h-10 w-10 text-primary" />
          </div>
          <h2 className="mt-6 font-display text-2xl font-bold text-foreground">{t("prasad.orderConfirmed")}</h2>
          <p className="mt-2 text-muted-foreground">{t("prasad.orderConfirmedDesc")}</p>
          <Button onClick={() => { setOrdered(false); setCart({}); }} className="mt-6 gradient-saffron border-0 text-primary-foreground">
            {t("prasad.orderMore")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-10">
        <div className="flex items-center gap-3">
          <ShoppingBag className="h-7 w-7 text-primary" />
          <h1 className="font-display text-3xl font-bold text-foreground">{t("prasad.title")}</h1>
        </div>
        <p className="mt-2 text-muted-foreground">{t("prasad.subtitle")}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {temples.map((tp) => (
            <button
              key={tp.id}
              onClick={() => setSelectedTemple(tp.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedTemple === tp.id
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {tp.name}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
            {templeItems.map((item) => (
              <div key={item.id} className="rounded-xl border border-border bg-card p-5 shadow-card">
                <div className="text-3xl">{item.emoji}</div>
                <h3 className="mt-2 font-display text-lg font-semibold text-foreground">{item.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-display text-lg font-bold text-primary">₹{item.price}</span>
                  {cart[item.id] ? (
                    <div className="flex items-center gap-2">
                      <button onClick={() => removeFromCart(item.id)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-foreground hover:bg-muted">−</button>
                      <span className="w-6 text-center font-medium text-foreground">{cart[item.id]}</span>
                      <button onClick={() => addToCart(item.id)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-foreground hover:bg-muted">+</button>
                    </div>
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => addToCart(item.id)}>{t("prasad.add")}</Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-card h-fit sticky top-24">
            <h3 className="font-display text-lg font-semibold text-foreground">{t("prasad.cart")}</h3>
            {Object.keys(cart).length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">{t("prasad.noItems")}</p>
            ) : (
              <div className="mt-4 space-y-3">
                {Object.entries(cart).map(([id, qty]) => {
                  const item = prasadItems.find((p) => p.id === id)!;
                  return (
                    <div key={id} className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{item.emoji} {item.name} × {qty}</span>
                      <span className="font-medium text-foreground">₹{item.price * qty}</span>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-4 border-t border-border pt-4">
              <div className="flex items-center justify-between font-display font-bold text-foreground">
                <span>{t("prasad.total")}</span>
                <span className="text-primary">₹{total}</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                onClick={() => setDeliveryMode("pickup")}
                className={`flex items-center justify-center gap-1.5 rounded-lg border p-2.5 text-xs font-medium transition-colors ${
                  deliveryMode === "pickup" ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground"
                }`}
              >
                <Package className="h-3.5 w-3.5" /> {t("prasad.pickup")}
              </button>
              <button
                onClick={() => setDeliveryMode("deliver")}
                className={`flex items-center justify-center gap-1.5 rounded-lg border p-2.5 text-xs font-medium transition-colors ${
                  deliveryMode === "deliver" ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground"
                }`}
              >
                <Truck className="h-3.5 w-3.5" /> {t("prasad.deliver")}
              </button>
            </div>

            <Button
              onClick={handleOrder}
              disabled={Object.keys(cart).length === 0}
              className="mt-4 w-full gradient-saffron border-0 text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
              {t("prasad.order")} — ₹{total}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrasadBooking;