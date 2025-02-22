const express = require('express');
const router = express.Router();
const sequelize = require('../models');
const Track = sequelize.models.Track;
const Schedule = sequelize.models.Schedule;

router.get('/', async (req, res) => {
  try {
    const schedules = await Schedule.findAll({
      include: [{ model: Track, attributes: ['name'] }], // Trackからnameのみ取得
      attributes: ['title', 'start_date', 'end_date'], // 生のフィールド名を指定
    });

    const formattedSchedules = schedules.map(schedule => ({
      title: `${schedule.Track.name} - ${schedule.title}`,
      start: schedule.start_date, // 直接start_dateを参照
      end: schedule.end_date,     // 直接end_dateを参照
    }));

    res.json(formattedSchedules);
  } catch (error) {
    console.error('Error fetching schedules:', error);
    res.status(500).json({ error: 'Internal Server Error' });
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