import { createContext, useContext, useState, ReactNode } from "react";
import { temples } from "@/data/mockData";

export interface LocalBooking {
  id: string;
  templeId: string;
  templeName: string;
  templeLocation: string;
  slotId: string;
  date: string;
  startTime: string;
  endTime: string;
  bookingType: "regular" | "vip" | "senior";
  isGroupBooking: boolean;
  groupSize: number;
  status: "confirmed" | "cancelled" | "completed";
  qrData: string;
  createdAt: string;
  devoteeEmail?: string;
  devoteeName?: string;
}

interface BookingContextType {
  myBookings: LocalBooking[];
  addBooking: (booking: Omit<LocalBooking, "id" | "qrData" | "createdAt" | "status">) => LocalBooking;
  cancelBooking: (id: string) => void;
  latestBooking: LocalBooking | null;
}

const BookingContext = createContext<BookingContextType>({} as BookingContextType);

export const useBookings = () => useContext(BookingContext);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [myBookings, setMyBookings] = useState<LocalBooking[]>([]);
  const [latestBooking, setLatestBooking] = useState<LocalBooking | null>(null);

  const addBooking = (data: Omit<LocalBooking, "id" | "qrData" | "createdAt" | "status">) => {
    const id = `BK${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const qrData = JSON.stringify({
      bookingId: id,
      temple: data.templeName,
      date: data.date,
      time: `${data.startTime}-${data.endTime}`,
      type: data.bookingType,
      group: data.isGroupBooking ? data.groupSize : 1,
      verified: true,
    });
    const booking: LocalBooking = {
      ...data,
      id,
      qrData,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };
    setMyBookings((prev) => [booking, ...prev]);
    setLatestBooking(booking);
    return booking;
  };

  const cancelBooking = (id: string) => {
    setMyBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b)));
  };

  return (
    <BookingContext.Provider value={{ myBookings, addBooking, cancelBooking, latestBooking }}>
      {children}
    </BookingContext.Provider>
  );
};
