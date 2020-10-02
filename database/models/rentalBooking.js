module.exports = (sequelize, DataTypes) => {
  const RentalBooking = sequelize.define('RentalBooking', {
    additional_info: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    rental_id: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10,2),
    paid: DataTypes.BOOLEAN,
    created_by: DataTypes.INTEGER,
    payment_reference: DataTypes.STRING,
  },
  {timestamps: true,});
  RentalBooking.associate = function(models) {
    RentalBooking.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'owner'
    });
    RentalBooking.belongsTo(models.User, {
      foreignKey: 'created_by',
      as: 'author'
    });
    RentalBooking.belongsTo(models.Rental, {
      foreignKey: 'rental_id',
      as: 'rental'
    });
  };
  return RentalBooking;
};

// database/models/user.js