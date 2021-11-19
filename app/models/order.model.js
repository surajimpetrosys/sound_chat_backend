module.exports = (sequelize, Sequelize) => {
	const Order = sequelize.define("order", {
	  order_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
      },
      user_id: {
	    type: Sequelize.INTEGER
	  },
	  first_name: {
	    type: Sequelize.STRING
	  },
	  last_name: {
	    type: Sequelize.STRING
      },
      address_1: {
        type: Sequelize.STRING
      },
      address_2: {
        type: Sequelize.STRING
      },
      city: {
          type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      postcode: {
        type: Sequelize.STRING
      },
	  country: {
	    type: Sequelize.STRING
	  },
	  email: {
	    type: Sequelize.STRING
	  },
	  phone: {
	    type: Sequelize.STRING
      },
      items:{
          type:Sequelize.JSON
      },
	  discount: {
        type: Sequelize.FLOAT
      },
      total_amount: {
        type: Sequelize.FLOAT
      },
      payment_method: {
        type: Sequelize.STRING
      },
      transaction_id: {
        type: Sequelize.STRING
      },
      transaction_status: {
        type: Sequelize.STRING
      },
order_status: {
        type: Sequelize.STRING
      }
	});

	return Order;
	};
