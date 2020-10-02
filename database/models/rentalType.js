module.exports = (sequelize, DataTypes) => {
    const RentalType = sequelize.define('RentalType', {
      name: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
    }, {
      timestamps: true,});
    RentalType.associate = function(models) {
      // associations can be defined here
      RentalType.belongsTo(models.User, {
        foreignKey: 'created_by',
        as: 'owner'
      });
  
      RentalType.hasMany(models.Rental, {
        foreignKey: 'rental_type_id',
        as: 'rentals',
        onDelete: 'CASCADE',
      });
    };
    return RentalType;
  };
  
  // database/models/RentalType.js