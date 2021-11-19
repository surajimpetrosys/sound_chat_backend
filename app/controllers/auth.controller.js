const db = require("../models");
const config = require("../config/auth.config");

var nodemailer = require("nodemailer");

const User = db.user;
const UserProfile = db.userprofile;
const UserWallet = db.userwallet;
const Role = db.role;
const termscondition = db.termscondition;
const Chat = db.chat;
const Admin = db.admin;
const multer = require("multer");
const upload = multer({
  dest: "/var/www/html/soundradiobackend/images"
});
var uploadSingle = upload.any();

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var md5 = require('md5');

// var smtpTransport = nodemailer.createTransport("SMTP",{
//     service: "Gmail",
//     auth: {
//         user: "parvez.impetrosys@gmail.com",
//         pass: "piss@123"
//     }
// });

var xoauth2 = require('xoauth2');


var smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: 'anil.mpixbrand@gmail.com',
         pass: 'Anil2@2@'
     }
 });
exports.signup = (req, res) => {
  uploadSingle(req,res,function(err){
    var profilepic = '';
    if(req.files){
        for (i = 0; i < req.files.length; i++) {
          if(req.files[i].fieldname == 'profilepic'){
            profilepic = (req.files[i].filename);
          }
        } 
    }

    if(err){
         res.json({error_code:1,err_desc:err});
         
    }
  var rand=Math.floor((Math.random() * 10000) + 54);  
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    console.log(JSON.stringify(req.body));
    // if (user) {
    //   res.status(400).send({
    //     message: "Failed! Username is already in use!"
    //   });
    //   return;
    // }

    User.findOne({
      where: {
        mobileno: req.body.mobileno
      }
    }).then(user => {
      console.log(JSON.stringify(req.body));
      if (user) {
        res.send({
          status:400, message: "Failed! User Mobile Number is already in use!"
        });
        return;
      }
    

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.send({
          status:400,message: "Failed! Email is already in use!"
        });
        return;
      }
      else{
        User.create({
          username: req.body.username,
          email: req.body.email,
          fname: req.body.fname,
          lname: req.body.lname,
          password: bcrypt.hashSync(String(req.body.password), 8),
          mobileno: req.body.mobileno,
          country: req.body.country,
          profilepic: profilepic,
          coupon: req.body.coupon,
          verification_link: rand
        })
          .then(user => {
      
            UserProfile.create({
              user_id: user.id,        
            })
      
            UserWallet.create({
              user_id: user.id,
              amount : 0        
            })
      
                res.send({ status:200,data:user,message: "User was registered successfully!" });
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });
      }
    });
  });
});
  // Save User to Database
  
  });
};

