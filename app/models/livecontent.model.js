module.exports = (sequelize, Sequelize) => {
    const livecontent = sequelize.define("livecontent", {
      content_type: {
        type: Sequelize.STRING
      }, 
      title: {
        type: Sequelize.STRING
      },        
      livelink: {
        type: Sequelize.STRING
      }
    });
  
    return livecontent;
  };
