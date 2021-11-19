var bcrypt = require("bcryptjs");

module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define("admins", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      mobileno: {
        type: Sequelize.STRING,
        unique: true
      },
      verification_link: {
        type: Sequelize.STRING
      },
      link_expire: {
        type: Sequelize.STRING
      },
      is_verify: {
        type: Sequelize.BOOLEAN
      },
      is_activated: {
        type: Sequelize.BOOLEAN,
        defaultValue: '1'
      },
      reason: {
        type: Sequelize.STRING
      },
      reason_message: {
        type: Sequelize.TEXT
      },
      is_online: {
        type: Sequelize.BOOLEAN
      },
      admin_id: {
        type: Sequelize.STRING
      },
      customer_id: {
        type: Sequelize.STRING
      },
      wallet: {
        type: Sequelize.INTEGER
      },
      jwt_token:{
        type: Sequelize.STRING,
        defaultValue: 'NULL'
      }
    });

    (async () => {
      await sequelize.sync({ force: false });
      Admin.findAll()
      .then(admins => {      
          if(admins.length>0)
          {
            console.log('admin already is there')
          }else{
            Admin.bulkCreate([
              {username: 'admin', email: 'hatim.makki@gmail.com',password: bcrypt.hashSync(String('admin@123'), 8), mobileno: '+919988776655',is_verify : '1', is_activated : '1'},
            ], { validate: true }).catch(function(errors) {
              console.log(errors)
            })
          }        
      });
      
    })();
  
    return Admin;
  };
