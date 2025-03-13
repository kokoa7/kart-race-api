const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/kart_race_db', {
  dialect: 'postgres',
	dialectOptions: {
	ssl: {
	  require: true, // SSLを強制
	  rejectUnauthorized: false // 自己署名証明書を許可（Renderでは必要）
	}
	}
});

const Track = require('./track')(sequelize, DataTypes);
const Schedule = require('./schedule')(sequelize, DataTypes);
const RaceFormat = require('./raceFormat')(sequelize, DataTypes);

// リレーションシップの定義
Track.hasMany(Schedule, {
  foreignKey: 'TrackId',
  onUpdate: 'CASCADE',
  onDelete: 'SET NULL',
});
Schedule.belongsTo(Track, {
  foreignKey: 'TrackId',
  onUpdate: 'CASCADE',
  onDelete: 'SET NULL',
});
Schedule.belongsTo(RaceFormat, {
  foreignKey: 'raceFormat', // ScheduleモデルのraceFormatフィールドがRaceFormatモデルのIDを参照
  targetKey: 'ID',
  onUpdate: 'CASCADE',
  onDelete: 'SET NULL',
});

module.exports = sequelize;