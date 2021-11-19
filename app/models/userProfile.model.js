module.exports = (sequelize, Sequelize) => {
	const UserProfile = sequelize.define("user_profile", {
	  user_id: {
	    type: Sequelize.INTEGER
	  },
	  dob: {
	    type: Sequelize.STRING
	  },
	  work: {
	    type: Sequelize.STRING
	  },
	  gender: {
	    type: Sequelize.STRING
	  },
	  company_name: {
	    type: Sequelize.STRING
	  },
	  company_type: {
	    type: Sequelize.STRING
	  },
	  type_of_truck_deal: {
	    type: Sequelize.STRING
	  },
	  service_tax: {
	    type: Sequelize.STRING
	  },
	  image: {
	    type: Sequelize.STRING
	  },
	  voter_id: {
	    type: Sequelize.STRING
	  },
	  license: {
	    type: Sequelize.STRING
	  },
	  pancard: {
	    type: Sequelize.STRING
	  },
	  address1: {
	    type: Sequelize.STRING
	  },
	  address2: {
	    type: Sequelize.STRING
	  },
	  zipcode: {
	    type: Sequelize.STRING
	  },
	  country: {
	    type: Sequelize.STRING
	  },
	  state: {
	    type: Sequelize.STRING
	  },
	  district: {
	    type: Sequelize.STRING
	  },
	  city: {
	    type: Sequelize.STRING
	  },
	  area: {
	    type: Sequelize.STRING
	  },
	  is_available: {
        type: Sequelize.BOOLEAN
      },
      is_assigned: {
        type: Sequelize.BOOLEAN
      }
	});

	return UserProfile;
	};