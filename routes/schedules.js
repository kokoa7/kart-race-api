const express = require('express');
const router = express.Router();
const sequelize = require('../models');
const Track = sequelize.models.Track;
const Schedule = sequelize.models.Schedule;

router.get('/', async (req, res) => {
  const schedules = await Schedule.findAll({
    include: Track,
    attributes: [['start_date', 'start'], ['end_date', 'end'], 'title'],
  });
  res.json(schedules.map(s => ({
    title: `${s.Track.name} - ${s.title}`,
    start: s.start,
    end: s.end,
  })));
});

module.exports = router;