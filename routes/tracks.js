const express = require('express');
const router = express.Router();
const sequelize = require('../models');
const Track = sequelize.models.Track;

// GET /tracks - すべてのトラックを取得
router.get('/', async (req, res) => {
  try {
    const tracks = await Track.findAll({
      attributes: ['id', 'fullName', 'shortName', 'prefecture']
    });
    res.json(tracks);
  } catch (error) {
    console.error('Error fetching tracks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /tracks - 新しいトラックを作成
router.post('/', async (req, res) => {
  try {
    const { fullName, shortName, prefecture, homepageUrl } = req.body;
    
    // バリデーション
    if (!fullName || !shortName || !prefecture) {
      return res.status(400).json({ 
        error: '必須項目が不足しています',
        required: ['fullName', 'shortName', 'prefecture']
      });
    }

    const track = await Track.create({
      fullName,
      shortName,
      prefecture,
      homepageUrl,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(201).json({
      trackId: track.id,
      fullName: track.fullName,
      shortName: track.shortName,
      prefecture: track.prefecture,
      homepageUrl: track.homepageUrl
    });

  } catch (error) {
    console.error('Error creating track:', error);
    res.status(500).json({ error: 'トラックの作成に失敗しました' });
  }
});

module.exports = router; 