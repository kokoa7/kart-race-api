module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('Schedule', {
    title: { type: DataTypes.STRING, allowNull: false },
    start_date: { type: DataTypes.DATE, allowNull: false },
    end_date: { type: DataTypes.DATE, allowNull: false },
  });
  return Schedule;
};