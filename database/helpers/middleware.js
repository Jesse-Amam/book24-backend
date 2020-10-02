const { User, AuthToken } = require('../models');

let checkToken = async(req, res, next) => {

  // look for an authorization header or auth_token in the cookies
  let token = req.headers["x-access-token"] || req.headers["authorization"] || null; // Express headers are auto converted to lowercase

  // if a token is found we will try to find it's associated user
  // If there is one, we attach it to the req object so any
  // following middleware or routing logic will have access to
  // the authenticated user.
  if (token) {
    if (token.startsWith("Bearer ")) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
      }
    // look for an auth token that matches the cookie or header
    const authToken = await AuthToken.findOne(
      { where: { token }, include: User }
    );

    // if there is an auth token found, we attach it's associated
    // user to the req object so we can use it in our routes
    if (authToken) {
      req.user = authToken.User;
      next();
    }else {
        return res.status(401).send({
          message: "Unauthorized"
        });
      }
  }else {
    return res.status(401).send({
      message: "Unauthorized"
    });
  }
  
}

let checkIfHotel = async(req, res, next) => {

  // look for an authorization header or auth_token in the cookies
  let token = req.headers["x-access-token"] || req.headers["authorization"] || null; // Express headers are auto converted to lowercase

  // if a token is found we will try to find it's associated user
  // If there is one, we attach it to the req object so any
  // following middleware or routing logic will have access to
  // the authenticated user.
  if (token) {
    if (token.startsWith("Bearer ")) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
      }
    // look for an auth token that matches the cookie or header
    const authToken = await AuthToken.findOne(
      { where: { token }, include: User }
    );

    // if there is an auth token found, we attach it's associated
    // user to the req object so we can use it in our routes
    if (authToken) {
      req.user = authToken.User;
      const allowedRoles = ['hotel-admin','admin','super-admin'];
      if(allowedRoles.includes(req.user.role)){
        next();
      }else {
        return res.status(401).send({
          message: "Unauthorized"
        });
      }
      
    }else {
        return res.status(401).send({
          message: "Unauthorized"
        });
      }
  }else {
    return res.status(401).send({
      message: "Unauthorized"
    });
  }
  
}

module.exports = {
  checkToken: checkToken,
  checkIfHotel: checkIfHotel,
};