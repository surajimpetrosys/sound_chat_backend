module.exports = (sequelize, Sequelize) => {
    const plan = sequelize.define("plan", {
      plan_type: {
        type: Sequelize.STRING
      }, 
      duration: {
        type: Sequelize.STRING
      },        
      plan_fee: {
        type: Sequelize.STRING
      }
    });
  
    return plan;
  };
