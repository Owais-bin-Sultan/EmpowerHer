const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const courseRoutes = require('./routes/courses');
const mentorshipRoutes = require('./routes/mentorship');
const userRoutes = require('./routes/users'); 

const app = express();

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:5173', // Vite's default port
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));

app.use(express.json());

// MongoDB Configuration
// Hardcoded URI
const PORT = 5000; // Hardcoded port number

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/empowerher', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/mentorship', mentorshipRoutes);
app.use('/api/users', userRoutes); 

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated');
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
