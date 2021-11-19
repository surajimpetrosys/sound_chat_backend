
const db = require("../models");
const multer = require("multer");
const upload = multer({
  dest: "/var/www/html/soundradiobackend/images/"
});
var uploadSingle = upload.any();
const musicalbum = db.musicalbum;
const audio = db.audio;
const Review = db.albumreview;


// ====================================================================================================

exports.listmusicalbum = (req, res) => {

    musicalbum.findAll({         
    order: [
            ['id', 'DESC'],            
        ],
      include:[{
      model: audio,          
      //attributes: ['id','name']
      }]    
  })
  .then(noti => {      
    
      res.send({ status:200,data: noti, message: "music album listed successfully!" });
    
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
  

}


exports.addReview = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  if (!req.body.submitted_by) {
    res.send({
      status: 400,
      message: "user name can not be empty!"
    });
  }

  if (!req.body.review_content) {
    res.send({
      status: 400,
      message: "review_content can not be empty!"
    });
  }
  if (!req.body.email_id) {
    res.send({
      status: 400,
      message: "email id can not be empty!"
    });
  }
  if (!req.body.rating) {
    res.send({
      status: 400,
      message: "rating can not be empty!"
    });
  }


  let values = {
    submitted_by: req.body.submitted_by,
    email_id: req.body.email_id,
    review_title: req.body.review_title,
    rating: req.body.rating,
    review_content: req.body.review_content,
    album_id: req.body.album_id,
    status: 1,
    available_for_public: 0,
  };

    var wheredetails = {
      email_id: req.body.email_id,
      album_id: req.body.album_id
    }
  // insert review
  Review.findOne({
    where: wheredetails
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! You already submittted the review.!"
      });
      return;
    }
    else {
      Review.create(values)
        .then(rev => {

          res.send({ status: 200,data:rev, message: "Review Submitted successfully!" });

        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
    }
  })


}





exports.getReview = (req, res) => {

  // if (!req.body.user_id) {
  //   res.status(400).send({
  //     message: "user_id can not be empty!"
  //   });
  // }
  if (!req.body.album_id) {
    res.status(400).send({
      message: "album id can not be empty!"
    });
  }

  var where = { album_id: req.body.album_id };
 
  Review.findAll({
    where: where,
    order: [
      ['createdAt', 'DESC'],
    ],              
  })
    .then(review => {

        res.send({ status: 200, data: review, message: "Review listed successfully!" });

    });


}

exports.musicalbumdetails = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  
  musicalbum.findOne({ 
    where: { id: req.body.id },
    //attributes:['id','vehicle_type','vehicle_no'],
    order: [
            ['id', 'DESC'],            
        ],
    include:[{
      model: audio,          
      //attributes: ['id','name']
      }]
  })
  .then(musicalbum => {      
    
      res.send({ status:200, data: musicalbum, message: "music album details showing successfully!" });
    
  })
  .catch(err => {
          res.status(500).send({ message: err.message });
        });
}




