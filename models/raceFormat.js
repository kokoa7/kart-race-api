module.exports = (sequelize, DataTypes) => {
  const RaceFormat = sequelize.define('RaceFormat', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'RaceFormat', // テーブル名を明示
    timestamps: false,       // タイムスタンプを管理しない
  });

  return RaceFormat;
}; 