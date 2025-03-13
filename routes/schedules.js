const express = require('express');
const router = express.Router();
const { Schedule, Track, RaceFormat } = require('../models');

// GET /schedules - すべてのスケジュールを取得
router.get('/', async (req, res) => {
  try {
    const schedules = await Schedule.findAll({
      include: [
        {
          model: Track,
          attributes: ['id', 'fullName', 'shortName']
        },
        {
          model: RaceFormat,
          attributes: ['ID', 'name']
        }
      ]
    });
    res.json(schedules);
  } catch (error) {
    console.error('Error fetching schedules:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /schedules/track/:trackId - 特定のトラックのスケジュールを取得
router.get('/track/:trackId', async (req, res) => {
  try {
    const { trackId } = req.params;

    // トラックIDの検証
    if (!trackId || isNaN(parseInt(trackId, 10))) {
      return res.status(400).json({ error: '有効なトラックIDを指定してください' });
    }

    const schedules = await Schedule.findAll({
      where: {
        TrackId: parseInt(trackId, 10)
      },
      include: [
        {
          model: Track,
          attributes: ['id', 'fullName', 'shortName']
        },
        {
          model: RaceFormat,
          attributes: ['ID', 'name']
        }
      ],
      order: [['startDate', 'ASC']] // 開始日時でソート
    });

    if (schedules.length === 0) {
      return res.status(404).json({ message: '指定されたトラックのスケジュールが見つかりません' });
    }

    res.json(schedules);
  } catch (error) {
    console.error('Error fetching schedules by track:', error);
    res.status(500).json({ error: 'Internal server error' });
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

// PUT /schedules/:id - スケジュールを更新
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { date, trackId, raceName, raceFormat, raceUrl } = req.body;

    // スケジュールの取得
    const schedule = await Schedule.findByPk(id);
    if (!schedule) {
      return res.status(404).json({ error: 'スケジュールが見つかりません' });
    }

    // 日付の処理
    const startDate = new Date(`${date}T10:00:00`); // 10:00開始
    const endDate = new Date(`${date}T12:00:00`);   // 12:00終了

    // データの検証
    if (!date || !trackId || !raceName) {
      return res.status(400).json({ error: '必須項目が不足しています' });
    }

    // スケジュールの更新
    schedule.title = raceName;
    schedule.startDate = startDate;
    schedule.endDate = endDate;
    schedule.TrackId = parseInt(trackId, 10);
    schedule.raceFormat = raceFormat || '0';
    schedule.raceUrl = raceUrl || null;

    await schedule.save();

    res.status(200).json(schedule);
  } catch (error) {
    console.error('Error updating schedule:', error);
    res.status(500).json({ error: 'スケジュールの更新に失敗しました' });
  }
});

// DELETE /schedules/:id - スケジュールを削除
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // スケジュールの取得
    const schedule = await Schedule.findByPk(id);
    if (!schedule) {
      return res.status(404).json({ error: 'スケジュールが見つかりません' });
    }

    // スケジュールの削除
    await schedule.destroy();

    res.status(204).send(); // 削除成功時は204 No Contentを返す
  } catch (error) {
    console.error('Error deleting schedule:', error);
    res.status(500).json({ error: 'スケジュールの削除に失敗しました' });
  }
});

module.exports = router;