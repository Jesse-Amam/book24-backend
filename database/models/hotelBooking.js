module.exports = (sequelize, DataTypes) => {
  const HotelBooking = sequelize.define('HotelBooking', {
    additional_info: DataTypes.STRING,
    room_type_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10,2),
    check_in_date: DataTypes.DATE,
    check_out_date: DataTypes.DATE,
    paid: DataTypes.BOOLEAN,
    payment_reference: DataTypes.STRING,
  },
  {timestamps: true,});
  HotelBooking.associate = function(models) {
    HotelBooking.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'owner'
    });
    HotelBooking.belongsTo(models.User, {
      foreignKey: 'created_by',
      as: 'author'
    });
    HotelBooking.belongsTo(models.RoomType, {
      foreignKey: 'room_type_id',
      as: 'room_type'
    });
  };
  return HotelBooking;
};

// database/models/user.js