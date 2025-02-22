const express = require('express');
const cors = require('cors');
const sequelize = require('./models');
const schedulesRouter = require('./routes/schedules');
const tracksRouter = require('./routes/tracks');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/schedules', schedulesRouter);
app.use('/tracks', tracksRouter);

app.get('/', (req, res) => res.send('Kart Race API'));

const PORT = process.env.PORT || 3000;
sequelize.sync({ force: false }).then(async () => {
  const trackCount = await sequelize.models.Track.count();
  if (trackCount === 0) {
    const track = await sequelize.models.Track.create({ name: '東京カート' });
    await sequelize.models.Schedule.create({
      title: 'レース1',
      start_date: '2025-02-22T10:00:00',
      end_date: '2025-02-22T12:00:00',
      TrackId: track.id,
    });
    console.log('Sample data inserted');
  }
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('Database sync error:', err);
});