module.exports = (sequelize, Sequelize) => {

    const productavailability = sequelize.define("productavailability", {
      color: {
        type: Sequelize.STRING
      },
      hexcode: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      avaibility: {
        type: Sequelize.INTEGER
      },
      Image: {
        type: Sequelize.STRING
      },
      id_product: {
        type: Sequelize.INTEGER
      },      
    });
  
    return productavailability;
  };
