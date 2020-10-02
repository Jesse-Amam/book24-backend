module.exports = (sequelize, DataTypes) => {
  const TourBooking = sequelize.define('TourBooking', {
    additional_info: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    tour_id: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10,2),
    paid: DataTypes.BOOLEAN,
    payment_reference: DataTypes.STRING,
    created_by: DataTypes.INTEGER,
  },
  {timestamps: true,});
  TourBooking.associate = function(models) {
    TourBooking.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'owner'
    });
    TourBooking.belongsTo(models.User, {
      foreignKey: 'created_by',
      as: 'author'
    });
    TourBooking.belongsTo(models.Tour, {
      foreignKey: 'tour_id',
      as: 'tour'
    });
  };
  return TourBooking;
};

// database/models/user.js