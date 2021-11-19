module.exports = (sequelize, Sequelize) => {
    const subscriber = sequelize.define("subscriber", {
      user_id: {
        type: Sequelize.INTEGER,
            primaryKey: true
      },
     subscription_id:{
      type: Sequelize.STRING
      }, 
      plan_id: {
        type: Sequelize.STRING
      },
      amount:{
        type: Sequelize.DOUBLE,
      },
      currency_type:{
        type: Sequelize.STRING
      },
      plan_type:{
        type: Sequelize.STRING
      },
      plan_level:{
        type: Sequelize.STRING
      },
      customer_id: {
        type: Sequelize.STRING
      },
      subscription_method: {
        type: Sequelize.STRING
      },
      invoice_id: {
        type: Sequelize.STRING
      },   
      payment_status: {
        type: Sequelize.STRING
      },
      stripe_status:{
        type: Sequelize.STRING
      },   
      plan_expired: {
        type: Sequelize.DATE
      },
      plan_active: {
        type: Sequelize.DATE
      },
      plan_cancel: {
        type: Sequelize.DATE
      }
    });
  
    return subscriber;
  };

