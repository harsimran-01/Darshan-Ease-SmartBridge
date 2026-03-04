import { useNavigate, useSearchParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { Calendar, Clock, MapPin, Users, Crown, Heart, Download, Mail, ArrowLeft, CheckCircle2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { useBookings } from "@/contexts/BookingContext";
import { useAuth } from "@/contexts/AuthContext";

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const { latestBooking } = useBookings();
  const { user } = useAuth();

  if (!latestBooking) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container flex flex-col items-center justify-center py-20 text-center">
          <p className="text-muted-foreground">No booking found.</p>
          <Button onClick={() => navigate("/temples")} className="mt-4">Browse Temples</Button>
        </div>
      </div>
    );
  }

  const b = latestBooking;
  const typeLabel = b.bookingType === "vip" ? "VIP Pass" : b.bookingType === "senior" ? "Senior Citizen" : "Regular Darshan";
  const TypeIcon = b.bookingType === "vip" ? Crown : b.bookingType === "senior" ? Heart : Users;

  const handleDownload = () => {
    const svgEl = document.getElementById("booking-qr");
    if (!svgEl) return;
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      ctx?.drawImage(img, 0, 0, 300, 300);
      const a = document.createElement("a");
      a.download = `darshan-ticket-${b.id}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  const handleShare = async () => {
    const text = `🙏 Darshan Booking Confirmed!\n\n🏛 ${b.templeName}\n📍 ${b.templeLocation}\n📅 ${b.date}\n🕐 ${b.startTime} - ${b.endTime}\n🎫 ${typeLabel}${b.isGroupBooking ? ` (Group of ${b.groupSize})` : ""}\n\n🆔 Booking ID: ${b.id}\n\nPowered by Darshan Ease`;
    if (navigator.share) {
      await navigator.share({ title: "Darshan Booking", text });
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-10">
        <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        {/* Success banner */}
        <div className="mx-auto max-w-lg text-center mb-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 mb-4">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">Booking Confirmed! 🎉</h1>
          <p className="mt-2 text-muted-foreground">Your darshan has been booked successfully. Show the QR code at the temple gate.</p>
        </div>

        {/* Ticket card */}
        <div className="mx-auto max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-elevated">
          {/* Header */}
          <div className="gradient-saffron px-6 py-5 text-center text-primary-foreground">
            <h3 className="font-display text-xl font-bold">🙏 Darshan Ticket</h3>
            <p className="mt-1 text-sm opacity-90">{b.templeName}</p>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center px-6 py-6">
            <div className="rounded-xl border-2 border-border bg-white p-4">
              <QRCodeSVG
                id="booking-qr"
                value={b.qrData}
                size={180}
                level="H"
                includeMargin
                imageSettings={{
                  src: "",
                  height: 0,
                  width: 0,
                  excavate: false,
                }}
              />
            </div>
            <p className="mt-3 font-mono text-xs text-muted-foreground">Scan at Entry Gate</p>

            {/* Details */}
            <div className="mt-6 w-full space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Date:</span>
                <span className="ml-auto font-medium text-foreground">{b.date}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Time Slot:</span>
                <span className="ml-auto font-medium text-foreground">{b.startTime} - {b.endTime}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Location:</span>
                <span className="ml-auto font-medium text-foreground">{b.templeLocation}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <TypeIcon className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Type:</span>
                <span className="ml-auto font-medium text-foreground">{typeLabel}</span>
              </div>
              {b.isGroupBooking && (
                <div className="flex items-center gap-3 text-sm">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Group:</span>
                  <span className="ml-auto font-medium text-foreground">{b.groupSize} devotees</span>
                </div>
              )}
              {user && (
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Booked by:</span>
                  <span className="ml-auto font-medium text-foreground">{user.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-dashed border-border px-6 py-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Booking ID</p>
                <p className="font-mono text-sm font-bold text-foreground">{b.id}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Status</p>
                <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-semibold text-green-600">
                  <CheckCircle2 className="h-3 w-3" /> Confirmed
                </span>
              </div>
            </div>
          </div>

          {/* Simulated email notification */}
          <div className="border-t border-border bg-muted/50 px-6 py-4">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Confirmation sent! 📧</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Booking details & QR ticket sent to <span className="font-medium text-foreground">{user?.email || "your email"}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mx-auto mt-6 flex max-w-md gap-3">
          <Button onClick={handleDownload} variant="outline" className="flex-1 gap-2">
            <Download className="h-4 w-4" /> Download QR
          </Button>
          <Button onClick={handleShare} variant="outline" className="flex-1 gap-2">
            <Share2 className="h-4 w-4" /> Share Ticket
          </Button>
        </div>
        <div className="mx-auto mt-3 max-w-md">
          <Button onClick={() => navigate("/bookings")} className="w-full gradient-saffron border-0 text-primary-foreground hover:opacity-90">
            View All Bookings
          </Button>
        </div>

        {/* Important info */}
        <div className="mx-auto mt-8 max-w-md rounded-xl border border-primary/20 bg-primary/5 p-5">
          <h4 className="text-sm font-semibold text-primary">📋 Important Instructions</h4>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li>• Show this QR code at the temple entry gate</li>
            <li>• Arrive 15 minutes before your slot time</li>
            <li>• Carry a valid ID for verification</li>
            <li>• Cancellation is free up to 2 hours before slot</li>
            {b.isGroupBooking && <li>• All group members must arrive together</li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
