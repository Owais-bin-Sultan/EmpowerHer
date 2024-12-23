const express = require('express');
const router = express.Router();
const Mentorship = require('../models/Mentorship');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const mentorships = await Mentorship.find({ $or: [{ mentor: req.user.id }, { mentee: req.user.id }] })
      .populate('mentor', 'name')
      .populate('mentee', 'name');
    res.json(mentorships);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { mentorId, startDate, goals } = req.body;
    const mentorship = new Mentorship({
      mentor: mentorId,
      mentee: req.user.id,
      startDate,
      goals
    });
    await mentorship.save();
    res.status(201).json(mentorship);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

