module.exports = (sequelize, Sequelize) => {
    const phoneinterviews = sequelize.define("phoneinterviews", {
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
      video_url: {
        type: Sequelize.STRING
      },
      content_type:{
        type:Sequelize.STRING
      } 
    });
  
    return phoneinterviews;
  };
