module.exports = (sequelize, Sequelize) => {
    const musicalbum = sequelize.define("musicalbum", {
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
          feature_img_desktop: {
            type: Sequelize.STRING
          },
          content_type:{
            type:Sequelize.STRING
          },
          review_count:{
            type:Sequelize.DOUBLE
          },
          smg_count:{
            type:Sequelize.DOUBLE
          },
          shows: {
              type:Sequelize.JSON
          }
    });
  
    return musicalbum;
  };
