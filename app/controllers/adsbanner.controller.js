
const db = require("../models");

const adsbanner = db.adsbanner;
const multer = require("multer");
const upload = multer({
  dest: "/var/www/html/soundradiobackend/images/"
});
var uploadSingle = upload.any();
exports.bannerlist = (req, res) => {

    adsbanner.findAll({         
    order: [
            ['id', 'DESC'],            
        ]    
  })
  .then(noti => {      
    
      res.send({ status:200,data: noti, message: "Ads Banner listed successfully!" });
    
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
  
}

exports.addbanner = (req, res) => {


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
    
      adsbanner.create({
        post_author: req.body.post_author,
        post_content: req.body.post_content,
        post_title: req.body.post_title, 
        post_excerpt: req.body.post_excerpt,
        post_name: req.body.post_name,
        guid: req.body.guid,
        menu_order: req.body.menu_order,
        post_type: req.body.post_type,
        mobilebanner: mobileimage, 
        //desktopbanner: desktopimage
      })
        .then(feature => {
          // insert notifications
    
          res.send({ status: 200, data: feature, message: "adsbanner added successfully!" });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
       

  });    

}

exports.updatebanner = (req, res) => {


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
        updateValues['mobilebanner'] = mobileimage;
       }

       if(desktopimage){
        updateValues['desktopbanner'] = desktopimage;
       }
       
       // update
       adsbanner.update(updateValues,{
         where: {
           id: req.body.id
         }
       })
       .then(driver => { 

        adsbanner.findOne({
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



exports.deletebanner = (req, res) => {

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

  
  adsbanner.findOne({ 
    where: { id: req.body.id },    
  })
  .then(noti => { 
      if(noti){
        noti.destroy({

            }).
            then(c =>{

                res.send({ status:200,message: " banner deleted successfully!" });  
            })
      }else{
          res.send({
              status:400,
              message: "id not found!"
            });
      }             
    
  });
  

}








exports.bannerdetails = (req, res) => {

  if (!req.body) {
  res.status(400).send({
  message: "Content can not be empty!"
  });
  }
  
  
  adsbanner.findOne({ 
  where: { id: req.body.id },
  //attributes:['id','vehicle_type','vehicle_no'],
  order: [
        ['id', 'DESC'],            
    ]
  })
  .then(Sundayschedule => {      
  
  res.send({ status:200, data: Sundayschedule, message: "banner details is here!" });
  
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
  
  
  }
