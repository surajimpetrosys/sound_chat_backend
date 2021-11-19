module.exports = (sequelize, Sequelize) => {
    const notification = sequelize.define("notification", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }, 
      type: {
        type: Sequelize.STRING
      },        
      user_id: {
        type: Sequelize.INTEGER
      },     
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: '0'
      },  
    });
  
    return notification;
  };