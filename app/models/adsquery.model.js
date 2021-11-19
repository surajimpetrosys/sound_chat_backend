module.exports = (sequelize, Sequelize) => {

	const adsquery = sequelize.define("adsquery", {
	  query_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
      },
      user_name: {
	    type: Sequelize.STRING
	  },
	  subject: {
	    type: Sequelize.STRING
	  },
	  email: {
	    type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.STRING
      },
      reply_message: {
        type: Sequelize.STRING
      },
      query_status: {
        type: Sequelize.STRING
      }
	});

	return adsquery;
	};


