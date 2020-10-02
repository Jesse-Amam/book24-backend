const bcrypt = require("bcrypt")

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    mobile_number: DataTypes.STRING,
    username: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('guest','hotel-admin' ,'admin','super-admin'),
      defaultValue: 'guest'
    },
    device_token: { type: DataTypes.STRING },
    device_type: { type: DataTypes.STRING },
    device_language: { type: DataTypes.STRING },
    verification_url: { type: DataTypes.STRING },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    id_url: { type: DataTypes.STRING },
    hotel_id: { type: DataTypes.INTEGER },
    photo_url: { type: DataTypes.STRING },
  }, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
    instanceMethods: {
      validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      }
    },
    timestamps: true,
    indexes: [{
      fields: ['email', 'mobile_number', 'username'],
      unique: true,
    }]
  });
  User.associate = function(models) {
    User.hasMany(models.HotelBooking, {
      foreignKey: 'user_id',
      as: 'hotel_booking',
      onDelete: 'CASCADE',
    });
    User.belongsTo(models.Hotel, {
      foreignKey: 'hotel_id',
      as: 'hotel'
    });
    User.hasMany(models.AuthToken);
    // User.hasOne(
    //  models
    // )
  };
    // This is a class method, it is not called on an individual
  // user object, but rather the class as a whole.
  // e.g. User.authenticate('user1', 'password1234')
  User.authenticate = async function(email, password) {

    const user = await User.findOne({ where: { email } });

    // bcrypt is a one-way hashing algorithm that allows us to 
    // store strings on the database rather than the raw
    // passwords. Check out the docs for more detail
    if (bcrypt.compareSync(password, user.password)) {
      return user.authorize();
    }

    throw new Error('invalid password');
  }

  // in order to define an instance method, we have to access
  // the User model prototype. This can be found in the
  // sequelize documentation
  User.prototype.authorize = async function () {
    const { AuthToken } = sequelize.models;
    const user = this

    // create a new auth token associated to 'this' user
    // by calling the AuthToken class method we created earlier
    // and passing it the user id
    const authToken = await AuthToken.generate(this.id);

    // addAuthToken is a generated method provided by
    // sequelize which is made for any 'hasMany' relationships
    await user.addAuthToken(authToken);

    return { user, authToken }
  };
  return User;
};

// database/models/user.js