const Event = require('../models/Event');
const User = require('../models/User');
const sendEventCreatedEmail = require('../config/nodemailer');

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('userId', 'name email');
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createEvent = async (req, res) => {
  const { title, location, date, description } = req.body;
  const userId = req.user.userId;

  try {
    const event = new Event({
      title,
      location,
      date,
      description,
      userId
    });
    await event.save();


    const user = await User.findById(userId);
    await sendEventCreatedEmail(user.email, {
      title,
      location,
      date
    });

    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user.userId });
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
