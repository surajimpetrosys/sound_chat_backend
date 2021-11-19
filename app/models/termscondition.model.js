module.exports = (sequelize, Sequelize) => {
    const termscondition = sequelize.define("termscondition", {
      content_type: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      }
    });
  
    return termscondition;
  };
