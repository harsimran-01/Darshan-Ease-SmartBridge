import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { BookingProvider } from "@/contexts/BookingContext";
import Index from "./pages/Index";
import Temples from "./pages/Temples";
import TempleDetail from "./pages/TempleDetail";
import BookingHistory from "./pages/BookingHistory";
import BookingConfirmation from "./pages/BookingConfirmation";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import PrasadBooking from "./pages/PrasadBooking";
import ParkingStatus from "./pages/ParkingStatus";
import TempleNavigation from "./pages/TempleNavigation";
import AudioGuide from "./pages/AudioGuide";
import FestivalCalendar from "./pages/FestivalCalendar";
import Feedback from "./pages/Feedback";
import Donation from "./pages/Donation";
import NotFound from "./pages/NotFound";
import ChatBot from "./components/ChatBot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BookingProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/temples" element={<Temples />} />
                <Route path="/temples/:id" element={<TempleDetail />} />
                <Route path="/temples/:id/navigate" element={<TempleNavigation />} />
                <Route path="/temples/:id/audio-guide" element={<AudioGuide />} />
                <Route path="/bookings" element={<BookingHistory />} />
                <Route path="/booking-confirmation" element={<BookingConfirmation />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/prasad" element={<PrasadBooking />} />
                <Route path="/parking" element={<ParkingStatus />} />
                <Route path="/festivals" element={<FestivalCalendar />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/donate" element={<Donation />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <ChatBot />
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </BookingProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
