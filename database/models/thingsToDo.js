module.exports = (sequelize, DataTypes) => {
    const ThingsToDo = sequelize.define('ThingsToDo', {
      name: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
    //price: DataTypes.DECIMAL(10,2),
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
    }, {
      timestamps: true,});
    ThingsToDo.associate = function(models) {
      // associations can be defined here
      ThingsToDo.belongsTo(models.User, {
        foreignKey: 'created_by',
        as: 'owner'
      });
    };
    return ThingsToDo;
  };
  
  // database/models/ThingsToDo.js