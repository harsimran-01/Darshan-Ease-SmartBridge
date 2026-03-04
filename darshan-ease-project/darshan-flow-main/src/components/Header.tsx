import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LayoutDashboard, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import NotificationBell from "@/components/NotificationBell";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, logout, isAdmin } = useAuth();

  const navItems = [
    { label: t("nav.home"), path: "/" },
    { label: t("nav.temples"), path: "/temples" },
    { label: t("nav.bookings"), path: "/bookings" },
    { label: t("nav.prasad"), path: "/prasad" },
    { label: t("nav.parking"), path: "/parking" },
    { label: "Festivals", path: "/festivals" },
    { label: "Feedback", path: "/feedback" },
    { label: "🪔 Donate", path: "/donate" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-saffron">
            <span className="text-lg font-bold text-primary-foreground">🙏</span>
          </div>
          <span className="font-display text-xl font-bold text-foreground">Darshan Ease</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <NotificationBell />
          <LanguageSwitcher />

          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin">
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Shield className="h-4 w-4" />
                    {t("nav.admin")}
                  </Button>
                </Link>
              )}
              <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-1.5">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-xs">
                  <p className="font-medium text-foreground">{user.name}</p>
                  <p className="text-muted-foreground capitalize">{user.role}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1.5 text-muted-foreground hover:text-destructive">
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Link to="/admin">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <LayoutDashboard className="h-4 w-4" />
                  {t("nav.admin")}
                </Button>
              </Link>
              <Link to="/login">
                <Button size="sm" className="gap-1.5 gradient-saffron border-0 text-primary-foreground hover:opacity-90">
                  <User className="h-4 w-4" />
                  {t("nav.login")}
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-card p-4 lg:hidden">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2">
              <LanguageSwitcher />
            </div>

            {user ? (
              <>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-4 py-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                  </div>
                </div>
                {isAdmin && (
                  <Link to="/admin" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full gap-1.5">
                      <Shield className="h-4 w-4" /> {t("nav.admin")}
                    </Button>
                  </Link>
                )}
                <Button variant="outline" size="sm" onClick={() => { handleLogout(); setMobileOpen(false); }} className="w-full gap-1.5 text-destructive">
                  <LogOut className="h-4 w-4" /> Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/admin" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full gap-1.5">
                    <LayoutDashboard className="h-4 w-4" /> {t("nav.admin")}
                  </Button>
                </Link>
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button size="sm" className="w-full gap-1.5 gradient-saffron border-0 text-primary-foreground">
                    <User className="h-4 w-4" /> {t("nav.login")}
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
