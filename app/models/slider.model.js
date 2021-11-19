module.exports = (sequelize, Sequelize) => {
    const slider = sequelize.define("slider", {
      slider_id: {
        type: Sequelize.INTEGER
      },       
      title: {
        type: Sequelize.STRING
      },
      img: {
          type: Sequelize.STRING
      },
      desktopimage: {
        type: Sequelize.STRING
    }
    });
  
    return slider;
  };
