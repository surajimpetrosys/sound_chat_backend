module.exports = (sequelize, Sequelize) => {
    const studiointerviews = sequelize.define("studiointerviews", {
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
      video_url: {
        type: Sequelize.STRING
      },
      content_type:{
        type:Sequelize.STRING
      } 
    });
  
    return studiointerviews;
  };