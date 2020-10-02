module.exports = (sequelize, DataTypes) => {
  const Tour = sequelize.define(
    "Tour",
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
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      description: DataTypes.STRING,
    price: DataTypes.DECIMAL(10,2),
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
  Tour.associate = function (models) {
    Tour.belongsTo(models.User, {
      foreignKey: "created_by",
      as: "author",
    });
       Tour.hasMany(models.TourBooking, {
      foreignKey: 'tour_id',
      as: 'tour_bookings',
      onDelete: 'CASCADE',
    });
  };
  return Tour;
};

// database/models/Tour.js
