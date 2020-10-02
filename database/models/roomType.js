module.exports = (sequelize, DataTypes) => {
  const RoomType = sequelize.define('RoomType', {
    name: DataTypes.STRING,
    hotel_id: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10,2),
    capacity: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
  }, {
    timestamps: true,});
  RoomType.associate = function(models) {
    // associations can be defined here
    RoomType.hasMany(models.Room, {
      foreignKey: 'room_type_id',
      as: 'rooms',
      onDelete: 'CASCADE',
    });
    RoomType.belongsTo(models.User, {
      foreignKey: 'created_by',
      as: 'owner'
    });

    // RoomType.hasMany(models.Comment, {
    //   foreignKey: 'RoomTypeId',
    //   as: 'comments',
    //   onDelete: 'CASCADE',
    // });
  };
  return RoomType;
};

// database/models/RoomType.js