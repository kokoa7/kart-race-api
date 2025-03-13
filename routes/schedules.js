const express = require('express');
const router = express.Router();
const sequelize = require('../models');
const Track = sequelize.models.Track;
const Schedule = sequelize.models.Schedule;
const RaceFormat = sequelize.models.RaceFormat;

// GET /schedules - すべてのスケジュールを取得
router.get('/', async (req, res) => {
  try {
    const schedules = await Schedule.findAll({
      attributes: ['id', 'title', 'startDate', 'endDate', 'raceFormat', 'raceUrl'],
      include: [{
        model: Track,
        attributes: ['id', 'fullName', 'shortName', 'prefecture']
      }, {
        model: RaceFormat,
        attributes: ['ID', 'name']
      }],
      order: [['startDate', 'ASC']] // 開始日時で昇順ソート
    });
    res.json(schedules.map(schedule => ({
      id: schedule.id,
      title: schedule.title,
      startDate: schedule.startDate,
      endDate: schedule.endDate,
      raceFormat: {
        id: schedule.RaceFormat.ID,
        name: schedule.RaceFormat.name
      },
      raceUrl: schedule.raceUrl,
      Track: {
        id: schedule.Track.id,
        fullName: schedule.Track.fullName,
        shortName: schedule.Track.shortName,
        prefecture: schedule.Track.prefecture
      }
    })));
  } catch (error) {
    console.error('Error fetching schedules:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// POST /schedules - 新しいスケジュールを作成
router.post('/', async (req, res) => {
  try {
    const { date, trackId, raceName, raceFormat, raceUrl } = req.body;

    // 日付の処理
    const startDate = new Date(`${date}T10:00:00`); // 10:00開始
    const endDate = new Date(`${date}T12:00:00`);   // 12:00終了

    // データの検証
    if (!date || !trackId || !raceName) {
      return res.status(400).json({ error: '必須項目が不足しています' });
    }

    const schedule = await Schedule.create({
      title: raceName,
      startDate,
      endDate,
      TrackId: parseInt(trackId, 10),
      raceFormat: raceFormat || '0',
      raceUrl: raceUrl || null
    });

    res.status(201).json(schedule);
  } catch (error) {
    console.error('Error creating schedule:', error);
    res.status(500).json({ error: 'スケジュールの作成に失敗しました' });
  }
});

module.exports = router;