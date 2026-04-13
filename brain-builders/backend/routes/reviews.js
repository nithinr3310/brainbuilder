const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// GET /api/reviews - Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ timestamp: -1 }).limit(10);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// POST /api/reviews - Add a new review
router.post('/', async (req, res) => {
  try {
    const { name, review, rating } = req.body;

    // Validation
    if (!name || !review || !rating) {
      return res.status(400).json({ error: 'Name, review, and rating are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const newReview = new Review({
      name,
      review,
      rating
    });

    const savedReview = await newReview.save();
    res.status(201).json({ message: 'Review saved successfully!', data: savedReview });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save review', message: error.message });
  }
});

module.exports = router;