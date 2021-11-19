

module.exports = (sequelize, Sequelize) => {
    const Reportmedia = sequelize.define("reportmedia", {
      media_name: {
        type: Sequelize.STRING
      },
      id_report: {
        type: Sequelize.INTEGER
      },      
    });
  
    return Reportmedia;
  };
