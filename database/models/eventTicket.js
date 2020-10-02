module.exports = (sequelize, DataTypes) => {
  const EventTicket = sequelize.define('EventTicket', {
    additional_info: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    event_id: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,

    price: DataTypes.DECIMAL(10,2),
    paid: DataTypes.BOOLEAN,
    created_by: DataTypes.INTEGER,
    payment_reference: DataTypes.STRING,
  },
  {timestamps: true,});
  EventTicket.associate = function(models) {
    EventTicket.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'owner'
    });
    EventTicket.belongsTo(models.User, {
      foreignKey: 'created_by',
      as: 'author'
    });
    EventTicket.belongsTo(models.Event, {
      foreignKey: 'event_id',
      as: 'event'
    });
  };
  return EventTicket;
};

// database/models/user.js