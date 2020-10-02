module.exports = (sequelize, DataTypes) => {
  const Rental = sequelize.define(
    "Rental",
    {
      name: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
    //  travel_agency_id: DataTypes.INTEGER,
      location: DataTypes.STRING,
      social_media: {
        type: DataTypes.STRING,
        get: function () {
          return JSON.parse(this.getDataValue("social_media"));
        },
        set: function (val) {
          return this.setDataValue("social_media", JSON.stringify(val));
        },
      },
      rental_type: {
        type: DataTypes.STRING,
        get: function () {
          return JSON.parse(this.getDataValue("rental_type"));
        },
        set: function (val) {
          return this.setDataValue("rental_type", JSON.stringify(val));
        },
      },
      features: {
        type: DataTypes.STRING,
        get: function () {
          return JSON.parse(this.getDataValue("features"));
        },
        set: function (val) {
          return this.setDataValue("features", JSON.stringify(val));
        },
      },
      description: DataTypes.STRING,
      price: DataTypes.DECIMAL(10,2),
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
    },
    {
      timestamps: true,
      indexes: [
        {
          fields: ["name"],
          unique: true,
        },
      ],
    }
  );
  Rental.associate = function (models) {
    Rental.belongsTo(models.User, {
      foreignKey: "created_by",
      as: "author",
    });
       Rental.hasMany(models.RentalBooking, {
      foreignKey: 'rental_id',
      as: 'rental_bookings',
      onDelete: 'CASCADE',
    });
  };
  return Rental;
};

// database/models/Rental.js
