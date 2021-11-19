
const db = require("../models");
// const { interviews } = require("../models");
const Interviews = db.interviews;

var bcrypt = require("bcryptjs");

const multer = require("multer");
const upload = multer({
  dest: "/var/www/html/soundradiobackend/images/interviews/"
});
var uploadSingle = upload.any();
exports.listInterviews = (req, res) => {

 Interviews.findAll({  
    where : 
          { content_type : "free_content" },       
    order: [
            ['id', 'DESC'],            
        ]    
  })
  .then(noti1 => {      
    Interviews.findAll({  
      where : 
            { content_type : "premium_content" },       
      order: [
              ['id', 'DESC'],            
          ]    
    })
    .then(noti2 => {      
      Interviews.findAll({  
        where : 
              { interview_type : "YELLOW-TENT" },       
        order: [
                ['id', 'DESC'],            
            ]    
      })
      .then(noti4 => {      
        Interviews.findAll({  
          where : 
                { interview_type : "IN-STUDIO" },       
          order: [
                  ['id', 'DESC'],            
              ]    
        })
        .then(noti3 => {      
          res.send({ status:200,data: {free_content:noti1,premium_content:noti2,yellow_content:noti4,instudio:noti3}, message: "Interviews listed successfully!" });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}
Interviews.findAll({  
  where : 
        { content_type : "premium_content" },       
  order: [
          ['id', 'DESC'],            
      ]    
})
exports.addInterviews = (req, res) => {
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

        if (!mobileimage) {
          res.status(400).send({
            message: "poster can not be empty!"
          });
        }

       // if (!desktopimage) {
         // res.status(400).send({
            //message: "poster for desktop can not be empty!"
          //});
        //}

        if (!req.body.video_url) {
          res.status(400).send({
            message: "video_url can not be empty!"
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
        if (!req.body.interview_type) {
          res.status(400).send({
            message: "interview_type can not be empty!"
          });
        }

        Interviews.findAll({where : 
          {  video_url:req.body.video_url,feature_img: mobileimage}
        })
        .then(interviews => {      
            
            if(interviews.length > 0){              

              res.send({ status:400, message: "This interviews video_url/porter_image is already there!" });
            } else {

                // insert
                Interviews.create({
                  post_excerpt: req.body.post_content,
                  post_title: req.body.post_title,
                  video_url: req.body.video_url, 
                  content_type: req.body.content_type,
                  interview_type: req.body.interview_type,
                  //feature_img: desktopimage,
                  feature_img: mobileimage
                })
                .then(interviews => {

                  res.send({ status:200,data:interviews, message: "interviews added successfully!" }); 
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


exports.updateInterviews = (req, res) => {
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

        if (!req.body.interview_id) {
          res.send({
            status:400,
            message: "interview Id can not be empty!"
          });
        }
        let updateValues = {};


       if(mobileimage){
        updateValues['feature_img'] = mobileimage;
       }

       //if(desktopimage){
       // updateValues['feature_img'] = desktopimage;
      // }

      if(req.body.post_author){
        updateValues['post_author'] = req.body.post_author
      }
      if(req.body.post_content){
        updateValues['post_excerpt'] = req.body.post_content
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

      if(req.body.video_url){
        updateValues['video_url'] = req.body.video_url
      }

      if(req.body.content_type){
        updateValues['content_type'] = req.body.content_type
      }

      if(req.body.interview_type){
        updateValues['interview_type'] = req.body.interview_type
      }

        // insert
        Interviews.update(updateValues,{
          where : { id : req.body.interview_id }
        })
        .then(interviews => {

          res.send({ status:200,data:interviews, message: "interviews updated successfully!" });

                    
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
      })
}


exports.interviewDetail = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  
  Interviews.findOne({ 
    where: { id: req.body.interview_id },
    //attributes:['id','vehicle_type','vehicle_no'],
    order: [
            ['id', 'DESC'],            
        ]
  })
  .then(interviews => {      
    
      res.send({ status:200, data: interviews, message: "interviews details successfully!" });
    
  })
  .catch(err => {
          res.status(500).send({ message: err.message });
        });
}


exports.deleteInterviews = (req, res) => {

  if (!req.body.interview_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Interviews.findOne({ 
    where: { id: req.body.interview_id },    
  })
  .then(Interview => { 
      console.log(Interview);
      if(Interview){
        Interview.destroy({
            })
      }else{
          res.send({
              status:400,
              message: "Interview not found!"
            });
      }             
    
  })
  .then(interviews => {      
    
    res.send({ status:200, data: interviews, message: "interviews deleted successfully!" });
  
})
.catch(err => {
  res.status(500).send({ message: err.message });
});
  

}


exports.alldeleteInterviews = (req, res) => {

        Interviews.destroy({
          where: { },
          truncate: true
            })
      .then(interviews => {      
    
        res.send({ status:200, data: interviews, message: " all interviews deleted successfully!" });
      
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
      
    
    }
  

