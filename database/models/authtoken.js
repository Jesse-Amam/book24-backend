let jwt = require("jsonwebtoken");
module.exports = (sequelize, DataTypes) => {
  
  const AuthToken = sequelize.define('AuthToken', {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  
  // set up the associations so we can make queries that include
  // the related objects
  AuthToken.associate = function({ User }) {
    AuthToken.belongsTo(User);
  };
    // generates a random 15 character token and
  // associates it with a user
  AuthToken.generate = async function(UserId) {
    if (!UserId) {
      throw new Error('AuthToken requires a user ID')
    }

    let token = '';

    token = jwt.sign({ UserId,  }, 'book24-backend@');

    return AuthToken.create({ token, UserId })
  }
  return AuthToken;
};