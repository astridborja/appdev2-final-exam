require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Route files
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api', eventRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('🎉 Event Management API is running');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
