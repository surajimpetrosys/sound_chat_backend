module.exports = (sequelize, Sequelize) => {
    const schedule = sequelize.define("schedule", {
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
          feature_img: {
            type: Sequelize.STRING
          },
          content_type:{
            type:Sequelize.STRING
          },
          shows: {
              type:Sequelize.JSON
          }
    });
  
    return schedule;
  };