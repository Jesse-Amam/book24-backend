module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    name: DataTypes.STRING,
    room_type_id: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
  }, {
    timestamps: true,});
  Room.associate = function(models) {
    Room.belongsTo(models.User, {
      foreignKey: 'created_by',
      as: 'owner'
    });
    // associations can be defined here
  //   Room.hasMany(models.User, {
  //     foreignKey: 'school_id',
  //     as: 'users',
  //  //   onDelete: 'CASCADE',
  //   });

    // Room.hasMany(models.Comment, {
    //   foreignKey: 'RoomId',
    //   as: 'comments',
    //   onDelete: 'CASCADE',
    // });
  };
  return Room;
};

// database/models/Room.js