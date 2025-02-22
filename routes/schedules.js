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

module.exports = router;