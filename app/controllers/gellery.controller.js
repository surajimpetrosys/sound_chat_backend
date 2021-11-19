const db = require("../models");
var nodemailer = require("nodemailer");

const gelleries = db.gelleries;
const gallery_images = db.galleryimage;
const report = db.report;
const reportmedia = db.reportmedia;

const adsquery = db.adsquery;
const adsquerymedia = db.adsquerymedia;


const multer = require("multer");
const upload = multer({
  dest: "/var/www/html/soundradiobackend/images/gallery/"
});

var smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: 'anil.mpixbrand@gmail.com',
         pass: 'Anil2@2@'
     }
 });

var uploadSingle = upload.any();
exports.listgallery = (req, res) => {

    gelleries.findAll({         
    order: [
            ['id', 'DESC'],            
        ],
include: [
      {
        model: gallery_images,
        attributes: ['image_name', 'gallery_id']
      },
    ]    
  })
  .then(noti => {      
    
      res.send({ status:200,data: noti, message: "galleries listed successfully!" });
    
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
  
}


exports.addgallery = (req, res) => {
  uploadSingle(req,res,function(err){
console.log(req.files);
            console.log(req);
  var mobileimage = ''; var desktopimage = ''; var image = [];
        if(req.files){
            for (i = 0; i < req.files.length; i++) {
              if(req.files[i].fieldname == 'mobileimage'){
                mobileimage = (req.files[i].filename);
              }
              if(req.files[i].fieldname == 'desktopimage'){
                desktopimage = (req.files[i].filename);
              }

              if (req.files[i].fieldname == 'gallery_pics') {
                    image.push((req.files[i].filename));
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

       // if (!desktopimage) {
         // res.status(400).send({
           // message: "poster for desktop can not be empty!"
          //});
        //}

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
        if (!req.body.img_gallery_pic) {
          res.status(400).send({
            message: "gallery pics can not be empty!"
          });
        }

  gelleries.findAll({where : 
    { post_title: req.body.post_title,post_content: req.body.post_content}
  })
  .then(Liveradios => {      
      
      if(Liveradios.length > 0){              

        res.send({ status:400, message: "post title/content  already is there!" });
      } else {

          // insert
          gelleries.create({
            post_author: req.body.post_author,
            post_content: req.body.post_content,
            post_title: req.body.post_title, 
            feature_img: mobileimage,
            //feature_img_desktop: desktopimage,
            img_gallery_pic: req.body.img_gallery_pic
          })
          .then(Liveradios => {
console.log(image);
            console.log(image.length);
            for (i = 0; i < image.length; i++) {
              gallery_images.create({
                  image_name: image[i],
                  gallery_id: Liveradios.id,
              })
          }
            res.send({ status:200,message: "Gallery added successfully!" }); 
          })

      }
  })
  .catch(err => {
                  res.status(500).send({ message: err.message });
                });
              })

}


exports.gallerydetails = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  
  gelleries.findOne({ 
    where: { id: req.body.id },
    //attributes:['id','vehicle_type','vehicle_no'],
    order: [
            ['id', 'DESC'],            
        ],
include: [
      {
        model: gallery_images,
        attributes: ['image_name', 'gallery_id']
      },
    ]
  })
  .then(interviews => {      
    
      res.send({ status:200, data: interviews, message: "gallery details showing successfully!" });
    
  })
  .catch(err => {
          res.status(500).send({ message: err.message });
        });
}


exports.updategallery = (req, res) => {
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
            message: "Gallery Id can not be empty!"
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

      if(req.body.img_gallery_pic){
        updateValues['img_gallery_pic'] = req.body.img_gallery_pic
      }

        // insert
        gelleries.update(updateValues,{
          where : { id : req.body.id }
        })
        .then(interviews => {

          res.send({ status:200,data:interviews, message: "gallery updated successfully!" });

                    
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
      })
}



exports.deletegallery = (req, res) => {

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

  
  gelleries.findOne({ 
    where: { id: req.body.id },    
  })
  .then(noti => { 
      if(noti){
        noti.destroy({

            }).
            then(c =>{

                res.send({ status:200,message: "gallery deleted successfully!" });  
            })
      }else{
          res.send({
              status:400,
              message: "id not found!"
            });
      }             
    
  });
  

}




exports.setreport1 = (req, res) => {
  uploadSingle(req,res,function(err){
var image = [];
        if(req.files){
            for (i = 0; i < req.files.length; i++) {
              if (req.files[i].fieldname == 'media_files') {
                    image.push((req.files[i].filename));
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

        if (!req.body.message) {
          res.status(400).send({
            message: "message can not be empty!"
          });
        }
        if (!req.body.mobile) {
          res.status(400).send({
            message: "mobile can not be empty!"
          });
        }
        if (!req.body.email) {
          res.status(400).send({
            message: "email can not be empty!"
          });
        }
        if (!req.body.subject) {
          res.status(400).send({
            message: "subject can not be empty!"
          });
        }
        if (!req.body.user_name) {
          res.status(400).send({
            message: "user_name can not be empty!"
          });
        }

          // insert
          report.create({
            user_name: req.body.user_name,
            subject: req.body.subject,
            email: req.body.email,
            mobile: req.body.mobile,
            message: req.body.message,
            reply_message: "empty",
            report_status: "0"
                })
          .then(Liveradios => {
            console.log(image)
            console.log(image.length);
            for (i = 0; i < image.length; i++) {
              reportmedia.create({
                  media_name: image[i],
                  id_report: Liveradios.report_id,
              })
          }
            res.send({ status:200,message: " You reported successfully!" }); 
          })
  })
  .catch(err => {
                  res.status(500).send({ message: err.message });
                });

}


exports.setreport = (req, res) => {
  uploadSingle(req, res, function (err) {
    var image = [];
    if (req.files) {
      for (i = 0; i < req.files.length; i++) {
        if (req.files[i].fieldname == 'media_files') {
          image.push((req.files[i].filename));
        }

      }
    }


    if (err) {
      res.json({ error_code: 1, err_desc: err });

    }
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    if (!req.body.message) {
      res.status(400).send({
        message: "message can not be empty!"
      });
    }
    if (!req.body.mobile) {
      res.status(400).send({
        message: "mobile can not be empty!"
      });
    }
    if (!req.body.email) {
      res.status(400).send({
        message: "email can not be empty!"
      });
    }
    if (!req.body.subject) {
      res.status(400).send({
        message: "subject can not be empty!"
      });
    }
    if (!req.body.user_name) {
      res.status(400).send({
        message: "user_name can not be empty!"
      });
    }

    // insert
    report.create({
      user_name: req.body.user_name,
      subject: req.body.subject,
      email: req.body.email,
      mobile: req.body.mobile,
      message: req.body.message,
      reply_message: "empty",
      report_status: "0"
    })
      .then(Liveradios => {
        console.log(image)
        console.log(image.length);
        for (i = 0; i < image.length; i++) {
          reportmedia.create({
            media_name: image[i],
            id_report: Liveradios.report_id,
          })
        }
        res.send({ status: 200, message: " You reported successfully!" });
      })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
  })
}



exports.listreport = (req, res) => {

  report.findAll({
    order: [
      ['report_id', 'DESC'],
      
    ],
    include: [
      {
        model: reportmedia
      },
    ]
  })
    .then(noti => {

      res.send({ status: 200, data: noti, message: "report listed successfully!" });

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });

}





exports.detailsreport = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }


  report.findOne({
    where: { report_id: req.body.id },
    //attributes:['id','vehicle_type','vehicle_no'],
    order: [
      ['report_id', 'DESC'],
      
    ],
    include: [
      {
        model: reportmedia
      },
    ]
  })
    .then(interviews => {

      res.send({ status: 200, data: interviews, message: "report details showing successfully!" });

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}




exports.updatereport = (req, res) => {


    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    if (!req.body.id) {
      res.send({
        status: 400,
        message: "report Id can not be empty!"
      });
    }
    let updateValues = {};

    if (req.body.post_author) {
      updateValues['post_author'] = req.body.post_author
    }
    if (req.body.post_content) {
      updateValues['post_content'] = req.body.post_content
    }
    if (req.body.post_title) {
      updateValues['post_title'] = req.body.post_title
    }

    if (req.body.post_excerpt) {
      updateValues['post_excerpt'] = req.body.post_excerpt
    }

    if (req.body.reply_message) {
      updateValues['reply_message'] = req.body.reply_message,
      updateValues['report_status'] ='1'

    }

    if (req.body.guid) {
      updateValues['guid'] = req.body.guid
    }

    if (req.body.menu_order) {
      updateValues['menu_order'] = req.body.menu_order
    }

    if (req.body.post_type) {
      updateValues['post_type'] = req.body.post_type
    }

    if (req.body.content_type) {
      updateValues['content_type'] = req.body.content_type
    }

    if (req.body.img_gallery_pic) {
      updateValues['img_gallery_pic'] = req.body.img_gallery_pic
    }

    // insert

    report.findOne({
      where: { report_id: req.body.id },
      //attributes:['id','vehicle_type','vehicle_no'],
      order: [
        ['report_id', 'DESC'],
      ]
    })
      .then(interviews => {
  
        report.update(updateValues, {
          where: { report_id: interviews.report_id }
        })
          .then(interviewss => {
             var mailOptions={
          from: 'info@markabat.com',
          to : interviews.email,
          subject : "Replied On Subject- "+interviews.subject,
          html : "Hello "+ interviews.user_name+",<br> "+req.body.reply_message
      }

    smtpTransport.sendMail(mailOptions, function(error, response){
         if(error){
                console.log(error);

         }else{
                console.log("Message sent: " + response.message);

             }
    });

            res.send({ status: 200, data: interviews, message: "replied successfully!" });
    
    
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });
  
      }).catch(err => {
        res.status(500).send({ message: err.message });
      });
    
}



exports.deletereport = (req, res) => {

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


  report.findOne({
    where: { report_id: req.body.id },
  })
    .then(noti => {
      if (noti) {
        noti.destroy({

        }).
          then(c => {

            res.send({ status: 200, message: "query deleted successfully!" });
          })
      } else {
        res.send({
          status: 400,
          message: "id not found!"
        });
      }

    });


}








exports.setadsquery = (req, res) => {
  uploadSingle(req, res, function (err) {
    var image = [];
    if (req.files) {
      for (i = 0; i < req.files.length; i++) {
        if (req.files[i].fieldname == 'media_files') {
          image.push((req.files[i].filename));
        }

      }
    }


    if (err) {
      res.json({ error_code: 1, err_desc: err });

    }
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    if (!req.body.message) {
      res.status(400).send({
        message: "message can not be empty!"
      });
    }
    if (!req.body.mobile) {
      res.status(400).send({
        message: "mobile can not be empty!"
      });
    }
    if (!req.body.email) {
      res.status(400).send({
        message: "email can not be empty!"
      });
    }
    if (!req.body.subject) {
      res.status(400).send({
        message: "subject can not be empty!"
      });
    }
    if (!req.body.user_name) {
      res.status(400).send({
        message: "user_name can not be empty!"
      });
    }

    // insert
    adsquery.create({
      user_name: req.body.user_name,
      subject: req.body.subject,
      email: req.body.email,
      mobile: req.body.mobile,
      message: req.body.message,
      reply_message: "empty",
      query_status: "0"
    })
      .then(Liveradios => {
        console.log(image)
        console.log(image.length);
        for (i = 0; i < image.length; i++) {
          adsquerymedia.create({
            media_name: image[i],
            id_query: Liveradios.query_id,
          })
        }
        res.send({ status: 200, message: " Your ads query submitted successfully!" });
      })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
  })
}



exports.listadsquery = (req, res) => {

  adsquery.findAll({
    order: [
      ['query_id', 'DESC'],
      
    ],
    include: [
      {
        model: adsquerymedia
      },
    ]
  })
    .then(noti => {

      res.send({ status: 200, data: noti, message: "adsquery listed successfully!" });

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });

}





exports.detailsadsquery = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }


  adsquery.findOne({
    where: { query_id: req.body.id },
    //attributes:['id','vehicle_type','vehicle_no'],
    order: [
      ['query_id', 'DESC'],
      
    ],
    include: [
      {
        model: adsquerymedia
      },
    ]
  })
    .then(interviews => {

      res.send({ status: 200, data: interviews, message: "adsquery details showing successfully!" });

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}




exports.updateadsquery = (req, res) => {


    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    if (!req.body.id) {
      res.send({
        status: 400,
        message: "query Id can not be empty!"
      });
    }
    let updateValues = {};

    if (req.body.post_author) {
      updateValues['post_author'] = req.body.post_author
    }
    if (req.body.post_content) {
      updateValues['post_content'] = req.body.post_content
    }
    if (req.body.post_title) {
      updateValues['post_title'] = req.body.post_title
    }

    if (req.body.post_excerpt) {
      updateValues['post_excerpt'] = req.body.post_excerpt
    }

    if (req.body.reply_message) {
      updateValues['reply_message'] = req.body.reply_message,
      updateValues['query_status'] ='1'

    }

    if (req.body.guid) {
      updateValues['guid'] = req.body.guid
    }

    if (req.body.menu_order) {
      updateValues['menu_order'] = req.body.menu_order
    }

    if (req.body.post_type) {
      updateValues['post_type'] = req.body.post_type
    }

    if (req.body.content_type) {
      updateValues['content_type'] = req.body.content_type
    }

    if (req.body.img_gallery_pic) {
      updateValues['img_gallery_pic'] = req.body.img_gallery_pic
    }

    // insert

    adsquery.findOne({
      where: { query_id: req.body.id },
      //attributes:['id','vehicle_type','vehicle_no'],
      order: [
        ['query_id', 'DESC'],
      ]
    })
      .then(interviews => {
  
        adsquery.update(updateValues, {
          where: { query_id: interviews.query_id }
        })
          .then(interviewss => {
             var mailOptions={
          from: 'info@markabat.com',
          to : interviews.email,
          subject : "Replied On Subject- "+interviews.subject,
          html : "Hello "+ interviews.user_name+",<br> "+req.body.reply_message
      }

    smtpTransport.sendMail(mailOptions, function(error, response){
         if(error){
                console.log(error);

         }else{
                console.log("Message sent: " + response.message);

             }
    });

            res.send({ status: 200, data: interviews, message: "ads query replied successfully!" });
    
    
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });
  
      }).catch(err => {
        res.status(500).send({ message: err.message });
      });
    
}



exports.deleteadsquery = (req, res) => {

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


  adsquery.findOne({
    where: { query_id: req.body.id },
  })
    .then(noti => {
      if (noti) {
        noti.destroy({

        }).
          then(c => {

            res.send({ status: 200, message: "ads query deleted successfully!" });
          })
      } else {
        res.send({
          status: 400,
          message: "id not found!"
        });
      }

    });


}

