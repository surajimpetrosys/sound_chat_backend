module.exports = (sequelize, Sequelize) => {
    const mondayschedule = sequelize.define("mondayschedule", {
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
      },
      show_time:{
        type:Sequelize.STRING
      },
      show_day:{
        type:Sequelize.STRING
      }  
    });
  
    return mondayschedule;
  };