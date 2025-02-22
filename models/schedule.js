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
    start_date: {
      type: DataTypes.DATE, // timestamp with time zone に対応
      allowNull: false,
    },
    end_date: {
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
    is_splint: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
  };

  return Schedule;
};