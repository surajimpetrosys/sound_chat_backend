module.exports = (sequelize, Sequelize) => {
    const audio = sequelize.define("audio", {
      audio_name: {
        type: Sequelize.STRING
      },
audio: {
        type: Sequelize.STRING
      },

      album_id: {
        type: Sequelize.INTEGER
      },      
    });
  
    return audio;
  };
