
const db = require("../models");

var bcrypt = require("bcryptjs");

const multer = require("multer");
const upload = multer({
  dest: "/var/www/html/markabatApi/images/"  
});
var uploadSingle = upload.any();

const User = db.user;
const UserProfile = db.userprofile;
const UserWallet = db.userwallet;
const Role = db.role;

const Notification = db.notification;
const Vehicle = db.vehicle;
const VehicleAssign = db.vehicleassign;

exports.addDriver = (req, res) => {


   uploadSingle(req,res,function(err){
        console.log(req.body);
        console.log(req.file);

        var driverphoto = ''; var license = ''; var pancard = '';
        if(req.files){
            for (i = 0; i < req.files.length; i++) {
              if(req.files[i].fieldname == 'photo'){
                driverphoto = (req.files[i].filename);
              }
              if(req.files[i].fieldname == 'license'){
                license = (req.files[i].filename);
              }
              if(req.files[i].fieldname == 'pancard'){
                pancard = (req.files[i].filename);
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

        

        User.findOne({
          where: {
            mobileno: req.body.mobileno
          }
        }).then(user => {
          if (user) {
            res.send({
              status:400,
              message: "Failed! Mobile Number is already in use!"
            });                 
          }else{

              User.findOne({
                where: {
                  email: req.body.email
                }
              }).then(user => {
                if (user) {
                  res.send({
                    status:400,
                    message: "Failed! Email is already in use!"
                  });                         
                } else {

                    if (!req.body.password) {
                      res.send({
                        status:400,
                        message: "Password can not be empty!"
                      });
                    }else{

                       User.create({
                        username: req.body.username,
                        email: req.body.email,
                        password: bcrypt.hashSync(String(req.body.password), 8),
                        mobileno: req.body.mobileno,
                        admin_id: req.body.user_id,
                        is_verify:'1'
                      })
                        .then(user => {

                          UserProfile.create({
                            user_id: user.id,        
                            dob: req.body.dob,
                            work: req.body.work,
                            gender: req.body.gender,
                            image:driverphoto,          
                            license: license,          
                            pancard: pancard,          
                            service_tax:req.body.service_tax,
                            voter_id: req.body.voter_id,              
                            address1:req.body.address1,
                            address2:req.body.address2,
                            zipcode:req.body.zipcode,
                            country:req.body.country,
                            state:req.body.state,
                            district:req.body.district,
                            city:req.body.city,
                            area:req.body.area,
                          })
                          .then(userprofile => {

                              UserWallet.create({
                                user_id: user.id,
                                amount : 0        
                              })

                                            
                              user.setRoles([3]).then(() => {

                                Notification.create({
                                  'title': 'New Driver',
                                  'description': 'You have successfully registered new driver.',
                                  'type':'driver',
                                  'user_id': req.body.user_id
                                });

                                res.send({ status:200, message: "Driver registered successfully!" });
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

                }         
              });

          }

        });
        

   });    

}


exports.editDriver = (req, res) => {


   uploadSingle(req,res,function(err){
        console.log(req.body);
        console.log(req.file);

        var driverphoto = ''; var license = ''; var pancard = '';
        if(req.files){
            for (i = 0; i < req.files.length; i++) {
              if(req.files[i].fieldname == 'photo'){
                driverphoto = (req.files[i].filename);
              }
              if(req.files[i].fieldname == 'license'){
                license = (req.files[i].filename);
              }
              if(req.files[i].fieldname == 'pancard'){
                pancard = (req.files[i].filename);
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
            message: "Driver Id can not be empty!"
          });
        }


        let updt = {
          username: req.body.username,          
        };

        if(req.body.password){
          updt['password'] = bcrypt.hashSync(String(req.body.password), 8);
        }

        User.update(updt,{
          where: {
            id: req.body.id
          }
        })


        let updatedvalues = {
          username: req.body.username,          
          dob: req.body.dob,
          work: req.body.work,
          gender: req.body.gender,                
          service_tax:req.body.service_tax,
          voter_id: req.body.voter_id,          
          address1:req.body.address1,
          address2:req.body.address2,
          zipcode:req.body.zipcode,
          country:req.body.country,
          state:req.body.state,
          district:req.body.district,
          city:req.body.city,
          area:req.body.area,          
        };


        if(driverphoto){
          updatedvalues['image'] = driverphoto;
        }

        if(license){
          updatedvalues['license'] = license;
        }

        if(pancard){
          updatedvalues['pancard'] = pancard;
        }

        


        console.log(updatedvalues);

        // update
        UserProfile.update(updatedvalues,{
          where: {
            user_id: req.body.id
          }
        })
        .then(driver => { 

          User.findOne({
              where: { id: req.body.id }
          })
          .then(drivers => {                  
              res.send({ status:200, data: drivers, message: "Driver updated successfully!" });            
          });

          
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
   });    

}

exports.listDriver = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  
  User.findAll({ 
    where: { admin_id: req.body.user_id },
    //attributes:['id','vehicle_type','vehicle_no'],
    order: [
            ['id', 'DESC'],            
        ],
    include:[{
            model: UserProfile,          
            //attributes: ['id','name']
            }]        
  })
  .then(drivers => {      
    
      res.send({ status:200, data: drivers, message: "Drivers listed successfully!" });
    
  });

}


exports.driverDetail = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  
  User.findOne({ 
    where: { id: req.body.id }, 
    include:[{
            model: UserProfile,          
            //attributes: ['id','name']
            }]    
  })
  .then(driver => {   

      VehicleAssign.findOne({ 
        where: { user_id: req.body.id }, 
        include:[{
                model: Vehicle,          
                //attributes: ['id','name']
                }]    
      }).then(vehicle => {
          
          res.send({ status:200,data: driver, vehicle: vehicle, message: "Driver listed successfully!" });  
      }) 
    
      
    
  });
  

}





