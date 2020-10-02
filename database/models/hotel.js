module.exports = (sequelize, DataTypes) => {
  const Hotel = sequelize.define(
    "Hotel",
    {
      name: DataTypes.STRING,
      bio: DataTypes.STRING,
      location: DataTypes.STRING,
      verified: DataTypes.BOOLEAN,
      created_by: DataTypes.INTEGER,
      features: {
        type: DataTypes.STRING,
        get: function () {
          return JSON.parse(this.getDataValue("features"));
        },
        set: function (val) {
          return this.setDataValue("features", JSON.stringify(val));
        },
      },
      check_in_time: DataTypes.STRING,
      check_out_time: DataTypes.STRING,
      reasons_to_choose: DataTypes.STRING,
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
  Hotel.associate = function (models) {
    Hotel.hasOne(models.User, {
      foreignKey: "id",
      as: "author",
    });
       Hotel.hasMany(models.RoomType, {
      foreignKey: 'hotel_id',
      as: 'room_types',
   //   onDelete: 'CASCADE',
    });
  };
  return Hotel;
};

// database/models/Hotel.js
