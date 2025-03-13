module.exports = (sequelize, DataTypes) => {
  const Prefecture = sequelize.define('Prefecture', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    tableName: 'Prefectures', // テーブル名を明示
    timestamps: false,       // タイムスタンプを管理しない
  });

  return Prefecture;
}; 