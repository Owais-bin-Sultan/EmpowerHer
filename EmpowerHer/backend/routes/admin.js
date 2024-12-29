const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/IsAdmin');
const User = require('../models/User');
const mongoose = require('mongoose');

// Request logger middleware
const requestLogger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};

router.use(requestLogger);

// Get all users (admin only)
// Get all users (admin only)
router.get('/users', async (req, res) => {
    try {
        // Verify database connection
        if (!mongoose.connection.readyState) {
            throw new Error('Database connection not established');
        }

        console.log('Fetching all users');
        const users = await User.find().select('-password');
        
        if (!users) {
            return res.status(404).json({ message: 'No users found' });
        }

        console.log(`Found ${users.length} users`);
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        
        if (error.name === 'MongoError') {
            return res.status(500).json({ 
                message: 'Database error occurred',
                error: error.message 
            });
        }

        res.status(500).json({ 
            message: 'Server Error', 
            error: error.message 
        });
    }
});
// Update user role (admin only)
router.put('/users/:id/role', async (req, res) => {
    try {
        console.log(`Updating role for user ${req.params.id} to ${req.body.role}`);
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role: req.body.role },
            { new: true }
        ).select('-password');
        console.log('Updated user:', user);
        res.json(user);
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Update user approval status (admin only)
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
