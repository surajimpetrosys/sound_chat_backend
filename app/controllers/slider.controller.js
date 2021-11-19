
const db = require("../models");
const multer = require("multer");
const upload = multer({
  dest: "/var/www/html/soundradiobackend/images"
});
var uploadSingle = upload.any();
const Liveradio = db.liveradio;
const Instudiointerviews = db.studiointerviews;
const Phoneinterviews = db.phoneinterviews;
const Soundchatlive = db.soundchatlive;
const Sundayschedule = db.sundayschedule;
const gelleries = db.gelleries;
const podcast = db.podcast;
const slider = db.slider;
exports.homeslider = (req, res) => {

    slider.findAll({      
    where: { slider_id: req.body.slider_id },   
    order: [
            ['id', 'DESC'],            
        ]    
  })
  .then(noti => {      
    
      res.send({ status:200,data: noti, message: "homeslider listed successfully!" });
    
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
  
}


exports.addslider = (req, res) => {


  uploadSingle(req,res,function(err){

       var mobileimgae = ''; var desktopimage = '';
       if(req.files){
           for (i = 0; i < req.files.length; i++) {
             if(req.files[i].fieldname == 'mobileimage'){
               mobileimgae = (req.files[i].filename);
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

       if (!req.body.title) {
        res.status(400).send({
          message: "title can not be empty!"
        });
      }
    
if (!mobileimage) {
        res.status(400).send({
          message: "image can not be empty!"
        });
      }

      slider.create({
        title: req.body.title, 
        img: mobileimgae,
        //desktopimage: desktopimage,
	slider_id:"1"
      })
        .then(feature => {
          // insert notifications
    
          res.send({ status: 200, data: feature, message: "Slider Image added successfully!" });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
       

  });    

}

exports.updateslider = (req, res) => {


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
            return;
       }

       if (!req.body) {
         res.status(400).send({
           message: "Content can not be empty!"
         });
       }

       if (!req.body.id) {
         res.send({
           status:400,
           message: "Id can not be empty!"
         });
       }
       let updateValues = {};


       if(mobileimage){
        updateValues['img'] = mobileimage;
       }

       if(desktopimage){
        updateValues['desktopimage'] = desktopimage;
       }
       if(req.body.title){
         updateValues['title'] = req.body.title
       }
       
       // update
       slider.update(updateValues,{
         where: {
           id: req.body.id
         }
       })
       .then(driver => { 

        slider.findOne({
             where: { id: req.body.id }
         })
         .then(drivers => {                  
             res.send({ status:200, data: drivers, message: " updated successfully!" });            
         });

         
       })
       .catch(err => {
         res.status(500).send({ message: err.message });
       });
  });    

}



exports.deleteslider = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  if (!req.body.id) {
    res.status(400).send({
      message: "slider_id can not be empty!"
    });
  }

  
  slider.findOne({ 
    where: { id: req.body.id },
  })
  .then(noti => { 
      if(noti){
        noti.destroy({

            }).
            then(c =>{

                res.send({ status:200,message: " Slider deleted successfully!" });  
            })
      }else{
          res.send({
              status:400,
              message: "id not found!"
            });
      }             
    
  });
  

}




exports.sliderdetails = (req, res) => {

  if (!req.body) {
  res.status(400).send({
  message: "Content can not be empty!"
  });
  }
  
  
  slider.findOne({ 
  where: { id: req.body.id },
  //attributes:['id','vehicle_type','vehicle_no'],
  order: [
        ['id', 'DESC'],            
    ]
  })
  .then(Sundayschedule => {      
  
  res.send({ status:200, data: Sundayschedule, message: "slider details is here!" });
  
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
  
  
  }
