const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'mysql://localhost:3306/kart_race_db?user=root&password=');

const Track = require('./track')(sequelize, DataTypes);
const Schedule = require('./schedule')(sequelize, DataTypes);

Track.hasMany(Schedule);
Schedule.belongsTo(Track);

module.exports = sequelize;