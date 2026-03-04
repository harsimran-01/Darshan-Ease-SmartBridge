import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, Loader2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/i18n/LanguageContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast({ title: t("auth.passwordHint"), variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      await register(name, email, password, Number(age), role);
      toast({ title: `${t("auth.createAccount")} 🙏`, description: `${name}` });
      navigate(role === "admin" ? "/admin" : "/temples");
    } catch (err: any) {
      toast({ title: t("auth.createAccount"), description: err.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container flex items-center justify-center py-16">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-elevated">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl gradient-saffron text-2xl">🙏</div>
            <h1 className="mt-4 font-display text-2xl font-bold text-foreground">{t("auth.createAccount")}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{t("auth.signUpSubtitle")}</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("user")}
                className={`flex items-center justify-center gap-2 rounded-lg border-2 py-3 text-sm font-medium transition-all ${
                  role === "user"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                <User className="h-4 w-4" />
                {t("auth.devotee")}
              </button>
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`flex items-center justify-center gap-2 rounded-lg border-2 py-3 text-sm font-medium transition-all ${
                  role === "admin"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                <Shield className="h-4 w-4" />
                {t("auth.admin")}
              </button>
            </div>

            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                required type="text" placeholder={t("auth.fullName")} value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                required type="email" placeholder={t("auth.email")} value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                required type="password" placeholder={t("auth.passwordHint")} value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="relative">
              <input
                required type="number" placeholder={t("auth.age")} min="1" max="120" value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full rounded-lg border border-input bg-background py-2.5 px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full gradient-saffron border-0 text-primary-foreground hover:opacity-90 gap-2">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>{t("auth.signUpAs")} {role === "admin" ? t("auth.admin") : t("auth.devotee")} <ArrowRight className="h-4 w-4" /></>}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t("auth.haveAccount")}{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">{t("auth.signIn")}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;