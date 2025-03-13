module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('Schedule', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE, // timestamp with time zone に対応
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE, // timestamp with time zone に対応
      allowNull: false,
    },
    TrackId: {
      type: DataTypes.INTEGER,
      allowNull: true, // ON DELETE SET NULL に基づく
      references: {
        model: 'Tracks', // 参照するテーブル名
        key: 'id',      // 参照するカラム
      },
    },
    raceFormat: {
      type: DataTypes.INTEGER, // raceFormatを整数型に変更
      allowNull: false,
      defaultValue: 0, // デフォルト値を整数に変更
    },
    raceUrl: {
      type: DataTypes.STRING, // 文字列型
      allowNull: true, // NULLを許可
    },
  }, {
    tableName: 'Schedules', // テーブル名を明示
    timestamps: true,       // createdAt と updatedAt を自動管理
  });

  // リレーションシップの定義
  Schedule.associate = (models) => {
    Schedule.belongsTo(models.Track, {
      foreignKey: 'TrackId',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
    Schedule.belongsTo(models.RaceFormat, {
      foreignKey: 'raceFormat', // 外部キーとして使用
      targetKey: 'ID',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  };

  return Schedule;
};