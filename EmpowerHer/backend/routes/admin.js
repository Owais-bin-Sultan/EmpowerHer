// adminRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Request logger middleware
const requestLogger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};

router.use(requestLogger);

// Get all users (removed auth middleware temporarily)
router.get('/users', async (req, res) => {
    try {
        console.log('Fetching all users');
        const users = await User.find().select('-password');
        console.log(`Found ${users.length} users`);
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Update user approval status (removed auth middleware temporarily)
router.put('/users/:id/approve', async (req, res) => {
    try {
        console.log(`Updating approval for user ${req.params.id} to ${req.body.approved}`);
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { approved: req.body.approved },
            { new: true }
        ).select('-password');
        
        if (!user) {
            console.log(`User ${req.params.id} not found`);
            return res.status(404).json({ message: 'User not found' });
        }
        
        console.log('Updated user:', user);
        res.json(user);
    } catch (error) {
        console.error('Error updating user approval:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;