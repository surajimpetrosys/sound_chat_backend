module.exports = (sequelize, Sequelize) => {

	const Report = sequelize.define("report", {
	  report_id: {
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
      report_status: {
        type: Sequelize.STRING
      }
	});

	return Report;
	};