exports.addmusicalbum = (req, res) => {
  uploadSingle(req,res,function(err){
        var mobileimage = ''; var desktopimage = ''; var music = [];
        if(req.files){
            for (i = 0; i < req.files.length; i++) {
              if(req.files[i].fieldname == 'mobileimage'){
                mobileimage = (req.files[i].filename);
              }
              if(req.files[i].fieldname == 'desktopimage'){
                desktopimage = (req.files[i].filename);
              }

              if (req.files[i].fieldname == 'musicalbum') {
                music.push((req.files[i].filename));
          }
            } 
        }

        if(err){
            res.json({error_code:1,err_desc:err});
            
        }
        if (!req.body) {
          res.status(400).send({
            message: "Content can not be empty!"
          });
        }

        if (!mobileimage) {
          res.status(400).send({
            message: "poster for mobile can not be empty!"
          });
        }

        if (!desktopimage) {
          res.status(400).send({
            message: "poster for desktop can not be empty!"
          });
        }

        if (!req.body.post_content) {
          res.status(400).send({
            message: "post_content can not be empty!"
          });
        }
        if (!req.body.post_title) {
          res.status(400).send({
            message: "post_title can not be empty!"
          });
        }
        if (!req.body.content_type) {
          res.status(400).send({
            message: "content_type can not be empty!"
          });
        }
        if (!req.body.shows) {
          res.status(400).send({
            message: "shows can not be empty!"
          });
        }

        musicalbum.findAll({where : 
          { post_title:req.body.post_title,feature_img: mobileimage,feature_img_desktop: desktopimage}
        })
        .then(interviews => {      
            
            if(interviews.length > 0){              

              res.send({ status:400, message: "This porter_image is already there!" });
            } else {

                // insert
                musicalbum.create({
                  post_content: req.body.post_content,
                  post_title: req.body.post_title, 
                  content_type: req.body.content_type,
                  shows: req.body.shows,
                  feature_img: mobileimage,
                  feature_img_desktop: desktopimage
                })
                .then(interviews => {
            for (i = 0; i < music.length; i++) {
              audio.create({
                  audio_name: music[i],
                  audio:req.body.post_title, 
                  album_id: interviews.id,
              })
          }
                  res.send({ status:200,data:interviews, message: "Album added successfully!" }); 
                })
                .catch(err => {
                  res.status(500).send({ message: err.message });
                });

            }
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });

      })

}

exports.updatemusicalbum = (req, res) => {
  uploadSingle(req,res,function(err){
        var mobileimage = ''; var desktopimage = '';
        if(req.files){
            for (i = 0; i < req.files.length; i++) {
              if(req.files[i].fieldname == 'mobileimage'){
                mobileimage = (req.files[i].filename);
              }
              if(req.files[i].fieldname == 'desktopimage'){
                desktopimage = (req.files[i].filename);
              }
            } 
        }

        if(err){
            res.json({error_code:1,err_desc:err});
            
        }

        if (!req.body) {
          res.status(400).send({
            message: "Content can not be empty!"
          });
        }

        if (!req.body.id) {
          res.send({
            status:400,
            message: "album Id can not be empty!"
          });
        }
        let updateValues = {};


       if(mobileimage){
        updateValues['feature_img'] = mobileimage;
       }

       if(desktopimage){
        updateValues['feature_img_desktop'] = desktopimage;
       }

      if(req.body.post_author){
        updateValues['post_author'] = req.body.post_author
      }
      if(req.body.post_content){
        updateValues['post_content'] = req.body.post_content
      }
      if(req.body.post_title){
        updateValues['post_title'] = req.body.post_title
      }

       if(req.body.post_excerpt){
        updateValues['post_excerpt'] = req.body.post_excerpt
      }

      if(req.body.post_name){
        updateValues['post_name'] = req.body.post_name
      }

      if(req.body.guid){
        updateValues['guid'] = req.body.guid
      }

      if(req.body.menu_order){
        updateValues['menu_order'] = req.body.menu_order
      }

      if(req.body.post_type){
        updateValues['post_type'] = req.body.post_type
      }

      if(req.body.content_type){
        updateValues['content_type'] = req.body.content_type
      }

      if(req.body.shows){
        updateValues['shows'] = req.body.shows
      }

        // insert
        musicalbum.update(updateValues,{
          where : { id : req.body.id }
        })
        .then(interviews => {

          res.send({ status:200,data:interviews, message: "Album updated successfully!" });

                    
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
      })
}



exports.deletemusicalbum = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  if (!req.body.id) {
    res.status(400).send({
      message: "id can not be empty!"
    });
  }

  
  musicalbum.findOne({ 
    where: { id: req.body.id },    
  })
  .then(noti => { 
      if(noti){
        noti.destroy({

            }).
            then(c =>{

                res.send({ status:200,message: "Album deleted successfully!" });  
            })
      }else{
          res.send({
              status:400,
              message: "id not found!"
            });
      }             
    
  });
  

}
