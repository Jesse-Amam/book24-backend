module.exports = (sequelize, DataTypes) => {
    const TicketType = sequelize.define('TicketType', {
      name: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
    }, {
      timestamps: true,});
    TicketType.associate = function(models) {
      // associations can be defined here
      TicketType.belongsTo(models.User, {
        foreignKey: 'created_by',
        as: 'owner'
      });
  
      // TicketType.hasMany(models.Comment, {
      //   foreignKey: 'TicketTypeId',
      //   as: 'comments',
      //   onDelete: 'CASCADE',
      // });
    };
    return TicketType;
  };
  
  // database/models/TicketType.js