import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const botResponses: Record<string, string> = {
  "hello": "🙏 Namaste! Welcome to Darshan Ease. How can I help you today?",
  "hi": "🙏 Namaste! How may I assist you with your darshan booking?",
  "booking": "You can book darshan slots from the Temples page. Select a temple, choose a date & time slot, and confirm. You'll receive a QR ticket instantly!",
  "cancel": "To cancel a booking, go to My Bookings → Upcoming tab → click on the booking and select Cancel. Refunds are processed within 3-5 days.",
  "crowd": "You can check live crowd status on each temple page. Green = Low, Yellow = Medium, Red = High. We recommend visiting during low-crowd hours.",
  "parking": "Check real-time parking availability on the Parking page. We show spot counts for two-wheelers, cars, and buses at each temple.",
  "prasad": "You can pre-order prasad from the Prasad Booking page. Choose items, select pickup or delivery, and pay online!",
  "vip": "VIP and Senior Citizen slots have dedicated queues with shorter wait times. Select 'VIP Pass' or 'Senior Citizen' option while booking.",
  "group": "Group bookings (5+ people) are available! Select the Group Booking option on the temple page and enter the number of devotees.",
  "time": "🤖 AI Recommendation: Early morning (5-7 AM) and late evening (5-7 PM) typically have the lowest crowds. Weekdays are less crowded than weekends.",
  "festival": "During festivals, we activate Festival Mode with extended hours and increased slot capacity. Check the temple page for special festival schedules.",
  "queue": "Our smart queue system allocates you to the shortest queue based on your entry gate. Follow the instructions on your QR ticket.",
  "help": "I can help with: Booking, Cancellation, Crowd Status, Parking, Prasad, VIP Slots, Group Booking, Best Time to Visit, Festival Info, Queue Info. Just ask!",
};

const getResponse = (input: string): string => {
  const lower = input.toLowerCase();
  for (const [key, value] of Object.entries(botResponses)) {
    if (lower.includes(key)) return value;
  }
  return "🙏 I'm not sure about that. You can ask me about: booking, cancellation, crowd status, parking, prasad, VIP slots, group booking, best time, festivals, or queues. Type 'help' for all options!";
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "🙏 Namaste! I'm your Darshan Ease assistant. How can I help you today? Type 'help' to see what I can do!", sender: "bot", timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), text: input, sender: "user", timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const botMsg: Message = { id: (Date.now() + 1).toString(), text: getResponse(input), sender: "bot", timestamp: new Date() };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full gradient-saffron shadow-elevated transition-transform hover:scale-105"
      >
        {isOpen ? <X className="h-6 w-6 text-primary-foreground" /> : <MessageCircle className="h-6 w-6 text-primary-foreground" />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[28rem] w-[22rem] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-elevated">
          {/* Header */}
          <div className="gradient-saffron px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/20">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-primary-foreground">Darshan Assistant</h3>
                <p className="text-xs text-primary-foreground/70">Always here to help 🙏</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${msg.sender === "bot" ? "gradient-saffron" : "bg-secondary"}`}>
                  {msg.sender === "bot" ? <Bot className="h-3.5 w-3.5 text-primary-foreground" /> : <User className="h-3.5 w-3.5 text-secondary-foreground" />}
                </div>
                <div className={`max-w-[75%] rounded-xl px-3.5 py-2.5 text-sm ${msg.sender === "bot" ? "bg-muted text-foreground" : "gradient-saffron text-primary-foreground"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-3">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button type="submit" size="icon" className="gradient-saffron border-0 text-primary-foreground h-9 w-9">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
