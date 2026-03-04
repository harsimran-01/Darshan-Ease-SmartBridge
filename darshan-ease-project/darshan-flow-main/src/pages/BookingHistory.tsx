import Header from "@/components/Header";
import QRTicket from "@/components/QRTicket";
import { useBookings } from "@/contexts/BookingContext";
import { useLanguage } from "@/i18n/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BookingHistory = () => {
  const { myBookings, cancelBooking } = useBookings();
  const { t } = useLanguage();
  const confirmed = myBookings.filter((b) => b.status === "confirmed");
  const past = myBookings.filter((b) => b.status !== "confirmed");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-10">
        <h1 className="font-display text-3xl font-bold text-foreground">{t("booking.history")}</h1>
        <p className="mt-1 text-muted-foreground">{t("booking.historySubtitle")}</p>

        {myBookings.length === 0 && (
          <div className="mt-16 text-center">
            <p className="text-6xl mb-4">🙏</p>
            <p className="text-lg font-medium text-foreground">{t("booking.noBookings")}</p>
            <p className="text-muted-foreground mt-1">{t("booking.noBookingsDesc")}</p>
            <Link to="/temples">
              <Button className="mt-4 gradient-saffron border-0 text-primary-foreground">{t("booking.browseTemples")}</Button>
            </Link>
          </div>
        )}

        {myBookings.length > 0 && (
          <Tabs defaultValue="upcoming" className="mt-8">
            <TabsList className="bg-muted">
              <TabsTrigger value="upcoming">{t("booking.upcoming")} ({confirmed.length})</TabsTrigger>
              <TabsTrigger value="past">{t("booking.past")} ({past.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="mt-6">
              {confirmed.length === 0 ? (
                <p className="py-12 text-center text-muted-foreground">{t("booking.noUpcoming")}</p>
              ) : (
                <div className="grid gap-8 lg:grid-cols-2">
                  {confirmed.map((b) => (
                    <div key={b.id}>
                      <QRTicket booking={b} />
                      <div className="mx-auto mt-3 max-w-sm">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => cancelBooking(b.id)}
                          className="w-full gap-2 text-destructive hover:bg-destructive/10"
                        >
                          <XCircle className="h-4 w-4" /> {t("booking.cancelBooking")}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="past" className="mt-6">
              {past.length === 0 ? (
                <p className="py-12 text-center text-muted-foreground">{t("booking.noPast")}</p>
              ) : (
                <div className="space-y-4">
                  {past.map((b) => (
                    <div key={b.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-5 shadow-card">
                      <div className="space-y-1">
                        <h3 className="font-display font-semibold text-foreground">{b.templeName}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{b.date}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{b.startTime}-{b.endTime}</span>
                        </div>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                        b.status === "completed" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                      }`}>
                        {b.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;