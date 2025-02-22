module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define('Track', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prefecture: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    tableName: 'Tracks', // テーブル名を明示
  });

  // リレーションシップの定義
  Track.associate = (models) => {
    Track.hasMany(models.Schedule, {
      foreignKey: 'TrackId',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  };

  return Track;
};