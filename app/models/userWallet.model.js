module.exports = (sequelize, Sequelize) => {
    const UserWallet = sequelize.define("user_wallet", {
      user_id: {
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.STRING
      },      
    });
  
    return UserWallet;
  };