const express = require('express');
const router = express.Router();
const sequelize = require('../models');
const Track = sequelize.models.Track;

// GET /tracks - すべてのトラックを取得
router.get('/', async (req, res) => {
  try {
    const tracks = await Track.findAll({
      attributes: ['id', 'name', 'createdAt', 'updatedAt']
    });
    res.json(tracks);
  } catch (error) {
    console.error('Error fetching tracks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 