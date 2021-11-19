module.exports = (sequelize, Sequelize) => {

    const adsquerymedia = sequelize.define("adsquerymedia", {
      media_name: {
        type: Sequelize.STRING
      },
      id_query: {
        type: Sequelize.INTEGER
      },      
    });
  
    return adsquerymedia;
  };

