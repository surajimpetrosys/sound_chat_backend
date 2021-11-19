
const db = require("../models");

const Liveradio = db.liveradio;
const Instudiointerviews = db.studiointerviews;
const Phoneinterviews = db.phoneinterviews;
const Soundchatlive = db.soundchatlive;
const Sundayschedule = db.sundayschedule;
const scheduleperday =  db.scheduleperday;
const schedule = db.schedule;
const livecontent = db.livecontent;
const multer = require("multer");
const upload = multer({
  dest: "/var/www/html/soundradiobackend/images/interviews/"
});
var uploadSingle = upload.any();
const upload1 = multer({
  dest: "/var/www/html/soundradiobackend/images/podcast/"
});
var uploadSingle1 = upload1.any();

exports.listliveradio = (req, res) => {

  Liveradio.findAll({         
    order: [
            ['id', 'DESC'],            
        ]    
  })
  .then(noti => {      
    
      res.send({ status:200,data: noti, message: "Live Radio listed successfully!" });
    
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
  
}


exports.addLiveradio = (req, res) => {
  console.log(req.body);
  Liveradio.findAll({where : 
    { guid : req.body.guid, video_url:req.body.video_url }
  })
  .then(Liveradios => {      
      
      if(Liveradios.length > 0){              

        res.send({ status:400, message: "This Liveradio guid/video_url is already there!" });
      } else {

          // insert
          Liveradio.create({
            post_author: req.body.post_author,
            post_content: req.body.post_content,
            post_title: req.body.post_title, 
            post_excerpt: req.body.post_excerpt,
            post_name: req.body.post_name,
            guid: req.body.guid,
            menu_order: req.body.menu_order,
            post_type: req.body.post_type,
            video_url: req.body.video_url, 
            content_type: req.body.content_type
          })
          .then(Liveradios => {

            res.send({ status:200,message: "Liveradio added successfully!" }); 
          })

      }
  })
  .catch(err => {
                  res.status(500).send({ message: err.message });
                });

}


exports.editLiveradio = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  if (!req.body.liveradio_id) {
    res.send({
      status:400,
      message: "interview Id can not be empty!"
    });
  }


  let updatedvalues = {
    post_author: req.body.post_author,
    post_content: req.body.post_content,
    post_title: req.body.post_title, 
    post_excerpt: req.body.post_excerpt,
    post_name: req.body.post_name,
    guid: req.body.guid,
    menu_order: req.body.menu_order,
    post_type: req.body.post_type,
    video_url: req.body.video_url, 
    content_type: req.body.content_type
  };

  // insert
  Liveradio.update(updatedvalues,{
    where : { id : req.body.liveradio_id }
  })
  .then(Liveradio => {

    res.send({ status:200, message: "Liveradio updated successfully!" });

              
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}


exports.LiveradioviewDetail = (req, res) => {

if (!req.body) {
res.status(400).send({
message: "Content can not be empty!"
});
}


Liveradio.findOne({ 
where: { id: req.body.liveradio_id },
//attributes:['id','vehicle_type','vehicle_no'],
order: [
      ['id', 'DESC'],            
  ]
})
.then(Liveradio => {      

res.send({ status:200, data: Liveradio, message: "Liveradio details successfully!" });

})
.catch(err => {
  res.status(500).send({ message: err.message });
});


}

exports.deleteLiveradio = (req, res) => {

  if (!req.body.liveradio_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Liveradio.findOne({ 
    where: { id: req.body.liveradio_id },    
  })
  .then(Liveradios => { 
      console.log(Liveradios);
      if(Liveradios){
        Liveradio.destroy({
            })
      }else{
          res.send({
              status:400,
              message: "Liveradio not found!"
            });
      }             
    
  })
  .then(Liveradios => {      
    
    res.send({ status:200, data: Liveradios, message: "Liveradio deleted successfully!" });
  
})
.catch(err => {
  res.status(500).send({ message: err.message });
});
}

exports.alldeleteLiveradio = (req, res) => {

  Liveradio.destroy({
    where: { },
    truncate: true
      })
.then(interviews => {      

  res.send({ status:200, data: interviews, message: " all Liveradio deleted successfully!" });

})
.catch(err => {
res.status(500).send({ message: err.message });
});


}

// ==============================================


exports.listinstudio = (req, res) => {

  Instudiointerviews.findAll({         
    order: [
            ['id', 'DESC'],            
        ]    
  })
  .then(noti => {      
    
      res.send({ status:200,data: noti, message: "Instudio interviews listed successfully!" });
    
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
  

}

exports.addInstudiointerviews = (req, res) => {
  Instudiointerviews.findAll({where : 
    { guid : req.body.guid, video_url:req.body.video_url }
  })
  .then(Instudiointerview => {      
      
      if(Instudiointerview.length > 0){              

        res.send({ status:400, message: "This Instudiointerviews guid/video_url is already there!" });
      } else {

          // insert
          Instudiointerviews.create({
            post_author: req.body.post_author,
            post_content: req.body.post_content,
            post_title: req.body.post_title, 
            post_excerpt: req.body.post_excerpt,
            post_name: req.body.post_name,
            guid: req.body.guid,
            menu_order: req.body.menu_order,
            post_type: req.body.post_type,
            video_url: req.body.video_url, 
            content_type: req.body.content_type
          })
          .then(Instudiointerviews => {

            res.send({ status:200,message: "Instudiointerviews added successfully!" }); 
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });

      }
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });

}


exports.editInstudiointerviews = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  if (!req.body.instudiointerviews_id) {
    res.send({
      status:400,
      message: "Instudiointerviews Id can not be empty!"
    });
  }


  let updatedvalues = {
    post_author: req.body.post_author,
    post_content: req.body.post_content,
    post_title: req.body.post_title, 
    post_excerpt: req.body.post_excerpt,
    post_name: req.body.post_name,
    guid: req.body.guid,
    menu_order: req.body.menu_order,
    post_type: req.body.post_type,
    video_url: req.body.video_url, 
    content_type: req.body.content_type
  };

  // insert
  Instudiointerviews.update(updatedvalues,{
    where : { id : req.body.instudiointerviews_id }
  })
  .then(Instudiointerviews => {

    res.send({ status:200, message: "Instudiointerviews updated successfully!" });

              
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}


exports.InstudiointerviewsviewDetail = (req, res) => {

if (!req.body) {
res.status(400).send({
message: "Content can not be empty!"
});
}


Instudiointerviews.findOne({ 
where: { id: req.body.instudiointerviews_id },
//attributes:['id','vehicle_type','vehicle_no'],
order: [
      ['id', 'DESC'],            
  ]
})
.then(Instudiointerviews => {      

res.send({ status:200, data: LivInstudiointerviewseradio, message: "Instudiointerviews details successfully!" });

})
.catch(err => {
  res.status(500).send({ message: err.message });
});


}

exports.deleteInstudiointerviews = (req, res) => {

  if (!req.body.instudiointerviews_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Instudiointerviews.findOne({ 
    where: { id: req.body.instudiointerviews_id },    
  })
  .then(Instudiointerview => { 
      console.log(Instudiointerview);
      if(Instudiointerview){
        Instudiointerviews.destroy({
            })
      }else{
          res.send({
              status:400,
              message: "Instudiointerviews not found!"
            });
      }             
    
  })
  .then(Instudiointerview => {      
    
    res.send({ status:200, data: Instudiointerview, message: "Instudiointerviews deleted successfully!" });
  
})
.catch(err => {
  res.status(500).send({ message: err.message });
});
}


exports.alldeleteInstudiointerviews = (req, res) => {

  Instudiointerviews.destroy({
    where: { },
    truncate: true
      })
.then(interviews => {      

  res.send({ status:200, data: interviews, message: " all Instudiointerviews deleted successfully!" });

})
.catch(err => {
res.status(500).send({ message: err.message });
});


}


// =============================================================

exports.listphoneinterviews = (req, res) => {

  Phoneinterviews.findAll({         
    order: [
            ['id', 'DESC'],            
        ]    
  })
  .then(noti => {      
    
      res.send({ status:200,data: noti, message: "phone interviews listed successfully!" });
    
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
  

}

exports.addPhoneinterviews = (req, res) => {
  uploadSingle(req, res, function (err) {
    var mobileimage = ''; var desktopimage = '';
    if (req.files) {
      for (i = 0; i < req.files.length; i++) {
        if (req.files[i].fieldname == 'mobileimage') {
          mobileimage = (req.files[i].filename);
        }
        if (req.files[i].fieldname == 'desktopimage') {
          desktopimage = (req.files[i].filename);
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

    if (!req.body.video_url) {
      res.status(400).send({
        message: "Video Url can not be empty!"
      });
    }

    if (!req.body.post_title) {
      res.status(400).send({
        message: "post title can not be empty!"
      });
    }

    if (!req.body.post_content) {
      res.status(400).send({
        message: "post content can not be empty!"
      });
    }
    if (!mobileimage) { 
      res.status(400).send({
        message: "poster for can not be empty!"
      });
    }
  Phoneinterviews.findAll({where : 
    { video_url:req.body.video_url,post_content: req.body.post_content,post_title: req.body.post_title  }
  })
  .then(Phoneinterview => {      
      
      if(Phoneinterview.length > 0){              

        res.send({ status:400, message: "This Phone interviews is already there!" });
      } else {

          // insert
          Phoneinterviews.create({
            post_content: req.body.post_content,
            post_title: req.body.post_title, 
            feature_img:mobileimage,
            post_type: req.body.post_type,
            video_url: req.body.video_url, 
            content_type: req.body.content_type
          })
          .then(Phoneinterviews => {

            res.send({ status:200,data:Phoneinterviews,message: "Phone interviews added successfully!" }); 
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });

      }
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
  });
}


exports.editPhoneinterviews = (req, res) => {
  uploadSingle(req, res, function (err) {
    var mobileimage = ''; var desktopimage = '';
    if (req.files) {
      for (i = 0; i < req.files.length; i++) {
        if (req.files[i].fieldname == 'mobileimage') {
          mobileimage = (req.files[i].filename);
        }
        if (req.files[i].fieldname == 'desktopimage') {
          desktopimage = (req.files[i].filename);
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

  if (!req.body.phoneinterviews_id) {
    res.send({
      status:400,
      message: "Phoneinterviews Id can not be empty!"
    });
  }

  let updateValues = {};


  if (mobileimage) {
    updateValues['feature_img'] = mobileimage;
  }

  //  if(desktopimage){
  //   updateValues['feature_img_desktop'] = desktopimage;
  //  }
  if (req.body.post_content) {
    updateValues['post_content'] = req.body.post_content
  }
  if (req.body.post_title) {
    updateValues['post_title'] = req.body.post_title
  }
  if (req.body.post_type) {
    updateValues['post_type'] = req.body.post_type
  }
  if (req.body.video_url) {
    updateValues['video_url'] = req.body.video_url
  }

  if (req.body.content_type) {
    updateValues['content_type'] = req.body.content_type
  }


  // insert
  Phoneinterviews.update(updateValues,{
    where : { id : req.body.phoneinterviews_id }
  })
  .then(Phoneinterviews => {

    res.send({ status:200, message: "Phone interviews updated successfully!" });

              
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
});
}


exports.PhoneinterviewsviewDetail = (req, res) => {

if (!req.body) {
res.status(400).send({
message: "Content can not be empty!"
});
}


Phoneinterviews.findOne({ 
where: { id: req.body.phoneinterviews_id },
//attributes:['id','vehicle_type','vehicle_no'],
order: [
      ['id', 'DESC'],            
  ]
})
.then(Phoneinterviews => {      

res.send({ status:200, data: Phoneinterviews, message: "Phoneinterviews details successfully!" });

})
.catch(err => {
  res.status(500).send({ message: err.message });
});


}


exports.deletePhoneinterviews1 = (req, res) => {

  if (!req.body.phoneinterviews_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Phoneinterviews.findOne({ 
    where: { id: req.body.phoneinterviews_id },    
  })
  .then(Phoneinterview => { 
      console.log(Phoneinterview);
      if(Phoneinterview){
        Phoneinterviews.destroy({
            })
      }else{
          res.send({
              status:400,
              message: "Phoneinterviews not found!"
            });
      }             
    
  })
  .then(Phoneinterview => {      
    
    res.send({ status:200, data: Phoneinterview, message: "interviews deleted successfully!" });
  
})
.catch(err => {
  res.status(500).send({ message: err.message });
});
}


exports.deletePhoneinterviews = (req, res) => {

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

  
  Phoneinterviews.findOne({ 
    where: { id: req.body.id },
  })
  .then(noti => { 
      if(noti){
        noti.destroy({

            }).
            then(c =>{

                res.send({ status:200,message: " phone interview deleted successfully!" });  
            })
      }else{
          res.send({
              status:400,
              message: "id not found!"
            });
      }             
    
  });
  

}
exports.alldeletePhoneinterviews = (req, res) => {

  Phoneinterviews.destroy({
    where: { },
    truncate: true
      })
.then(interviews => {      

  res.send({ status:200, data: interviews, message: " all Phoneinterviews deleted successfully!" });

})
.catch(err => {
res.status(500).send({ message: err.message });
});


}


// =================================================================

exports.listsoundchatlive = (req, res) => {

  Soundchatlive.findAll({         
    order: [
            ['id', 'DESC'],            
        ]    
  })
  .then(noti => {      
    
      res.send({ status:200,data: noti, message: "Soundchat live interviews listed successfully!" });
    
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
  

}

exports.addSoundchatlive = (req, res) => {
  Soundchatlive.findAll({where : 
    { guid : req.body.guid, video_url:req.body.video_url }
  })
  .then(Soundchatlives => {      
      
      if(Soundchatlives.length > 0){              

        res.send({ status:400, message: "This Soundchatlive guid/video_url is already there!" });
      } else {

          // insert
          Soundchatlive.create({
            post_author: req.body.post_author,
            post_content: req.body.post_content,
            post_title: req.body.post_title, 
            post_excerpt: req.body.post_excerpt,
            post_name: req.body.post_name,
            guid: req.body.guid,
            menu_order: req.body.menu_order,
            post_type: req.body.post_type,
            video_url: req.body.video_url, 
            content_type: req.body.content_type
          })
          .then(Soundchatlive => {

            res.send({ status:200,message: "Soundchatlive added successfully!" }); 
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });

      }
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });

}


exports.editSoundchatlive = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  if (!req.body.soundchatlive_id) {
    res.send({
      status:400,
      message: "Soundchatlive Id can not be empty!"
    });
  }


  let updatedvalues = {
    post_author: req.body.post_author,
    post_content: req.body.post_content,
    post_title: req.body.post_title, 
    post_excerpt: req.body.post_excerpt,
    post_name: req.body.post_name,
    guid: req.body.guid,
    menu_order: req.body.menu_order,
    post_type: req.body.post_type,
    video_url: req.body.video_url, 
    content_type: req.body.content_type
  };

  // insert
  Soundchatlive.update(updatedvalues,{
    where : { id : req.body.soundchatlive_id }
  })
  .then(Soundchatlive => {

    res.send({ status:200, message: "Soundchatlive updated successfully!" });

              
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}


exports.SoundchatliveviewDetail = (req, res) => {

if (!req.body) {
res.status(400).send({
message: "Content can not be empty!"
});
}


Soundchatlive.findOne({ 
where: { id: req.body.soundchatlive_id },
//attributes:['id','vehicle_type','vehicle_no'],
order: [
      ['id', 'DESC'],            
  ]
})
.then(Soundchatlive => {      

res.send({ status:200, data: Soundchatlive, message: "Soundchatlive details successfully!" });

})
.catch(err => {
  res.status(500).send({ message: err.message });
});


}


exports.deleteSoundchatlive = (req, res) => {

  if (!req.body.soundchatlive_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Soundchatlive.findOne({ 
    where: { id: req.body.soundchatlive_id },    
  })
  .then(Soundchatlives => { 
      console.log(Soundchatlives);
      if(Soundchatlives){
        Soundchatlive.destroy({
            })
      }else{
          res.send({
              status:400,
              message: "Soundchatlives not found!"
            });
      }             
    
  })
  .then(Soundchatlives => {      
    
    res.send({ status:200, data: Soundchatlives, message: "interviews deleted successfully!" });
  
})
.catch(err => {
  res.status(500).send({ message: err.message });
});
}

exports.alldeleteSoundchatlive = (req, res) => {

  Soundchatlive.destroy({
    where: { },
    truncate: true
      })
.then(interviews => {      

  res.send({ status:200, data: interviews, message: " all Soundchatlive deleted successfully!" });

})
.catch(err => {
res.status(500).send({ message: err.message });
});


}

// ====================================================================================================

exports.listshowschedule = (req, res) => {

  schedule.findAll({         
    order: [
            ['id', 'DESC'],            
        ],
    include: [{
      model: scheduleperday,
      order: [
            ['show_id', 'DESC'],            
        ] 
      //attributes: ['id','name']
    }]    
  })
  .then(noti => {      
    
      res.send({ status:200,data: noti, message: "Show listed successfully!" });
    
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
  

}

exports.addSundayschedule = (req, res) => {
  Sundayschedule.findAll({where : 
    { guid : req.body.guid, video_url:req.body.video_url }
  })
  .then(Sundayschedules => {      
      
      if(Sundayschedules.length > 0){              

        res.send({ status:400, message: "This sundayschedule guid/video_url is already there!" });
      } else {

          // insert
          Sundayschedule.create({
            post_author: req.body.post_author,
            post_content: req.body.post_content,
            post_title: req.body.post_title, 
            post_excerpt: req.body.post_excerpt,
            post_name: req.body.post_name,
            guid: req.body.guid,
            menu_order: req.body.menu_order,
            post_type: req.body.post_type,
            video_url: req.body.video_url, 
            content_type: req.body.content_type,
            show_time: req.body.show_time,
            show_day: req.body.show_day
          })
          .then(Sundayschedules => {

            res.send({ status:200,message: "Sundayschedule added successfully!" }); 
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });

      }
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });

}


exports.editSundayschedule = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  if (!req.body.sundayschedule_id) {
    res.send({
      status:400,
      message: "Sundayschedule Id can not be empty!"
    });
  }


  let updatedvalues = {
    post_author: req.body.post_author,
    post_content: req.body.post_content,
    post_title: req.body.post_title, 
    post_excerpt: req.body.post_excerpt,
    post_name: req.body.post_name,
    guid: req.body.guid,
    menu_order: req.body.menu_order,
    post_type: req.body.post_type,
    video_url: req.body.video_url, 
    content_type: req.body.content_type
  };

  // insert
  Sundayschedule.update(updatedvalues,{
    where : { id : req.body.sundayschedule_id }
  })
  .then(Sundayschedule => {

    res.send({ status:200, message: "Sundayschedule updated successfully!" });

              
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}


exports.SundayscheduleviewDetail = (req, res) => {

if (!req.body) {
res.status(400).send({
message: "Content can not be empty!"
});
}


Sundayschedule.findOne({ 
where: { id: req.body.sundayschedule_id },
//attributes:['id','vehicle_type','vehicle_no'],
order: [
      ['id', 'DESC'],            
  ]
})
.then(Sundayschedule => {      

res.send({ status:200, data: Sundayschedule, message: "Sundayschedule details successfully!" });

})
.catch(err => {
  res.status(500).send({ message: err.message });
});


}

exports.deleteSundayschedule = (req, res) => {

  if (!req.body.sundayschedule_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Sundayschedule.findOne({ 
    where: { id: req.body.sundayschedule_id },    
  })
  .then(Sundayschedules => { 
      console.log(Sundayschedules);
      if(Sundayschedules){
        Sundayschedule.destroy({
            })
      }else{
          res.send({
              status:400,
              message: "Sundayschedule not found!"
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


exports.alldeleteSundayschedule = (req, res) => {

  Sundayschedule.destroy({
    where: { },
    truncate: true
      })
.then(interviews => {      

  res.send({ status:200, data: interviews, message: " all Sundayschedule deleted successfully!" });

})
.catch(err => {
res.status(500).send({ message: err.message });
});


}



exports.addperdayschedule = (req, res) => { 
  uploadSingle1(req, res, function (err) {
    var mobileimage = ''; var desktopimage = '';
    if (req.files) {
      for (i = 0; i < req.files.length; i++) {
        if (req.files[i].fieldname == 'mobileimage') {
          mobileimage = (req.files[i].filename);
        }
        if (req.files[i].fieldname == 'desktopimage') {
          desktopimage = (req.files[i].filename);
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

    if (!mobileimage) {
      res.status(400).send({
        message: "poster image can not be empty!"
      });
    }

    //  if (!desktopimage) {
    //      res.status(400).send({
    //message: "poster for desktop can not be empty!"
    //});
    //}

    if (!req.body.show_name) {
      res.status(400).send({
        message: "show name can not be empty!"
      });
    }
    if (!req.body.show_description) {
      res.status(400).send({
        message: "description can not be empty!"
      });
    }
    if (!req.body.show_audio_url) {
      res.status(400).send({
        message: "url link can not be empty!"
      });
    }
    if (!req.body.show_start_date) {
      res.status(400).send({
        message: "start date can not be empty!"
      });
    }
    if (!req.body.show_end_date) {
      res.status(400).send({
        message: "end date can not be empty!"
      });
    }

    if (!req.body.day_id) {
      res.status(400).send({
        message: "day_id can not be empty!"
      });
    }

          // insert
          scheduleperday.create({
            show_name: req.body.show_name,
            show_description: req.body.show_description,
            show_start_date: req.body.show_start_date,
            show_end_date: req.body.show_end_date,
            day_id: req.body.day_id,
            show_audio_url: req.body.show_audio_url,
            show_image: mobileimage
          })
            .then(Liveradios => {

              res.send({ status: 200, message: "show added successfully!" });
            })

      .catch(err => {
        res.status(500).send({ message: err.message });
      });
});
}

exports.updateperdayschedule = (req, res) => {
  uploadSingle1(req, res, function (err) {
    var mobileimage = ''; var desktopimage = '';
    if (req.files) {
      for (i = 0; i < req.files.length; i++) {
        if (req.files[i].fieldname == 'mobileimage') {
          mobileimage = (req.files[i].filename);
        }
        if (req.files[i].fieldname == 'desktopimage') {
          desktopimage = (req.files[i].filename);
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

    if (!req.body.day_id) {
      res.send({
        status: 400,
        message: "day Id can not be empty!"
      });
    }

    if (!req.body.show_id) {
      res.send({
        status: 400,
        message: "show Id can not be empty!"
      });
    }

    let updateValues = {};


    if (mobileimage) {
      updateValues['show_image'] = mobileimage;
    }

    //  if(desktopimage){
    //   updateValues['feature_img_desktop'] = desktopimage;
    //  }
    if (req.body.show_name) {
      updateValues['show_name'] = req.body.show_name
    }
    if (req.body.show_description) {
      updateValues['show_description'] = req.body.show_description
    }
    if (req.body.show_start_date) {
      updateValues['show_start_date'] = req.body.show_start_date
    }
    if (req.body.show_end_date) {
      updateValues['show_end_date'] = req.body.show_end_date
    }

    if (req.body.show_audio_url) {
      updateValues['show_audio_url'] = req.body.show_audio_url
    }

    if (req.body.day_id) {
      updateValues['day_id'] = req.body.day_id
    }

    if (req.body.show_id) {
      updateValues['show_id'] = req.body.show_id
    }

    // insert
    scheduleperday.update(updateValues, {
      where: { show_id: req.body.show_id, day_id:req.body.day_id}
    })
      .then(interviews => {

        res.send({ status: 200, data: interviews, message: "Product updated successfully!" });


      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  })
}



exports.deleteperdayschedule = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  if (!req.body.show_id) {
    res.status(400).send({
      message: " show id can not be empty!"
    });
  }
  if (!req.body.day_id) {
    res.status(400).send({
      message: " day id can not be empty!"
    });
  }


  scheduleperday.findOne({
    where: { day_id: req.body.day_id, show_id: req.body.show_id },
  })
    .then(noti => {
      if (noti) {
        noti.destroy({

        }).
          then(c => {

            res.send({ status: 200, message: "show deleted successfully!" });
          })
      } else {
        res.send({
          status: 400,
          message: "show not found!"
        });
      }

    });


}



exports.listshowscheduleperday = (req, res) => {

  scheduleperday.findAll({   
    where: { day_id:req.body.day_id},
    order: [
            ['show_id', 'DESC'],            
        ]    
  })
  .then(noti => {      
    
      res.send({ status:200,data: noti, message: "Show listed successfully!" });
    
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
  

}





exports.updateshowschedule = (req, res) => {
  uploadSingle1(req, res, function (err) {
    var mobileimage = ''; var desktopimage = '';
    if (req.files) {
      for (i = 0; i < req.files.length; i++) {
        if (req.files[i].fieldname == 'mobileimage') {
          mobileimage = (req.files[i].filename);
        }
        if (req.files[i].fieldname == 'desktopimage') {
          desktopimage = (req.files[i].filename);
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

    if (!req.body.day_id) {
      res.send({
        status: 400,
        message: "day Id can not be empty!"
      });
    }

    let updateValues = {};


    if (mobileimage) {
      updateValues['show_image'] = mobileimage;
    }

    //  if(desktopimage){
    //   updateValues['feature_img_desktop'] = desktopimage;
    //  }
    if (req.body.feature_img) {
      updateValues['feature_img'] = req.body.feature_img
    }
    if (req.body.content_type) {
      updateValues['content_type'] = req.body.content_type
    }
    if (req.body.post_name) {
      updateValues['post_name'] = req.body.post_name
    }
    if (req.body.post_excerpt) {
      updateValues['post_excerpt'] = req.body.post_excerpt
    }

    if (req.body.show_audio_url) {
      updateValues['show_audio_url'] = req.body.show_audio_url
    }

    if (req.body.day_id) {
      updateValues['day_id'] = req.body.day_id
    }

    if (req.body.show_id) {
      updateValues['show_id'] = req.body.show_id
    }

    // insert
    schedule.update(updateValues, {
      where: { id:req.body.day_id}
    })
      .then(interviews => {

        res.send({ status: 200, data: interviews, message: "show updated successfully!" });


      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  })
}



exports.listlivecontent = (req, res) => {

  livecontent.findAll({   
    order: [
            ['id', 'DESC'],            
        ]    
  })
  .then(noti => {      
    
      res.send({ status:200,data: noti, message: "listed live content successfully!" });
    
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
  

}



exports.livecontentdetails = (req, res) => {

  if (!req.body) {
  res.status(400).send({
  message: "Content can not be empty!"
  });
  }
  
  
  livecontent.findOne({ 
  where: { id: req.body.id },
  //attributes:['id','vehicle_type','vehicle_no'],
  order: [
        ['id', 'DESC'],            
    ]
  })
  .then(Sundayschedule => {      
  
  res.send({ status:200, data: Sundayschedule, message: "live content details is here!" });
  
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
  
  
  }
  


exports.updatelivecontent = (req, res) => {
  uploadSingle(req, res, function (err) {
    var mobileimage = ''; var desktopimage = '';
    if (req.files) {
      for (i = 0; i < req.files.length; i++) {
        if (req.files[i].fieldname == 'mobileimage') {
          mobileimage = (req.files[i].filename);
        }
        if (req.files[i].fieldname == 'desktopimage') {
          desktopimage = (req.files[i].filename);
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

    if (!req.body.id) {
      res.send({
        status: 400,
        message: "content Id can not be empty!"
      });
    }

    let updateValues = {};


    if (mobileimage) {
      updateValues['show_image'] = mobileimage;
    }

    //  if(desktopimage){
    //   updateValues['feature_img_desktop'] = desktopimage;
    //  }
    if (req.body.livecontentlink) {
      updateValues['livelink'] = req.body.livecontentlink
    }
    if (req.body.content_type) {
      updateValues['content_type'] = req.body.content_type
    }
    if (req.body.post_name) {
      updateValues['post_name'] = req.body.post_name
    }
    if (req.body.post_excerpt) {
      updateValues['post_excerpt'] = req.body.post_excerpt
    }

    if (req.body.show_audio_url) {
      updateValues['show_audio_url'] = req.body.show_audio_url
    }

    if (req.body.day_id) {
      updateValues['day_id'] = req.body.day_id
    }

    if (req.body.show_id) {
      updateValues['show_id'] = req.body.show_id
    }

    // insert
    livecontent.update(updateValues, {
      where: { id:req.body.id}
    })
      .then(interviews => {

        res.send({ status: 200, data: interviews, message: "live Content link updated successfully!" });


      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  })
}


exports.detailsshowschedule = (req, res) => {

if (!req.body) {
res.status(400).send({
message: "Content can not be empty!"
});
}


schedule.findOne({
where: { id: req.body.id },
//attributes:['id','vehicle_type','vehicle_no'],
order: [
      ['id', 'DESC'],
  ]
})
.then(Phoneinterviews => {

res.send({ status:200, data: Phoneinterviews, message: "show  details showing successfully!" });

})
.catch(err => {
  res.status(500).send({ message: err.message });
});


}



exports.detailsperdayschedule = (req, res) => {

if (!req.body) {
res.status(400).send({
message: "Content can not be empty!"
});
}


scheduleperday.findOne({
where: { show_id: req.body.show_id },
//attributes:['id','vehicle_type','vehicle_no'],
order: [
      ['show_id', 'DESC'],
  ]
})
.then(Phoneinterviews => {

res.send({ status:200, data: Phoneinterviews, message: "perday show  details showing successfully!" });

})
.catch(err => {
  res.status(500).send({ message: err.message });
});


}

