export interface Festival {
  id: string;
  name: string;
  date: string;
  templeId: string;
  expectedCrowd: number;
  specialSlots: number;
  status: "upcoming" | "active" | "completed";
}

export interface StaffAllocation {
  id: string;
  name: string;
  role: string;
  zone: string;
  shift: string;
  status: "on-duty" | "off-duty" | "break";
}

export const festivals: Festival[] = [
  { id: "f1", name: "Maha Shivaratri", date: "2026-03-10", templeId: "1", expectedCrowd: 15000, specialSlots: 24, status: "upcoming" },
  { id: "f2", name: "Navratri", date: "2026-04-02", templeId: "1", expectedCrowd: 20000, specialSlots: 30, status: "upcoming" },
  { id: "f3", name: "Guru Nanak Jayanti", date: "2026-04-14", templeId: "2", expectedCrowd: 25000, specialSlots: 36, status: "upcoming" },
  { id: "f4", name: "Thai Pongal", date: "2026-01-15", templeId: "3", expectedCrowd: 8000, specialSlots: 16, status: "completed" },
];

export const staffAllocations: StaffAllocation[] = [
  { id: "st1", name: "Rajesh Kumar", role: "Security", zone: "Main Gate", shift: "6AM-2PM", status: "on-duty" },
  { id: "st2", name: "Priya Singh", role: "Crowd Manager", zone: "Queue Area", shift: "6AM-2PM", status: "on-duty" },
  { id: "st3", name: "Arjun Patel", role: "Parking Attendant", zone: "East Parking", shift: "6AM-2PM", status: "break" },
  { id: "st4", name: "Meera Devi", role: "Prasad Counter", zone: "North Counter", shift: "2PM-10PM", status: "off-duty" },
  { id: "st5", name: "Suresh Iyer", role: "Emergency Response", zone: "Control Room", shift: "6AM-2PM", status: "on-duty" },
  { id: "st6", name: "Kavitha N", role: "Guide", zone: "Temple Premises", shift: "8AM-4PM", status: "on-duty" },
];

export const crowdPredictions = [
  { hour: "5AM", predicted: 150, actual: 140 },
  { hour: "6AM", predicted: 380, actual: 360 },
  { hour: "7AM", predicted: 550, actual: 520 },
  { hour: "8AM", predicted: 480, actual: 500 },
  { hour: "9AM", predicted: 320, actual: null },
  { hour: "10AM", predicted: 250, actual: null },
  { hour: "11AM", predicted: 180, actual: null },
  { hour: "12PM", predicted: 130, actual: null },
];
