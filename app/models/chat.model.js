module.exports = (sequelize, Sequelize) => {
    const Chat = sequelize.define("chat", {
      sender_id: {
        type: Sequelize.INTEGER
      },  
      receiver_id: {
        type: Sequelize.INTEGER
      }, 
      chat_id: {
        type: Sequelize.STRING
      },      
      type: {
        type: Sequelize.INTEGER
      },       
      message: {
        type: Sequelize.STRING
      }, 
      status: {
        type: Sequelize.BOOLEAN
      },
      trip_id: {
        type: Sequelize.INTEGER
      },      
    });
  
    return Chat;
  };
