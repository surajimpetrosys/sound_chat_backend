module.exports = (sequelize, Sequelize) => {
    const Usernew = sequelize.define("usernews", {
          id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
          },
          user_login: {
            type: Sequelize.STRING
          },
          user_pass: {
            type: Sequelize.STRING
          },
          user_nicename: {
            type: Sequelize.STRING
          },
          user_email: {
            type: Sequelize.STRING
          },
          user_registered:{
            type: Sequelize.DATE
          },
          user_activation_key:{
            type: Sequelize.STRING
          },
          user_status:{
            type: Sequelize.INTEGER
          },
          display_name:{
            type: Sequelize.STRING
          }
    });
  
    return Usernew;
  };