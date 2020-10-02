module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
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
      ticket_type: {
        type: DataTypes.STRING,
        get: function () {
          return JSON.parse(this.getDataValue("ticket_type"));
        },
        set: function (val) {
          return this.setDataValue("ticket_type", JSON.stringify(val));
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
  Event.associate = function (models) {
    Event.belongsTo(models.User, {
      foreignKey: "created_by",
      as: "author",
    });
       Event.hasMany(models.EventTicket, {
      foreignKey: 'event_id',
      as: 'event_tickets',
      onDelete: 'CASCADE',
    });
  };
  return Event;
};

// database/models/Event.js
