export interface PrasadItem {
  id: string;
  templeId: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
}

export const prasadItems: PrasadItem[] = [
  { id: "pr1", templeId: "1", name: "Laddu Prasadam", description: "Traditional sweet laddu blessed at the sanctum", price: 50, emoji: "🟡" },
  { id: "pr2", templeId: "1", name: "Pongal Prasadam", description: "Sacred rice pongal offering", price: 30, emoji: "🍚" },
  { id: "pr3", templeId: "1", name: "Vibhuti Pack", description: "Holy ash from the temple", price: 20, emoji: "⚪" },
  { id: "pr4", templeId: "1", name: "Flower Garland", description: "Fresh jasmine mala for worship", price: 40, emoji: "🌸" },
  { id: "pr5", templeId: "2", name: "Karah Prasad", description: "Traditional Sikh sacred pudding", price: 0, emoji: "🍮" },
  { id: "pr6", templeId: "2", name: "Langar Donation", description: "Contribute to the community kitchen", price: 101, emoji: "🙏" },
  { id: "pr7", templeId: "3", name: "Sweet Pongal", description: "Chola-style temple prasad", price: 35, emoji: "🍯" },
  { id: "pr8", templeId: "3", name: "Coconut Offering", description: "Sacred coconut with flowers", price: 25, emoji: "🥥" },
];
