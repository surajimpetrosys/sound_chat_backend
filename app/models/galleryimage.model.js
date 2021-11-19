module.exports = (sequelize, Sequelize) => {

    const galleryimage = sequelize.define("galleryimage", {
      image_name: {
        type: Sequelize.STRING
      },
      gallery_id: {
        type: Sequelize.INTEGER
      },      
    });
  
    return galleryimage;
  };
