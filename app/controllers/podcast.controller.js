
const db = require("../models");

const Liveradio = db.liveradio;
const Instudiointerviews = db.studiointerviews;
const Phoneinterviews = db.phoneinterviews;
const Soundchatlive = db.soundchatlive;
const Sundayschedule = db.sundayschedule;
const gelleries = db.gelleries;
const podcast = db.podcast;
exports.listpodcast = (req, res) => {

    podcast.findAll({         
    order: [
            ['id', 'DESC'],            
        ]    
  })
  .then(noti => {      
    
      res.send({ status:200,data: noti, message: "podcast listed successfully!" });
    
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
  
}


exports.addpodcast = (req, res) => {
  console.log(req.body);
  podcast.findAll({
  })
  .then(Liveradios => {      
      
      if(Liveradios.length > 0){              

        res.send({ status:400, message: "This Liveradio guid/video_url is already there!" });
      } else {

          // insert
          podcast.create({
            post_author: req.body.post_author,
            post_content: req.body.post_content,
            post_title: req.body.post_title, 
            post_excerpt: req.body.post_excerpt,
            post_name: req.body.post_name,
            guid: req.body.guid,
            menu_order: req.body.menu_order,
            post_type: req.body.post_type,
            img_gallery_pic: req.body.img_gallery_pic
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
    
      res.send({ status:200,data: noti, message: "Instudio interviews listed successfully!" });
    
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
  

}

exports.addPhoneinterviews = (req, res) => {
  Phoneinterviews.findAll({where : 
    { guid : req.body.guid, video_url:req.body.video_url }
  })
  .then(Phoneinterview => {      
      
      if(Phoneinterview.length > 0){              

        res.send({ status:400, message: "This Phoneinterviews guid/video_url is already there!" });
      } else {

          // insert
          Phoneinterviews.create({
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
          .then(Phoneinterviews => {

            res.send({ status:200,message: "Phoneinterviews added successfully!" }); 
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


exports.editPhoneinterviews = (req, res) => {

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
  Phoneinterviews.update(updatedvalues,{
    where : { id : req.body.phoneinterviews_id }
  })
  .then(Phoneinterviews => {

    res.send({ status:200, message: "Phoneinterviews updated successfully!" });

              
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
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


exports.deletePhoneinterviews = (req, res) => {

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

  Sundayschedule.findAll({         
    order: [
            ['id', 'DESC'],            
        ]    
  })
  .then(noti => {      
    
      res.send({ status:200,data: noti, message: "Sunday Show listed successfully!" });
    
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








