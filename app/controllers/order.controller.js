const db = require("../models");
// const { interviews } = require("../models");
const Order = db.order;
const User = db.user;
var bcrypt = require("bcryptjs");

const multer = require("multer");
const upload = multer({
  dest: "/var/www/html/soundradiobackend/images/product/"
});
var uploadSingle = upload.any();
const productavailability = db.productavailability;

const moment = require('moment');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
exports.listOrder = (req, res) => {

    Order.findAll({  
        where: { user_id: req.body.user_id },
        order: [
            ['order_id', 'DESC'],            
        ]    
  })
  .then(noti => {      
    
      res.send({ status:200,data: noti, message: "Order listed successfully!" });
    
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
  
}


exports.addOrder = (req, res) => {
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        }
console.log(req.body.items);
            // insert
            Order.create({
              order_id:req.body.order_id, 
              user_id: req.body.user_id,
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              address_1: req.body.address_1,
              address_2: req.body.address_2,
              city: req.body.city,
              state: req.body.state,
              postcode: req.body.postcode,
              country: req.body.country,
              email: req.body.email,
              phone: req.body.phone,
              items: req.body.items,
              discount: req.body.discount,
              total_amount: req.body.total_amount,
              payment_method: req.body.payment_method,
              transaction_id: req.body.transaction_id,
              transaction_status: req.body.transaction_status,
              order_status:"0"
            })
            .then(order => {
              for (let index = 0; index < req.body.items.length; index++) {

                productavailability.findOne({
                  where: { id_product: req.body.items[index].product_id, size: req.body.items[index].size, color: req.body.items[index].color},
                })
                  .then(noti => {
            
                      let updateValues = {}
                      updateValues['avaibility'] = noti.avaibility - req.body.items[index].quantity
                      if (req.body.transaction_status==='succeeded') {
                        productavailability.update(updateValues, {
                          where: { id_product: req.body.items[index].product_id, size: req.body.items[index].size, color: req.body.items[index].color},
                        })
                          .then(interviews => {
                    
                            console.log('updated');
                    
                    
                          })
                          .catch(err => {
                            res.status(500).send({ message: err.message });
                          });

                    } else {
                      console.log('not available')
                    }
            
                  });
              }
            
              res.send({ status:200,message: "order added successfully!" }); 
            })
            .catch(err => {
              res.status(500).send({ message: err.message });
            });

}

exports.addOrder1 = (req, res) => {
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        }

            // insert
            Order.create({
              order_id:req.body.order_id, 
              user_id: req.body.user_id,
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              address_1: req.body.address_1,
              address_2: req.body.address_2,
              city: req.body.city,
              state: req.body.state,
              postcode: req.body.postcode,
              country: req.body.country,
              email: req.body.email,
              phone: req.body.phone,
              items: req.body.items,
              discount: req.body.discount,
              total_amount: req.body.total_amount,
              payment_method: req.body.payment_method,
              transaction_id: req.body.transaction_id,
              transaction_status: req.body.transaction_status,
              order_status:"0"
            })
            .then(order => {

              res.send({ status:200,message: "order added successfully!" }); 
            })
            .catch(err => {
              res.status(500).send({ message: err.message });
            });

}


exports.alllistOrder = (req, res) => {

  Order.findAll({  
      order: [
          ['order_id', 'DESC'],            
      ]    
})
.then(noti => {      
  
    res.send({ status:200,data: noti, message: "Order listed successfully!" });
  
})
.catch(err => {
  res.status(500).send({ message: err.message });
});

}

exports.OrderReport = (req, res) => {

              Order.count({distinct: 'order_id', where: { createdAt:{[Op.gte]: moment().subtract(7, 'days').toDate()}}},{
              }).then(worder => {
                Order.count({distinct: 'order_id'},{
                }).then(totalorder => {
                  User.count({distinct: 'id', where: { createdAt:{[Op.gte]: moment().subtract(7, 'days').toDate()}}},{
                  }).then(wuser => {
                    User.count({distinct: 'id'},{
                    }).then(totaluser => {
                      res.send({ status: 200,worder:worder,totalorder:totalorder,wuser:wuser,totaluser:totaluser, message: "Order Report listed successfully!" });
                    }) 
                  }) 
                }) 
              }) 
}



exports.orderdetails = (req, res) => {

  if (!req.body) {
  res.status(400).send({
  message: "Content can not be empty!"
  });
  }
  Order.findOne({ 
  where: { order_id: req.body.id },
  //attributes:['id','vehicle_type','vehicle_no'],
  order: [
        ['order_id', 'DESC'],            
    ]
  })
  .then(productdetails => {      
  
  res.send({ status:200, data: productdetails, message: "order details here!" });
  
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
  
  }



  exports.orderupdate = (req, res) => {
uploadSingle(req, res, function (err) {
      if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
  
      if (!req.body.order_id) {
        res.send({
          status: 400,
          message: "order Id can not be empty!"
        });
      }
  
      let updateValues = {};
  
      if (req.body.order_status) {
        updateValues['order_status'] = req.body.order_status
      }
  
  
      // insert
  
      Order.update(updateValues, {
        where: { order_id: req.body.order_id }
      })
        .then(interviews => {
  
          res.send({ status: 200, data: interviews, message: "Order updated successfully!" });
  
  
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
  })
}