exports.signup1 = (req, res) => {
  
  var rand=Math.floor((Math.random() * 10000) + 54);  
    
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    fname: req.body.fname,
    lname: req.body.lname,
    password: bcrypt.hashSync(String(req.body.password), 8),
    mobileno: req.body.mobileno,
    country: req.body.country,
    profilepic: req.body.profilepic,
    coupon: req.body.coupon,
    verification_link: rand
  })
    .then(user => {

      UserProfile.create({
        user_id: user.id,        
      })

      UserWallet.create({
        user_id: user.id,
        amount : 0        
      })

      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {

            res.send({ status:200, data:user, message: "User was registered successfully." });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {

          res.send({ status:200, message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.verify = (req, res) => {
    
    host=req.get('host');   


    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {        
        User.findOne({
          where: {
            id: req.query.id,
            verification_link: req.query.code
          }      
        }).then(user => {

            if(user){
                User.update({is_verify : '1' },{
                  where: {
                    id: req.query.id
                  }
                })
                res.end("<h1>Email has been Successfully verified, You can <a href='http://3.141.206.53:3000'>Login now</a>.");
            }else{
                res.end("<h1>Bad Request</h1>");
            }

        })
    }
    else
    {
        res.end("<h1>Request is from unknown source");
    }
     
};

exports.signin = (req, res) => {
  console.log(req.body, 'req.body');
  User.findOne({
    where: {
      mobileno: req.body.mobileno
    },
    include:[
              {
                model: UserProfile,                                  
              }               
            ]
  })
    .then(user => {
      if (!user) {
        return res.status(200).send({ status:200,accessToken: null,message: "User Not found with this mobile no." });
      }

      var passwordIsValid = bcrypt.compareSync(
       String(req.body.password),
       user.password
      );

      if (!passwordIsValid) {
        return res.status(200).send({
          status:400,
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      // if (!user.is_verify) {
      //   return res.status(200).send({
      //     status:400,
      //     accessToken: null,
      //     message: "Account not verified!",
      //   });
      // }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("" + roles[i].name);
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          mobileno:user.mobileno,
          roles: authorities,
          accessToken: token,
          fname: user.fname,
          country: user.country,
          profilepic:user.profilepic
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signout = (req, res) => {
    User.findOne({
      where: {
        id: req.body.id
      }
    })
      .then(user => {
        if (!user) {
          return res.send({ status:400,message: "User Not found." });
        }
  
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 0
        });
  
        var authorities = [];
        user.getRoles().then(roles => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
          }
          res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            mobileno: user.mobileno,
            roles: authorities,
            accessToken: null,
            status:"Logout Successfully"
          });
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };




  exports.forgetpassword = (req, res) => {
  console.log(req.body, 'req.body');
  User.findOne({
    where: {
      mobileno: req.body.mobile_no
    }
  })
    .then(user => {
      if (!user) {
        return res.status(200).send({ status:200,message: "User Not found with this mobile no." });
      }

      var newpass = Math.floor(Math.random() * 100000000);//'25893968';
      var password = bcrypt.hashSync(String(newpass), 8);

      let updateValues = { password: password };

      User.update(updateValues,{
        where: {
          mobileno: req.body.mobile_no
        }
      })
      .then(result => {
var mailOptions={
          from: 'info@markabat.com',
          to : user.email,
          subject : "New Password has been set on your account",
          html : "Hello,<br> This is the new password <br> Password - "+newpass 
      }

    smtpTransport.sendMail(mailOptions, function(error, response){
         if(error){
                console.log(error);
            
         }else{
                console.log("Message sent: " + response.message);
            
             }
    }); 
          res.status(200).send({
                status:200,
                newpass: newpass,
                message:'New password has been sent to your registered email Id'
              });
      })     
           
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.getprofile = (req, res) => {  


        console.log(req.body, 'req.body');

        if (!req.body.user_id) {
          res.send({
            status:400,
            message: "User Id can not be empty!"
          });
        }

        User.findOne({
          where: {
            id: req.body.user_id,            
          },
          include:[
                  {
                    model: UserProfile,                                  
                  }               
                ]
        })
          .then(user => {
            if (!user) {
              return res.status(200).send({ status:200,message: "User Not found." });
            }      

            res.status(200).send({
              status:200,
              data: user,
              message:'Profile has been listed successfully'
            });      
                
                 
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });
  
};

exports.updateprofile = (req, res) => {
uploadSingle(req,res,function(err){
    var profilepic = '';
    if(req.files){
        for (i = 0; i < req.files.length; i++) {
          if(req.files[i].fieldname == 'profilepic'){
            profilepic = (req.files[i].filename);
          }
        }
    }

    if(err){
         res.json({error_code:1,err_desc:err});

    }

      
        console.log(req.body, 'req.body');

        if (!req.body.user_id) {
          res.send({
            status:400,
            message: "User Id can not be empty!"
          });
        }

        User.findOne({
          where: {
            id: req.body.user_id
          }
        })
          .then(user => {
            if (!user) {
              return res.status(200).send({ status:200,message: "User Not found." });
            }      

            if(user){
                let updateValues = {
                  username: req.body.username,
                  email: req.body.email,
                  mobileno: req.body.mobileno,
                  fname: req.body.fname,
                  country: req.body.country                 
                };
                if(profilepic){
                  updateValues['profilepic'] = profilepic; 
                }

                console.log('updateValues',updateValues);          

                User.update(updateValues,{
                  where: {
                    id: user.id
                  }
                })
                .then(result => {

                    User.findOne({
                      where: {
                        id: req.body.user_id
                      }
                    })
                    .then(userdata => {
                        res.status(200).send({
                          status:200,
                          data: userdata,
                          message:'Profile has been updated successfully'
                        });
                    });
                    
                });
            }      
                
                 
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });
});
};
exports.changepassword = (req, res) => {
  console.log(req.body, 'req.body');

  if (!req.body.user_id || !req.body.current_password || !req.body.new_password) {    
    res.send({
            status:200,
            message: "content can not be empty!"
          });
  }

  User.findOne({
    where: {
      id: req.body.user_id
    }
  })
    .then(user => {
      if (!user) {
        return res.status(200).send({ status:200,message: "User Not found " });
      }

      var passwordIsValid = bcrypt.compareSync(
        String(req.body.current_password),
       user.password
      );

      if (!passwordIsValid) {
        res.send({
            status:400,
            message: "Current password wrong!"
          });        
      }

      var newpass =  req.body.new_password;
      var password = md5(newpass);

      let updateValues = { password: password };

      User.update(updateValues,{
        where: {
          id: req.body.user_id
        }
      })
      .then(result => {
          res.status(200).send({    
                status:200,            
                message:'Your password has been changed successfully.'
              });
      })     
           
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};




exports.updatewallet = (req, res) => {

      console.log(req.body, 'req.body');

        if (!req.body.user_id) {
          res.send({
            status:400,
            message: "User Id can not be empty!"
          });
        }

        if (!req.body.amount) {
          res.send({
            status:400,
            message: "Amount can not be empty!"
          });
        }


        UserWallet.findOne({
          where: {
            user_id: req.body.user_id,            
          },          
        })
        .then(user => {
          if (!user) {
            return res.status(200).send({ status:200,message: "User Not found." });
          }     

          let oldamount = user.amount;

          let newamount = parseInt(oldamount) + parseInt(req.body.amount);
          
          UserWallet.update({amount:newamount},{
              where: {
                user_id: req.body.user_id
              }
            })
            .then(userwallet => {
             
              res.status(200).send({
                status:200,
                data: newamount,
                message:'Wallet has been updated successfully'
              });      
                  
                   
            })
            .catch(err => {
              res.status(500).send({ message: err.message });
            });   
              
               
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });        

};

exports.getwallet = (req, res) => {

    console.log(req.body, 'req.body');

        if (!req.body.user_id) {
          res.send({
            status:400,
            message: "User Id can not be empty!"
          });
        }

        UserWallet.findOne({
          where: {
            user_id: req.body.user_id,            
          },          
        })
        .then(user => {
          if (!user) {
            return res.status(200).send({ status:200,message: "User Not found." });
          }      

          res.status(200).send({
            status:200,
            data: user.amount,
            message:'Wallet has been listed successfully'
          });      
              
               
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });

};





function crypt(string) {
  var len=string.length
  var intCarlu
  var carlu
  var newString="e"
  if ((string.charCodeAt(i)!=101)&&(len>0)) {
    for (var i=0; i<len; i++) {
      intCarlu=string.charCodeAt(i)
      rnd=Math.floor(Math.random()*7)
      newIntCarlu=30+10*rnd+intCarlu+i-48
      if (newIntCarlu<48) { newIntCarlu+=50 }
      if (newIntCarlu>=58 && newIntCarlu<=64) { newIntCarlu+=10 }
      if (newIntCarlu>=90 && newIntCarlu<=96) { newIntCarlu+=10 }
      carlu=String.fromCharCode(newIntCarlu)
      newString=newString.concat(carlu)
    }
    return newString
  } else {
    return string
  }
}


function decrypt(string) {
  var len=string.length
  var intCarlu
  var carlu
  var newString=""

  if (string.charCodeAt(i)==101) {
    for (var i=1; i<len; i++) {
      intCarlu=string.charCodeAt(i)
      carlu=String.fromCharCode(48+(intCarlu-i+1)%10)
      newString=newString.concat(carlu)
    }
    return newString
  } else {
    return string
  }
}
exports.termsconditions = (req, res) => {

  termscondition.findAll({         
  order: [
          ['id', 'ASC'],            
      ]    
})
.then(noti => {      
  
    res.send({ status:200,data: noti, message: "tems and conditions listed successfully!" });
  
})
.catch(err => {
  res.status(500).send({ message: err.message });
});

}




exports.listChat = (req, res) => {

  if (!req.body.chat_id) {
    res.status(400).send({
      message: "chat_id can not be empty!"
    });
  }


  Chat.findAll({
    where: { chat_id: req.body.chat_id },
    order: [
      ['id', 'ASC'],
    ]
  })
    .then(chat => {

      res.send({ status: 200, data: chat, message: "Chat listed successfully!" });

    });


}

exports.adminsignin = (req, res) => {
  Admin.findOne({
    where: {
      mobileno: req.body.mobileno
    }
  })
    .then(user => {
      if (!user) {
        return res.status(200).send({ status:200,accessToken: null,message: "User Not found with this mobile no." });
      }

      var passwordIsValid = bcrypt.compareSync(
        String(req.body.password),
        user.password
      );

      if (!passwordIsValid) {
        return res.status(200).send({
          status:400,
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      if (!user.is_verify) {
        return res.status(200).send({
          status:400,
          accessToken: null,
          message: "Account not verified!",
        });
      }

      if (!user.is_activated) {
        return res.status(200).send({
          status:400,
          accessToken: null,
          message: "Account not activated!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      if(token){
        Admin.update({jwt_token:token},{
          where: {
            id: user.id
          }
        }).then(roles => {
          res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            mobileno:user.mobileno,
            admin_id:user.admin_id,
            roles: ['admin'],
            accessToken: token,
          }).catch(err => {
            res.status(500).send({ message: err.message });
          });
        });
      }
    })
};

exports.adminsignout = (req, res) => {
  Admin.findOne({
      where: {
        id: req.body.id,
        jwt_token: req.headers["x-access-token"]
      }
    }).then(user => {
        if (!user) {
          return res.send({ status:400,message: "User Not found with this token." });
        }
  
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 0
        });
        if(token){
          Admin.update({jwt_token:""},{
            where: {
              id: user.id
            }
          }).then(roles => {
            res.status(200).send({
              id: user.id,
              username: user.username,
              email: user.email,
              mobileno: user.mobileno,
              roles: ['admin'],
              accessToken: null,
              status:"Logout Successfully"
            }).catch(err => {
              res.status(500).send({ message: err.message });
            });
          });
          
        }
      })
  };

exports.userlist = (req, res) => {


  
    User.findAll({
      order: [
        ['id', 'ASC'],
      ]
    })
      .then(chat => {
  
        res.send({ status: 200, data: chat, message: "Chat listed successfully!" });
  
      });
  
  
  }
