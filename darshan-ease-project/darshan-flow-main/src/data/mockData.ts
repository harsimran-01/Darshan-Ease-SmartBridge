import temple1 from "@/assets/temple-1.jpg";
import temple2 from "@/assets/temple-2.jpg";
import temple3 from "@/assets/temple-3.jpg";

export interface Temple {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  entryGates: number;
  parkingInfo: string;
  type: "temple" | "gurudwara" | "mosque" | "church";
  state: string;
  timings: string;
  specialFeature?: string;
}

export interface Slot {
  id: string;
  templeId: string;
  date: string;
  startTime: string;
  endTime: string;
  maxCapacity: number;
  bookedCount: number;
  crowdLevel: "low" | "medium" | "high";
}

export interface Booking {
  id: string;
  templeId: string;
  templeName: string;
  slotId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "confirmed" | "cancelled" | "completed";
  qrCode: string;
  createdAt: string;
}

export const temples: Temple[] = [
  {
    id: "1",
    name: "Sri Meenakshi Temple",
    location: "Madurai, Tamil Nadu",
    description: "One of the most famous Hindu temples, known for its stunning Dravidian architecture with 14 colorful gopurams and the Thousand Pillar Hall.",
    image: temple1,
    entryGates: 4,
    parkingInfo: "Free parking available at East Gate",
    type: "temple",
    state: "Tamil Nadu",
    timings: "5:00 AM – 12:30 PM, 4:00 PM – 9:30 PM",
    specialFeature: "14 Gopurams & Golden Lotus Tank",
  },
  {
    id: "2",
    name: "Golden Temple (Harmandir Sahib)",
    location: "Amritsar, Punjab",
    description: "The holiest Gurdwara and the most important pilgrimage site of Sikhism, surrounded by the sacred Amrit Sarovar pool. Serves 100,000+ free meals daily.",
    image: temple2,
    entryGates: 4,
    parkingInfo: "Multi-level parking at main entrance",
    type: "gurudwara",
    state: "Punjab",
    timings: "Open 24 hours",
    specialFeature: "World's largest free kitchen (Langar)",
  },
  {
    id: "3",
    name: "Brihadeeswarar Temple",
    location: "Thanjavur, Tamil Nadu",
    description: "A UNESCO World Heritage Site built by Raja Raja Chola I in 1010 AD. The 216-ft vimana tower is topped by an 80-ton granite capstone.",
    image: temple3,
    entryGates: 2,
    parkingInfo: "Parking near South entrance",
    type: "temple",
    state: "Tamil Nadu",
    timings: "6:00 AM – 12:30 PM, 4:00 PM – 8:30 PM",
    specialFeature: "UNESCO Heritage – Chola Architecture",
  },
  {
    id: "4",
    name: "Tirumala Venkateswara Temple",
    location: "Tirupati, Andhra Pradesh",
    description: "The richest and most-visited Hindu temple in the world, dedicated to Lord Venkateswara. Receives 50,000-100,000 pilgrims daily.",
    image: temple1,
    entryGates: 6,
    parkingInfo: "Alipiri & Srivari Mettu parking zones",
    type: "temple",
    state: "Andhra Pradesh",
    timings: "3:00 AM – 12:00 AM",
    specialFeature: "Richest temple in the world",
  },
  {
    id: "5",
    name: "Vaishno Devi Temple",
    location: "Katra, Jammu & Kashmir",
    description: "A sacred cave shrine dedicated to Goddess Vaishno Devi, nestled at 5,200 ft in the Trikuta Mountains. The trek is 13 km from Katra base.",
    image: temple2,
    entryGates: 2,
    parkingInfo: "Parking at Katra base camp",
    type: "temple",
    state: "Jammu & Kashmir",
    timings: "5:00 AM – 12:00 PM, 4:00 PM – 9:00 PM",
    specialFeature: "Mountain cave shrine – 13 km trek",
  },
  {
    id: "6",
    name: "Kashi Vishwanath Temple",
    location: "Varanasi, Uttar Pradesh",
    description: "One of the 12 Jyotirlingas, dedicated to Lord Shiva. The newly built Kashi Vishwanath Corridor connects the temple to the Ganges ghats.",
    image: temple3,
    entryGates: 4,
    parkingInfo: "Godowlia parking zone",
    type: "temple",
    state: "Uttar Pradesh",
    timings: "3:00 AM – 11:00 PM",
    specialFeature: "Jyotirlinga & Kashi Corridor",
  },
  {
    id: "7",
    name: "Jagannath Temple",
    location: "Puri, Odisha",
    description: "One of the Char Dham pilgrimage sites, famous for the annual Rath Yatra festival. The Mahaprasad served here is legendary.",
    image: temple1,
    entryGates: 4,
    parkingInfo: "Grand Road parking area",
    type: "temple",
    state: "Odisha",
    timings: "5:00 AM – 11:00 PM",
    specialFeature: "Rath Yatra & Mahaprasad",
  },
  {
    id: "8",
    name: "Bangla Sahib Gurudwara",
    location: "New Delhi, Delhi",
    description: "One of the most prominent Sikh houses of worship in Delhi, known for its golden dome, sacred pool (Sarovar), and community kitchen.",
    image: temple2,
    entryGates: 3,
    parkingInfo: "Underground parking available",
    type: "gurudwara",
    state: "Delhi",
    timings: "Open 24 hours",
    specialFeature: "Sacred Sarovar & free Langar",
  },
  {
    id: "9",
    name: "Somnath Temple",
    location: "Prabhas Patan, Gujarat",
    description: "The first of the 12 Jyotirlingas, rebuilt multiple times over centuries. The current structure overlooks the Arabian Sea and hosts a stunning light & sound show.",
    image: temple3,
    entryGates: 3,
    parkingInfo: "Large parking lot near main gate",
    type: "temple",
    state: "Gujarat",
    timings: "6:00 AM – 9:30 PM",
    specialFeature: "Jyotirlinga #1 – seaside temple",
  },
  {
    id: "10",
    name: "Siddhivinayak Temple",
    location: "Mumbai, Maharashtra",
    description: "Dedicated to Lord Ganesha, this 18th-century temple is one of Mumbai's most revered shrines, visited by celebrities and devotees alike.",
    image: temple1,
    entryGates: 2,
    parkingInfo: "Prabhadevi station parking nearby",
    type: "temple",
    state: "Maharashtra",
    timings: "5:30 AM – 10:00 PM",
    specialFeature: "Wish-fulfilling Ganesha idol",
  },
];

