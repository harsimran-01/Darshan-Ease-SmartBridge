import { useState } from "react";
import { Bell, X, Calendar, AlertTriangle, Info, CheckCircle } from "lucide-react";

interface Notification {
  id: string;
  type: "booking" | "alert" | "info" | "success";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  { id: "n1", type: "booking", title: "Booking Confirmed", message: "Your darshan at Sri Meenakshi Temple is confirmed for tomorrow 6:00 AM.", time: "2 min ago", read: false },
  { id: "n2", type: "alert", title: "High Crowd Alert", message: "Golden Temple is experiencing high crowd. Consider rescheduling.", time: "15 min ago", read: false },
  { id: "n3", type: "info", title: "Festival Mode Active", message: "Extended darshan hours for Maha Shivaratri. Book special slots now!", time: "1 hr ago", read: false },
  { id: "n4", type: "success", title: "Prasad Delivered", message: "Your prasad order #P2026 has been delivered successfully.", time: "3 hrs ago", read: true },
];

const iconMap = {
  booking: Calendar,
  alert: AlertTriangle,
  info: Info,
  success: CheckCircle,
};

const colorMap = {
  booking: "text-primary bg-primary/10",
  alert: "text-destructive bg-destructive/10",
  info: "text-blue-500 bg-blue-500/10",
  success: "text-green-500 bg-green-500/10",
};

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-80 rounded-xl border border-border bg-card shadow-elevated">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <h3 className="font-display font-semibold text-foreground text-sm">Notifications</h3>
            <button onClick={markAllRead} className="text-xs text-primary hover:underline">Mark all read</button>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.map((n) => {
              const Icon = iconMap[n.type];
              return (
                <div key={n.id} className={`flex gap-3 border-b border-border px-4 py-3 last:border-0 ${!n.read ? "bg-primary/5" : ""}`}>
                  <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${colorMap[n.type]}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{n.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{n.message}</p>
                    <p className="mt-1 text-[10px] text-muted-foreground">{n.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
