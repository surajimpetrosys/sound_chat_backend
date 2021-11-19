module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      fname: {
        type: Sequelize.STRING
      },
      lname: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      mobileno: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      profilepic: {
        type: Sequelize.STRING
      },
      coupon: {
        type: Sequelize.STRING
      },
      verification_link: {
        type: Sequelize.STRING
      },
      link_expire: {
        type: Sequelize.STRING
      },
      is_verify: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return User;
  };