export interface ParkingLot {
  id: string;
  templeId: string;
  name: string;
  total: number;
  occupied: number;
  types: string[];
}

export const parkingData: ParkingLot[] = [
  { id: "pk1", templeId: "1", name: "East Gate Parking", total: 200, occupied: 120, types: ["Car", "Bike", "Bus"] },
  { id: "pk2", templeId: "1", name: "West Gate Parking", total: 150, occupied: 145, types: ["Car", "Bike"] },
  { id: "pk3", templeId: "2", name: "Main Entrance Parking", total: 500, occupied: 310, types: ["Car", "Bike", "Bus", "Accessible"] },
  { id: "pk4", templeId: "2", name: "South Side Parking", total: 200, occupied: 80, types: ["Car", "Bike"] },
  { id: "pk5", templeId: "3", name: "South Gate Parking", total: 100, occupied: 55, types: ["Car", "Bike"] },
  { id: "pk6", templeId: "3", name: "VIP Parking", total: 30, occupied: 28, types: ["Car", "Accessible"] },
];
