const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { sendContactNotification } = require('../services/emailService');

// POST /api/contact - Save contact form data
router.post('/', async (req, res) => {
  try {
    const { name, class: className, phone } = req.body;

    // Validation
    if (!name || !className || !phone) {
      return res.status(400).json({ error: 'Name, class, and phone are required' });
    }

    const contact = new Contact({
      name,
      class: className,
      phone
    });

    const savedContact = await contact.save();
    
    // Send email notification to admin
    await sendContactNotification({
      name: savedContact.name,
      class: savedContact.class,
      phone: savedContact.phone
    });
    
    res.status(201).json({ message: 'Contact saved successfully!', data: savedContact });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save contact', message: error.message });
  }
});

// GET /api/contact - Get all contacts (for admin)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ timestamp: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

module.exports = router;