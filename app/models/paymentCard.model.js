module.exports = (sequelize, Sequelize) => {
    const paymentCard = sequelize.define("payment_card", {
      name: {
        type: Sequelize.STRING
      },
      card_no: {
        type: Sequelize.STRING
      }, 
      last_digit: {
        type: Sequelize.STRING
      },  
      cvv: {
        type: Sequelize.STRING
      }, 
      expire_month: {
        type: Sequelize.STRING
      },    
      expire_year: {
        type: Sequelize.STRING
      },    
      user_id: {
        type: Sequelize.INTEGER
      },     
      is_primary: {
        type: Sequelize.BOOLEAN
      },  
    });
  
    return paymentCard;
  };