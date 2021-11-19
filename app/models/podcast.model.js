module.exports = (sequelize, Sequelize) => {
    const podcast = sequelize.define("podcast", {
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
      post_type: {
        type: Sequelize.STRING
      },
      iframe_link: {
          type: Sequelize.STRING
      },
      description: {
          type: Sequelize.STRING
      },
      featured_img: {
          type: Sequelize.STRING
      }
    });
  
    return podcast;
  };