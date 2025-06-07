require('dotenv').config();
const mongoose = require('mongoose');
const faker = require('faker');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Event = require('./models/Event');

const MONGODB_URI = process.env.MONGODB_URI;

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');


    await User.deleteMany();
    await Event.deleteMany();


    const users = [];
    for (let i = 0; i < 5; i++) {
      const hashedPassword = await bcrypt.hash('secret123', 10);
      const user = new User({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: hashedPassword,
      });
      users.push(await user.save());
    }

   
    for (let i = 0; i < 10; i++) {
      const event = new Event({
        title: faker.lorem.words(3),
        location: faker.address.city(),
        date: faker.date.future(),
        description: faker.lorem.sentences(2),
        userId: users[Math.floor(Math.random() * users.length)]._id
      });
      await event.save();
    }

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();
