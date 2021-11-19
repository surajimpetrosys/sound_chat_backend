module.exports = (sequelize, Sequelize) => {
	const Product = sequelize.define("product", {
	  product_id: {
	    type: Sequelize.INTEGER
	  },
	  title: {
	    type: Sequelize.STRING
	  },
	  description: {
	    type: Sequelize.STRING
      },
      SKU: {
        type: Sequelize.STRING
      },
      Price: {
        type: Sequelize.STRING
      },
      currency: {
          type: Sequelize.STRING
      },
      Discount: {
        type: Sequelize.STRING
      },
      Quantity: {
        type: Sequelize.STRING
      },
	  size: {
	    type: Sequelize.STRING
	  },
	  color: {
	    type: Sequelize.STRING
	  },
	  catogery: {
	    type: Sequelize.STRING
      },
      image:{
          type:Sequelize.STRING
      },
	  Shop: {
        type: Sequelize.STRING
      },
      Published_At: {
        type: Sequelize.DATE
      },
      Starts_At: {
        type: Sequelize.DATE
      },
      Ends_At: {
        type: Sequelize.DATE
      }
	});

	return Product;
	};