const today = new Date().toISOString().split("T")[0];
const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

const generateSlots = (templeId: string, capacity: number): Slot[] => {
  const times = [
    ["05:00","06:00"],["06:00","07:00"],["07:00","08:00"],["08:00","09:00"],
    ["09:00","10:00"],["10:00","11:00"],["16:00","17:00"],["17:00","18:00"],
  ];
  return times.map((t, i) => {
    const booked = Math.floor(Math.random() * capacity);
    const ratio = booked / capacity;
    return {
      id: `s-${templeId}-${i}`,
      templeId,
      date: today,
      startTime: t[0],
      endTime: t[1],
      maxCapacity: capacity,
      bookedCount: booked,
      crowdLevel: ratio < 0.5 ? "low" : ratio < 0.8 ? "medium" : "high" as "low"|"medium"|"high",
    };
  });
};

export const slots: Slot[] = [
  ...generateSlots("1", 100),
  ...generateSlots("2", 200),
  ...generateSlots("3", 80),
  ...generateSlots("4", 300),
  ...generateSlots("5", 150),
  ...generateSlots("6", 200),
  ...generateSlots("7", 150),
  ...generateSlots("8", 120),
  ...generateSlots("9", 100),
  ...generateSlots("10", 100),
  // Tomorrow slots for temple 1
  { id: "s-1-t1", templeId: "1", date: tomorrow, startTime: "06:00", endTime: "07:00", maxCapacity: 100, bookedCount: 10, crowdLevel: "low" },
  { id: "s-1-t2", templeId: "1", date: tomorrow, startTime: "07:00", endTime: "08:00", maxCapacity: 100, bookedCount: 5, crowdLevel: "low" },
];

export const bookings: Booking[] = [
  {
    id: "b1",
    templeId: "1",
    templeName: "Sri Meenakshi Temple",
    slotId: "s1",
    date: today,
    startTime: "06:00",
    endTime: "07:00",
    status: "confirmed",
    qrCode: "DARSHAN-B1-2026",
    createdAt: new Date().toISOString(),
  },
  {
    id: "b2",
    templeId: "2",
    templeName: "Golden Temple",
    slotId: "s9",
    date: today,
    startTime: "07:00",
    endTime: "08:00",
    status: "completed",
    qrCode: "DARSHAN-B2-2026",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const adminStats = {
  totalVisitors: 12847,
  todayBookings: 342,
  activeTemples: 3,
  peakHour: "07:00 - 08:00",
  weeklyTrend: [
    { day: "Mon", visitors: 1200 },
    { day: "Tue", visitors: 980 },
    { day: "Wed", visitors: 1100 },
    { day: "Thu", visitors: 1450 },
    { day: "Fri", visitors: 1800 },
    { day: "Sat", visitors: 2200 },
    { day: "Sun", visitors: 2500 },
  ],
  hourlyDistribution: [
    { hour: "5AM", count: 120 },
    { hour: "6AM", count: 340 },
    { hour: "7AM", count: 520 },
    { hour: "8AM", count: 480 },
    { hour: "9AM", count: 350 },
    { hour: "10AM", count: 280 },
    { hour: "11AM", count: 200 },
    { hour: "12PM", count: 150 },
  ],
};
