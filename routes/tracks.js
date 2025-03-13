const express = require('express');
const router = express.Router();
const { Track, Prefecture } = require('../models');

// GET /tracks - すべてのトラックを取得
router.get('/', async (req, res) => {
  try {
    const tracks = await Track.findAll({
      attributes: ['id', 'fullName', 'shortName', 'prefecture', 'homepageUrl'],
      order: [['id', 'ASC']]
    });
    res.json(tracks);
  } catch (error) {
    console.error('Error fetching tracks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /tracks/:id - 特定のトラックを取得
router.get('/:id', async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.id);
    if (!track) {
      return res.status(404).json({ error: 'トラックが見つかりません' });
    }
    res.json(track);
  } catch (error) {
    console.error('Error fetching track:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /tracks - 新しいトラックを作成
router.post('/', async (req, res) => {
  try {
    const { fullName, shortName, prefecture, homepageUrl } = req.body;

    // データの検証
    if (!fullName || !shortName || !prefecture) {
      return res.status(400).json({ error: '必須項目が不足しています' });
    }

    const track = await Track.create({
      fullName,
      shortName,
      prefecture,
      homepageUrl: homepageUrl || null
    });

    res.status(201).json(track);
  } catch (error) {
    console.error('Error creating track:', error);
    res.status(500).json({ error: 'トラックの作成に失敗しました' });
  }
});

// PUT /tracks/:id - トラックを更新
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, shortName, prefecture, homepageUrl } = req.body;

    // トラックの取得
    const track = await Track.findByPk(id);
    if (!track) {
      return res.status(404).json({ error: 'トラックが見つかりません' });
    }

    // データの検証
    if (!fullName || !shortName || !prefecture) {
      return res.status(400).json({ error: '必須項目が不足しています' });
    }

    // トラックの更新
    track.fullName = fullName;
    track.shortName = shortName;
    track.prefecture = prefecture;
    track.homepageUrl = homepageUrl || null;

    await track.save();

    res.json(track);
  } catch (error) {
    console.error('Error updating track:', error);
    res.status(500).json({ error: 'トラックの更新に失敗しました' });
  }
});

// DELETE /tracks/:id - トラックを削除
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // トラックの取得
    const track = await Track.findByPk(id);
    if (!track) {
      return res.status(404).json({ error: 'トラックが見つかりません' });
    }

    // トラックの削除
    await track.destroy();

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting track:', error);
    res.status(500).json({ error: 'トラックの削除に失敗しました' });
  }
});

module.exports = router; 