module.exports = (sequelize, Sequelize) => {
    const scheduleperday = sequelize.define("scheduleperday", {
        show_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true 
          }, 
          show_name: {
            type: Sequelize.STRING
          },        
          show_image: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: null
          },     
          show_start_date: {
            type: Sequelize.STRING
          },
          show_end_date: {
            type: Sequelize.STRING
          },
          show_audio_url: {
            type: Sequelize.STRING
          },
          show_description: {
            type: Sequelize.STRING
          },
          day_id: {
            type: Sequelize.INTEGER
          }
    });
  
    return scheduleperday;
  };
