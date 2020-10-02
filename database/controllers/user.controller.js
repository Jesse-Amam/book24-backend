const Captcha = require("node-captcha-generator");
let jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
// const db = require("../models");
// const User = db.User;
const { User } = require('../models');
//const Op = db.Sequelize.Op;

// Signup...
exports.create = async(req, res) => {
  let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let passwordReg = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
  );
  //console.log(req)
  if (!req.body.full_name) {
    return res.status(400).send({
      message: "Full Name field can not be empty"
    });
  } else if (!req.body.mobile_number) {
    return res.status(400).send({
      message: "Mobile number field can not be empty"
    });
  }else if (!req.body.username) {
    return res.status(400).send({
      message: "Username is required"
    });
  } else if (!req.body.password || !passwordReg.test(req.body.password)) {
    return res.status(400).send({
      message:
        "Password field can not be empty, must be equal to or greater than 8 characters, must contain a lowercase letter at least, must contain an uppercase letter, .mustcontain a number"
    });
  } else if (!req.body.email || !emailReg.test(req.body.email)) {
    return res.status(400).send({
      message: "Email field can not be empty and must be a valid email address"
    });
  }
      // Save user in the database
      try {
        // create a new user with the password hash from bcrypt
        let user = await User.create(req.body);
    
        // data will be an object with the user and it's authToken
        let data = await user.authorize();
    
        // send back the new user and auth token to the
        // client { user, authToken }
        return res.json(data);
    
      } catch(err) {
          console.log(err)
        return res.status(400).send(err);
      }
};

//update profile
exports.updateProfile = (req, res) => {
  //console.log(req)
  if (
    req.body.email ||
    req.body.password ||
    req.body.country_id ||
    req.body.state_id
  ) {
    return res.status(403).send({
      message: "Unauthorized update"
    });
  } else if (!req.body.user_id) {
    return res.status(400).send({
      message: "User Id field can not be empty"
    });
  } else {
    Object.keys(req.body).forEach(function(key, index) {
      User.findByIdAndUpdate(
        req.body.user_id,
        {
          [key]: req.body[key]
        },
        { new: true }
      )
        .then(user => {
          if (!user) {
            return res.status(404).send({
              message: "User not found with id " + req.body.user_id
            });
          }
          res.send(user);
        })
        .catch(err => {
          if (err.kind === "ObjectId") {
            return res.status(404).send({
              message: "User not found with id " + req.body.user_id
            });
          }
          return res.status(500).send({
            message: "Error updating user with id " + req.body.user_id
          });
        });
    });
  }
};

// Login
exports.login = async(req, res) => {
  let regg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (
    !req.body.password &&
    !req.body.email 
  ) {
    return res.status(400).send({
      message: "Invalid Credentials"
    });
  }
  try {
    let user = await User.authenticate(req.body.email, req.body.password)

    user = await user.authorize();

    return res.json(user);

  } catch (err) {
    return res.status(400).send('invalid username or password');
  }

};
//
exports.findAllPaginated = async (req, res, next) => {
  const pageNo = req.query.page || 1;
  const perPage = 10;
  if (pageNo < 0 || pageNo === 0) {
    res.status(400).send({
      message: "Invalid Page Number, should start  with 1"
    });
  }
  try {
    const options = {
      page: pageNo,
      limit: perPage,
      sort: { createdAt: -1 },
      collation: {
        locale: "en"
      }
    };

    const users = await User.paginate({}, options);
    if (!users) {
      const error = new Error("Users not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      users
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
  User.find()
    .sort("-createdAt")
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the users."
      });
    });
};

exports.findByRole = (req, res) => {
  if (
    !req.body.role
    //       || !Number.isInteger(req.body.zipcode)
  ) {
    return res.status(400).send({
      message: "No role provided"
    });
  }
  User.find({ role: req.body.role })
    .sort("-updatedAt")
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the admins."
      });
    });
};

// Find a single user with token
exports.me = (req, res) => {
    if (req.user) {
        return res.send(req.user);
      }else{
              return res.status(404).send(
        { message: 'missing token'}
      );  
      }

  };

// Find a single user with a userId
exports.findOne = async(req, res) => {
    try {
        const { user_id } = req.params;
        const user = await User.findOne({
          where: { id: user_id },
        });
        if (user) {
          return res.status(200).json({ user });
        }
        return res.status(404).send('User with the specified ID does not exists');
      } catch (error) {
        return res.status(500).send(error.message);
      }
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.user_id)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.user_id
        });
      }
      res.send({ message: "User deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "User not found with id " + req.params.user_id
        });
      }
      return res.status(500).send({
        message: "Could not delete User with id " + req.params.user_id
      });
    });
};

//for merchant signup. Will return captcha image in base64 and the actual value for cross referencing
exports.getCaptcha = (req, res, next) => {
  const { value, base64Value } = generateCaptcha();
  res.status(200).json({ value, base64Value });
};

exports.verifyAccount = async (req, res, next) => {
  const userId = req.param.user_id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("Invalid user");
      error.statusCode = 500;
      throw error;
    }
    //user found
    //generateToken
    const verificationCode = jwt.sign({ userId: userId }, config.secret);

    user.verification_code = verificationCode;

    //save the verification code for cross reference later
    await user.save();

    //send the verifcation email
    const verificationUrl = `${configenv.variables.baseUrl}/complete-verification/${verificationCode}`;
    const plainText = `Please click on ${verificationCode} to complete verification`;
    const html = `Please click <a href="${verificationUrl}">here</a> link to complete email verification`;

    const transportObject = {
      receiver: user.email,
      subject: "Account Verification",
      text: plainText,
      html: html
    };

    //send email
    const sendEmail = mailHelper.sendMail(transportObject);
    if (sendEmail) {
      res
        .status(200)
        .json({ message: "Verification link has been sent to the user" });
    } else {
      res.status(500).json({
        message: "An error occurred while trying to send verification email."
      });
    }
  } catch (err) {
    if (!error.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.completeVerification = async (req, res, next) => {
  const verificationCode = req.params.verification_code;
  try {
    // decoded = jwt.verify(verificationCode, config.secret);
    // const userId = decoded.userId;

    //delete the verification if it is valid
    const user = await User.find({ verification_code: verificationCode });
    if (!user) {
      res.status(404).json({ message: "no user found for verification token" });
    }

    //user found
    user.verification_code = "";
    user.verified = true;

    await user.save();

    res.status(201).json({ message: "account verification successful" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const generateCaptcha = () => {
  let c = new Captcha({
    length: 5,
    size: {
      width: 450,
      height: 200
    }
  });

  const value = c.value;
  let base64Value;

  c.toBase64((err, base64) => {
    err && console.log(err);

    base64Value = base64;
  });

  return { value, base64Value };
};
