module.exports = (sequelize, DataTypes) => {
    const Car = sequelize.define('Car', {
      name: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10,2),
    features: {
        type: DataTypes.STRING,
        get: function () {
          return JSON.parse(this.getDataValue("features"));
        },
        set: function (val) {
          return this.setDataValue("features", JSON.stringify(val));
        },
      },
      location: DataTypes.STRING,
      description: DataTypes.STRING,
      type: DataTypes.STRING,
      model: DataTypes.STRING,

    }, {
      timestamps: true,});
    Car.associate = function(models) {
      // associations can be defined here
      Car.belongsTo(models.User, {
        foreignKey: 'created_by',
        as: 'owner'
      });
  
      Car.hasMany(models.CarBooking, {
        foreignKey: 'car_id',
        as: 'car_bookings',
        onDelete: 'CASCADE',
      });
    };
    return Car;
  };
  
  // database/models/Car.js