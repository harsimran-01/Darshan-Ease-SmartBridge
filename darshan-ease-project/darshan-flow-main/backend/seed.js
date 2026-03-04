const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const Temple = require('./models/Temple');
const Slot = require('./models/Slot');

dotenv.config();

const seed = async () => {
  await connectDB();
  await User.deleteMany();
  await Temple.deleteMany();
  await Slot.deleteMany();

  // Admin user
  await User.create({ name: 'Admin', email: 'admin@darshan.com', password: 'admin123', role: 'admin', age: 30 });

  // Test user
  await User.create({ name: 'Devotee', email: 'user@darshan.com', password: 'user123', role: 'user', age: 45 });

  // Temples
  const t1 = await Temple.create({ name: 'Sri Meenakshi Temple', location: 'Madurai, Tamil Nadu', description: 'Famous Hindu temple with stunning Dravidian architecture.', entryGates: 4, parkingInfo: 'Free parking at East Gate' });
  const t2 = await Temple.create({ name: 'Golden Temple', location: 'Amritsar, Punjab', description: 'Holiest Gurdwara and most important pilgrimage site of Sikhism.', entryGates: 4, parkingInfo: 'Multi-level parking' });
  const t3 = await Temple.create({ name: 'Brihadeeswarar Temple', location: 'Thanjavur, Tamil Nadu', description: 'UNESCO World Heritage Site built by Chola dynasty.', entryGates: 2, parkingInfo: 'Parking near South entrance' });

  const today = new Date().toISOString().split('T')[0];
  const times = [['06:00','07:00'],['07:00','08:00'],['08:00','09:00'],['09:00','10:00'],['10:00','11:00']];

  for (const temple of [t1, t2, t3]) {
    for (const [start, end] of times) {
      await Slot.create({ templeId: temple._id, date: today, startTime: start, endTime: end, maxCapacity: 100, bookedCount: Math.floor(Math.random() * 80) });
    }
  }

  console.log('Database seeded!');
  process.exit();
};

seed();
