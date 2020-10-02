module.exports = (sequelize, DataTypes) => {
  const CarBooking = sequelize.define('CarBooking', {
    additional_info: DataTypes.STRING,
    car_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10,2),
    pickup_date: DataTypes.DATE,
    dropoff_date: DataTypes.DATE,
    paid: DataTypes.BOOLEAN,
    payment_reference: DataTypes.STRING,
  },
  {timestamps: true,});
  CarBooking.associate = function(models) {
    CarBooking.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'owner'
    });
    CarBooking.belongsTo(models.User, {
      foreignKey: 'created_by',
      as: 'author'
    });
    CarBooking.belongsTo(models.Car, {
      foreignKey: 'car_id',
      as: 'car'
    });
  };
  return CarBooking;
};

// database/models/user.js