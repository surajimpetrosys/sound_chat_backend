module.exports = (sequelize, Sequelize) => {

    const Review = sequelize.define("albumreview", {

      submitted_by: {

        type: Sequelize.STRING

      },

      email_id: {

        type: Sequelize.STRING

      },     
      review_title: {

        type: Sequelize.TEXT

      },
      rating: {

        type: Sequelize.INTEGER

      },
      review_content: {

        type: Sequelize.TEXT

      },

      album_id: {

        type: Sequelize.INTEGER

      },
      status: {

        type: Sequelize.BOOLEAN

      },
      available_for_public: {

        type: Sequelize.BOOLEAN

      }

    });

    return Review;

  };
