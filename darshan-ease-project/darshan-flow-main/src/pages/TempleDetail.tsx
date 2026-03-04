import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { MapPin, DoorOpen, Car, Calendar, ArrowLeft, Navigation, Headphones, Users, Crown, Heart } from "lucide-react";
import Header from "@/components/Header";
import CrowdIndicator from "@/components/CrowdIndicator";
import SmartQueueCard from "@/components/SmartQueueCard";
import { Button } from "@/components/ui/button";
import { temples, slots } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";
import { useBookings } from "@/contexts/BookingContext";
import { useAuth } from "@/contexts/AuthContext";

type BookingType = "regular" | "vip" | "senior";

const TempleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const temple = temples.find((t) => t.id === id);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingType, setBookingType] = useState<BookingType>("regular");
  const [groupSize, setGroupSize] = useState(1);
  const [isGroupBooking, setIsGroupBooking] = useState(false);
  const { addBooking } = useBookings();
  const { user } = useAuth();

  if (!temple) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container flex items-center justify-center py-20">
          <p className="text-muted-foreground">Temple not found.</p>
        </div>
      </div>
    );
  }

  const templeSlots = slots.filter((s) => s.templeId === temple.id && s.date === selectedDate);

  const handleBook = () => {
    if (!selectedSlot) return;
    const slot = templeSlots.find((s) => s.id === selectedSlot);
    if (!slot) return;

    const booking = addBooking({
      templeId: temple.id,
      templeName: temple.name,
      templeLocation: temple.location,
      slotId: selectedSlot,
      date: selectedDate,
      startTime: slot.startTime,
      endTime: slot.endTime,
      bookingType,
      isGroupBooking,
      groupSize: isGroupBooking ? groupSize : 1,
      devoteeName: user?.name,
      devoteeEmail: user?.email,
    });

    toast({
      title: "Booking Confirmed! 🎉",
      description: `Your QR ticket for ${temple.name} is ready.`,
    });
    navigate("/booking-confirmation");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img src={temple.image} alt={temple.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute bottom-6 left-6">
          <h1 className="font-display text-3xl font-bold text-primary-foreground">{temple.name}</h1>
          <p className="mt-1 flex items-center gap-1 text-primary-foreground/80">
            <MapPin className="h-4 w-4" /> {temple.location}
          </p>
        </div>
      </div>

      <div className="container py-8">
        <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Info Column */}
          <div className="lg:col-span-1 space-y-4">
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <h3 className="font-display text-lg font-semibold text-foreground">Temple Info</h3>
              <p className="mt-2 text-sm text-muted-foreground">{temple.description}</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DoorOpen className="h-4 w-4 text-primary" /> {temple.entryGates} Entry Gates
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Car className="h-4 w-4 text-primary" /> {temple.parkingInfo}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Link to={`/temples/${temple.id}/navigate`} className="flex items-center gap-2 rounded-lg border border-border bg-card p-3 text-sm font-medium text-foreground hover:border-primary/40 transition-colors">
                <Navigation className="h-4 w-4 text-primary" /> Temple Map
              </Link>
              <Link to={`/temples/${temple.id}/audio-guide`} className="flex items-center gap-2 rounded-lg border border-border bg-card p-3 text-sm font-medium text-foreground hover:border-primary/40 transition-colors">
                <Headphones className="h-4 w-4 text-primary" /> Audio Guide
              </Link>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">Booking Type</h3>
              <div className="space-y-2">
                {([
                  { value: "regular", label: "Regular Darshan", icon: Users, desc: "Standard queue entry" },
                  { value: "vip", label: "VIP Pass", icon: Crown, desc: "Priority entry, shorter queue" },
                  { value: "senior", label: "Senior Citizen", icon: Heart, desc: "Dedicated queue for 60+ age" },
                ] as const).map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setBookingType(type.value)}
                    className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all ${
                      bookingType === type.value ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-primary/40"
                    }`}
                  >
                    <type.icon className={`h-5 w-5 ${bookingType === type.value ? "text-primary" : "text-muted-foreground"}`} />
                    <div>
                      <p className="text-sm font-medium text-foreground">{type.label}</p>
                      <p className="text-xs text-muted-foreground">{type.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-lg font-semibold text-foreground">Group Booking</h3>
                <button
                  onClick={() => setIsGroupBooking(!isGroupBooking)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isGroupBooking ? "bg-primary" : "bg-muted"}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-primary-foreground transition-transform ${isGroupBooking ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>
              {isGroupBooking && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Book for multiple devotees at once</p>
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-foreground">Number of devotees:</label>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setGroupSize(Math.max(2, groupSize - 1))} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-foreground hover:bg-muted">−</button>
                      <span className="w-8 text-center font-medium text-foreground">{groupSize}</span>
                      <button onClick={() => setGroupSize(Math.min(50, groupSize + 1))} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-foreground hover:bg-muted">+</button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">💡 Groups of 10+ get a dedicated guide</p>
                </div>
              )}
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
              <h4 className="text-sm font-semibold text-primary">🤖 AI Recommendation</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                Based on trends, <strong>10:00 - 11:00 AM</strong> has the lowest crowd. Ideal for elderly devotees.
              </p>
            </div>

            <SmartQueueCard templeId={temple.id} templeName={temple.name} />
          </div>

          {/* Slots Column */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="font-display text-lg font-semibold text-foreground">Available Slots</h3>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="rounded-md border border-input bg-background px-3 py-1.5 text-sm text-foreground"
                  />
                </div>
              </div>

              {templeSlots.length === 0 ? (
                <p className="mt-8 text-center text-sm text-muted-foreground">No slots available for this date.</p>
              ) : (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {templeSlots.map((slot) => {
                    const full = slot.bookedCount >= slot.maxCapacity;
                    const selected = selectedSlot === slot.id;
                    return (
                      <button
                        key={slot.id}
                        disabled={full}
                        onClick={() => setSelectedSlot(selected ? null : slot.id)}
                        className={`flex items-center justify-between rounded-lg border p-4 text-left transition-all ${
                          full
                            ? "cursor-not-allowed border-border bg-muted opacity-60"
                            : selected
                            ? "border-primary bg-primary/5 ring-2 ring-primary"
                            : "border-border bg-card hover:border-primary/40"
                        }`}
                      >
                        <div>
                          <p className="font-medium text-foreground">{slot.startTime} - {slot.endTime}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{slot.bookedCount}/{slot.maxCapacity} booked</p>
                        </div>
                        <CrowdIndicator level={slot.crowdLevel} size="sm" />
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="mt-6 space-y-3">
                {selectedSlot && (
                  <div className="rounded-lg bg-primary/5 border border-primary/20 p-3 text-sm text-foreground">
                    <p className="font-medium">📋 Booking Summary</p>
                    <p className="mt-1 text-muted-foreground">
                      Type: <span className="font-medium text-foreground">{bookingType === "vip" ? "VIP Pass" : bookingType === "senior" ? "Senior Citizen" : "Regular"}</span>
                      {isGroupBooking && <> · Group of <span className="font-medium text-foreground">{groupSize}</span></>}
                    </p>
                  </div>
                )}
                <Button
                  onClick={handleBook}
                  disabled={!selectedSlot}
                  className="w-full gradient-saffron border-0 text-primary-foreground hover:opacity-90 disabled:opacity-50"
                >
                  {isGroupBooking ? `Book for ${groupSize} Devotees` : "Confirm Booking"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempleDetail;
