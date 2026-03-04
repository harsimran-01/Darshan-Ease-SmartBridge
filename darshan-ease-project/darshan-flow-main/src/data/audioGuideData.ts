export interface AudioGuideTrack {
  id: string;
  templeId: string;
  title: string;
  description: string;
  duration: string;
}

export const audioGuides: AudioGuideTrack[] = [
  { id: "ag1", templeId: "1", title: "Welcome to Sri Meenakshi Temple", description: "An introduction to one of India's most magnificent temples, built in the Dravidian style.", duration: "3:45" },
  { id: "ag2", templeId: "1", title: "The Thousand Pillar Hall", description: "Marvel at the architectural wonder of the Thousand Pillar Hall, each pillar intricately carved.", duration: "4:20" },
  { id: "ag3", templeId: "1", title: "The Golden Lotus Tank", description: "Learn about the sacred Potramarai Kulam where devotees cleanse themselves.", duration: "2:50" },
  { id: "ag4", templeId: "1", title: "The Gopurams", description: "Explore the 14 towering gopurams covered with thousands of colorful stucco figures.", duration: "5:10" },
  { id: "ag5", templeId: "2", title: "Welcome to the Golden Temple", description: "Discover the spiritual heart of Sikhism — Harmandir Sahib, built by Guru Arjan Dev.", duration: "4:00" },
  { id: "ag6", templeId: "2", title: "The Amrit Sarovar", description: "The sacred pool surrounding the temple is believed to have healing properties.", duration: "3:15" },
  { id: "ag7", templeId: "2", title: "The Langar Tradition", description: "Experience the world's largest free kitchen, serving over 100,000 meals daily.", duration: "3:40" },
  { id: "ag8", templeId: "3", title: "Welcome to Brihadeeswarar Temple", description: "A UNESCO World Heritage Site built by Raja Raja Chola I in 1010 AD.", duration: "4:30" },
  { id: "ag9", templeId: "3", title: "The Vimana Tower", description: "Standing at 216 feet, topped by a massive 80-ton granite capstone.", duration: "3:55" },
  { id: "ag10", templeId: "4", title: "Welcome to Tirumala", description: "The world's richest and most-visited temple, receiving up to 100,000 pilgrims daily.", duration: "4:15" },
  { id: "ag11", templeId: "4", title: "The Legend of Lord Venkateswara", description: "The divine story of Lord Vishnu's manifestation as Venkateswara on the seven hills.", duration: "5:00" },
  { id: "ag12", templeId: "5", title: "The Journey to Vaishno Devi", description: "A 13 km trek through the Trikuta Mountains to the sacred cave shrine.", duration: "4:45" },
  { id: "ag13", templeId: "5", title: "The Three Pindis", description: "Learn about the three natural rock formations representing the three goddesses.", duration: "3:30" },
  { id: "ag14", templeId: "6", title: "Kashi Vishwanath – The Eternal City", description: "Varanasi, the spiritual capital of India, and its most sacred Shiva temple.", duration: "4:50" },
  { id: "ag15", templeId: "6", title: "The Kashi Corridor", description: "The modern corridor connecting the ancient temple directly to the Ganges ghats.", duration: "3:20" },
  { id: "ag16", templeId: "7", title: "Welcome to Jagannath Puri", description: "One of the Char Dham, home of the annual Rath Yatra chariot festival.", duration: "4:10" },
  { id: "ag17", templeId: "7", title: "The Mahaprasad", description: "The legendary temple kitchen where food for thousands is cooked in earthen pots.", duration: "3:00" },
  { id: "ag18", templeId: "8", title: "Bangla Sahib Gurudwara", description: "A place of peace in the heart of Delhi, known for its golden dome and sacred Sarovar.", duration: "3:45" },
  { id: "ag19", templeId: "9", title: "Somnath – The Eternal Shrine", description: "The first Jyotirlinga, rebuilt multiple times, standing proud by the Arabian Sea.", duration: "4:30" },
  { id: "ag20", templeId: "10", title: "Siddhivinayak – The Wish Fulfiller", description: "Mumbai's beloved Ganesha temple, visited by millions seeking blessings.", duration: "3:15" },
];
