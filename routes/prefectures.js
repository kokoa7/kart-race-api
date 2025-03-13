const express = require('express');
const router = express.Router();
const { Prefecture } = require('../models');

// GET /prefectures - すべての都道府県を取得
router.get('/', async (req, res) => {
  try {
    const prefectures = await Prefecture.findAll();
    res.json(prefectures);
  } catch (error) {
    console.error('Error fetching prefectures:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;