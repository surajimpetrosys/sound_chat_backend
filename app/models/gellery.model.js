module.exports = (sequelize, Sequelize) => {
    const gelleries = sequelize.define("gelleries", {
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
      // img_gallery_pic: {
      //     type: Sequelize.JSON
      // },
      img_gallery_pic: { 
        type: Sequelize.STRING, 
        get: function() {
            return JSON.parse(this.getDataValue('img_gallery_pic'));
        }, 
        set: function(val) {
            return this.setDataValue('img_gallery_pic', JSON.stringify(val));
        }
    }
    });
  
    return gelleries;
  };
  
