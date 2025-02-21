module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define('Track', {
    name: { type: DataTypes.STRING, allowNull: false },
  });
  return Track;
};