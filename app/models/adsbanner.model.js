const  { adsbanner } = require(".");

module.exports = (sequelize, Sequelize) => {
    const adsbanner = sequelize.define("adsbanner", {
      post_author: {
        type: Sequelize.STRING
      }, 
      post_content: {
        type: Sequelize.STRING
      },        
      post_title: {
        type: Sequelize.STRING
      },     
      post_excerpt: {
        type: Sequelize.STRING
      },
      post_name: {
        type: Sequelize.STRING
      },
      guid: {
        type: Sequelize.STRING
      },
      menu_order: {
        type: Sequelize.STRING
      },
      post_type: {
        type: Sequelize.STRING
      },
      mobilebanner: {
        type: Sequelize.STRING
      },
      desktopbanner: {
        type: Sequelize.STRING
      }
    });
  
    return adsbanner;
  };
