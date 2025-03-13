const express = require('express');
const cors = require('cors');
const db = require('./models');

const app = express();
const port = process.env.PORT || 3000;

// ミドルウェアの設定
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ルーターの登録
const schedulesRouter = require('./routes/schedules');
const tracksRouter = require('./routes/tracks');
const prefecturesRouter = require('./routes/prefectures');

app.use('/schedules', schedulesRouter);
app.use('/tracks', tracksRouter);
app.use('/prefectures', prefecturesRouter);

// データベース同期とサーバー起動
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});