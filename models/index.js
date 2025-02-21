const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/kart_race_db', {
  dialect: 'postgres',
});

const Track = require('./track')(sequelize, DataTypes);
const Schedule = require('./schedule')(sequelize, DataTypes);

Track.hasMany(Schedule);
Schedule.belongsTo(Track);

module.exports = sequelize;