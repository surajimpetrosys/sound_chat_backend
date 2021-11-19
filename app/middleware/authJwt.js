const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Admin = db.admin;

adminverifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
  });
  Admin.findOne({
    where: {
      jwt_token: token
    }
  }).then(user => {
      if (!user) {
        return res.send({ status:400,message: "Admin Not found with this token or You Logged Out" });
      }
      next();
    })
};
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

isFreemium = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Freemium") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Freemium Role!"
      });
    });
  });
};

isPremium = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "Premium") {
            next();
            return;
          }
        }
  
        res.status(403).send({
          message: "Require Premium Role!"
        });
      });
    });
  };
  isPremiumPlus = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "PremiumPlus") {
            next();
            return;
          }
        }
  
        res.status(403).send({
          message: "Require PremiumPlus Role!"
        });
      });
    });
  };

isAdminOrother = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "PremiumPlus") {
          next();
          return;
        }

        if (roles[i].name === "Premium") {
            next();
            return;
          }
          if (roles[i].name === "Freemium") {
            next();
            return;
          }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require a valid role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  adminverifyToken: adminverifyToken,
  isAdmin: isAdmin,
  isFreemium: isFreemium,
  isPremium: isPremium,
  isPremiumPlus: isPremiumPlus,
  isAdminOrother: isAdminOrother
};
module.exports = authJwt;
