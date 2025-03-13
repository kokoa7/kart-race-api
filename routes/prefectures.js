const express = require('express');
const router = express.Router();
const sequelize = require('../models');
const Prefecture = sequelize.models.Prefecture;

// GET /prefectures - すべての都道府県を取得
router.get('/', async (req, res) => {
  try {
    const prefectures = await Prefecture.findAll({
      attributes: ['id', 'name'],
      order: [['id', 'ASC']] // IDで昇順ソート
    });
    res.json(prefectures);
  } catch (error) {
    console.error('Error fetching prefectures:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /prefectures/:id - 指定した都道府県IDの都道府県を取得
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // 都道府県の取得
    const prefecture = await Prefecture.findByPk(id, {
      attributes: ['id', 'name']
    });

    if (!prefecture) {
      return res.status(404).json({ error: '都道府県が見つかりません' });
    }

    res.json(prefecture);
  } catch (error) {
    console.error('Error fetching prefecture:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 