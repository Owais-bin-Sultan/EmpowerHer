const express = require('express');
const User = require('../models/User'); // Assuming you have a User model
const authMiddleware = require('../middleware/auth'); // Assuming you have auth middleware

const router = express.Router();

// Get the authenticated user's profile
router.get('/users', authMiddleware, async (req, res) => {
  try {
    // Access the authenticated user's ID from the request (from JWT)
    const user = await User.findById(req.user.id); // Assuming user ID is attached to req.user in the auth middleware
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send back the user profile details
    res.json({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      businessName: user.businessName,
      businessDescription: user.businessDescription,
      joinDate: user.createdAt,
      productsListed: user.productsListed,
      coursesEnrolled: user.coursesEnrolled,
      mentorshipSessions: user.mentorshipSessions,
      profilePicture: user.profilePicture, // Assuming profile picture is a URL
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add any other user-related routes (like update, delete, etc.)

module.exports = router;
