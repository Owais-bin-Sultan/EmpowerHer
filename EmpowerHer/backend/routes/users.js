const express = require('express');
const router = express.Router();
const User = require('../models/User');  // Assuming you're using a MongoDB model
const Product = require('../models/Product');
const Course = require('../models/Course');
const Mentorship = require('../models/Mentorship');
const auth = require('../middleware/auth');

// Get user by ID
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);  // Assuming you're using MongoDB
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user by ID
router.put('/:userId', async (req, res) => {
  const userId = req.params.userId;
  const updatedData = req.body;  // Data to update
  try {
    const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Change user password
router.put('/:userId/password', async (req, res) => {
  const userId = req.params.userId;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the current password with stored password
    // Assuming you have a method to validate passwords (e.g., user.comparePassword)
    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update the password
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Error changing password:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user stats
router.get('/:userId/stats', auth, async (req, res) => {
  try {
    const userId = req.params.userId;

    // Get products count
    const productsListed = await Product.countDocuments({ user: userId });

    // Get courses count
    // const coursesEnrolled = await Course.countDocuments({ 
    //   enrolledUsers: userId 
    // });

    // Get mentorship sessions count
    // const mentorshipSessions = await Mentorship.countDocuments({
    //   $or: [{ mentor: userId }, { mentee: userId }]
    // });

    res.json({
      productsListed
    });

  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
