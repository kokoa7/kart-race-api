const express = require('express');
const router = express.Router();
const sequelize = require('../models');
const Track = sequelize.models.Track;
const Schedule = sequelize.models.Schedule;

// GET /schedules - すべてのスケジュールを取得
router.get('/', async (req, res) => {
  try {
    const schedules = await Schedule.findAll({
      attributes: ['id', 'title', 'start_date', 'end_date'],
      include: [{
        model: Track,
        attributes: ['id', 'fullName', 'shortName', 'prefecture']
      }],
      order: [['start_date', 'ASC']] // 開始日時で昇順ソート
    });
    res.json(schedules);
  } catch (error) {
    console.error('Error fetching schedules:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /schedules - 新しいスケジュールを作成
router.post('/', async (req, res) => {
  try {
    const { date, trackId, raceName } = req.body;

    // 日付の処理
    const startDate = new Date(`${date}T10:00:00`); // 10:00開始
    const endDate = new Date(`${date}T12:00:00`);   // 12:00終了

    // データの検証
    if (!date || !trackId || !raceName) {
      return res.status(400).json({ error: '必須項目が不足しています' });
    }

    const schedule = await Schedule.create({
      title: raceName,
      start_date: startDate,
      end_date: endDate,
      TrackId: parseInt(trackId, 10)
    });

    res.status(201).json(schedule);
  } catch (error) {
    console.error('Error creating schedule:', error);
    res.status(500).json({ error: 'スケジュールの作成に失敗しました' });
  }
});

module.exports = router;