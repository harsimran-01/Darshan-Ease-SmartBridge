import { QRCodeSVG } from "qrcode.react";
import { LocalBooking } from "@/contexts/BookingContext";
import { Calendar, Clock, MapPin, Crown, Heart, Users } from "lucide-react";

const QRTicket = ({ booking }: { booking: LocalBooking }) => {
  const TypeIcon = booking.bookingType === "vip" ? Crown : booking.bookingType === "senior" ? Heart : Users;
  const typeLabel = booking.bookingType === "vip" ? "VIP" : booking.bookingType === "senior" ? "Senior" : "Regular";

  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border border-border bg-card shadow-elevated">
      <div className="gradient-saffron px-6 py-5 text-center text-primary-foreground">
        <h3 className="font-display text-xl font-bold">Darshan Ticket</h3>
        <p className="mt-1 text-sm opacity-90">{booking.templeName}</p>
      </div>

      <div className="flex flex-col items-center px-6 py-6">
        <div className="rounded-xl border-2 border-border bg-white p-3">
          <QRCodeSVG value={booking.qrData} size={150} level="H" includeMargin />
        </div>
        <p className="mt-2 font-mono text-xs text-muted-foreground">Scan at Gate</p>

        <div className="mt-6 w-full space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Date:</span>
            <span className="ml-auto font-medium text-foreground">{booking.date}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Time:</span>
            <span className="ml-auto font-medium text-foreground">{booking.startTime} - {booking.endTime}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Location:</span>
            <span className="ml-auto font-medium text-foreground">{booking.templeLocation}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <TypeIcon className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Type:</span>
            <span className="ml-auto font-medium text-foreground">{typeLabel}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-dashed border-border px-6 py-3 text-center">
        <p className="text-xs text-muted-foreground">
          Booking ID: <span className="font-mono font-medium">{booking.id}</span>
        </p>
      </div>
    </div>
  );
};

export default QRTicket;
