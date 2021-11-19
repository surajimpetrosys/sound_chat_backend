const db = require("../models");
// const { interviews } = require("../models");
const Plan = db.plan;
const Subscriber = db.subscriber;

var bcrypt = require("bcryptjs");

const multer = require("multer");
// const { subscriber } = require("../models");
exports.listplan = (req, res) => {

    Plan.findAll({  
        plan: [
            ['id', 'DESC'],            
        ]    
  })
  .then(noti => {      
    
      res.send({ status:200,data: noti, message: "Plan listed successfully!" });
    
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
  
}

// exports.usersubscription = (req, res) => {
//   if (!req.body) {
//       res.status(400).send({
//       message: "Content can not be empty!"
//       });
//       }
//       else{
//         let responce = {
//           user_id:req.body.user_id, 
//           plan_id: req.body.plan_id,
//           status: req.body.payment_status
//         }
//         res.send({ status:200,data: responce, message: "user got the plan successfully!" });
//       }

// }
exports.usersubscription = (req, res) => {
          if (!req.body) {
            res.status(400).send({
            message: "Content can not be empty!"
            });
            }
            else{
            var expireddate = req.body.expireddate
            var currentdate = req.body.currentdate;
            // if(req.body.plan_id ==='1') {
            //      expireddate.setMonth(expireddate.getMonth());
            // }else if (req.body.plan_id==='2') {
            //   expireddate.setMonth(expireddate.getMonth() + 1);
            // }else if(req.body.plan_id ==='3'){
            //   expireddate.setMonth(expireddate.getMonth() + 3);
            // }
            var plan_id = ''
              if(req.body.plan_id){
                plan_id = req.body.plan_id
              }
          // insert
          Subscriber.create({
            user_id: req.body.user_id,
            subscription_id: req.body.subscription_id, 
            plan_id: plan_id,
            amount:req.body.amount,
            currency_type:req.body.currency_type,
            plan_type:req.body.plan_type,
            plan_level:req.body.plan_level,
            customer_id: req.body.customer_id,
            subscription_method: req.body.subscription_method,
            invoice_id: req.body.invoice_id, 
            payment_status: req.body.payment_status,
            stripe_status:"ACTIVE",   
            plan_expired: expireddate,
            plan_active: currentdate,
            plan_cancel: expireddate
          })
          .then(subscriberresponce => {

            res.send({ status:200,data:subscriberresponce,message: "user Subscribed the plan successfully!" }); 
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });

      }
    }
    exports.subscriptiondetails = (req, res) => {

      if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      
      Subscriber.findOne({ 
        where: { user_id: req.body.user_id },
        //attributes:['id','vehicle_type','vehicle_no'],
        order: [
                ['user_id', 'DESC'],            
            ]
      })
      .then(interviews => {      
        
          res.send({ status:200, data: interviews, message: "subscriptions details Here!" });
        
      })
      .catch(err => {
              res.status(500).send({ message: err.message });
            });
    }

exports.updatesubscriberplan = (req, res) => {

      if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }

      if (!req.body.user_id) {
        res.send({
          status:400,
          message: "user Id can not be empty!"
        });
      }

      var currentdate = new Date();
      let updatedvalues = {
      };

     if(req.body.plan_level){
        updatedvalues['plan_level'] = req.body.plan_level;
      }

     if(req.body.plan_type){
        updatedvalues['plan_type'] = req.body.plan_type;
      }

      if(req.body.subscription_id){
        updatedvalues['subscription_id'] = req.body.subscription_id; 
      }
      if(req.body.plan_id){
        updatedvalues['plan_id'] = req.body.plan_id; 
      }
      if(req.body.amount){
        updatedvalues['amount'] = req.body.amount; 
      }

      if(req.body.currency_type){
        updatedvalues['currency_type'] = req.body.currency_type; 
      }

      if(req.body.customer_id){
        updatedvalues['customer_id'] = req.body.customer_id; 
      }

      if(req.body.subscription_method){
        updatedvalues['subscription_method'] = req.body.subscription_method; 
      }

      if(req.body.invoice_id){
        updatedvalues['invoice_id'] = req.body.invoice_id; 
      }

      if(req.body.payment_status){
        updatedvalues['payment_status'] = req.body.payment_status; 
      }

      if(req.body.expireddate){
        updatedvalues['expireddate'] = req.body.expireddate; 
      }

      if(req.body.currentdate){
        updatedvalues['currentdate'] = req.body.currentdate; 
      }

      if(req.body.canceldate){
        updatedvalues['plan_cancel'] = req.body.canceldate; 
      }
      updatedvalues['stripe_status'] = "ACTIVE";
      // insert
      Subscriber.update(updatedvalues,{
        where : { user_id : req.body.user_id }
      })
      .then(interviews => {

        res.send({ status:200, message: "subscription plan updated successfully!" });

                  
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
}


exports.cancelsubscriberplan = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  if (!req.body.user_id) {
    res.send({
      status:400,
      message: "user Id can not be empty!"
    });
  }

  var currentdate = new Date();
  let updatedvalues = {
  };
  if(req.body.subscription_id){
    updatedvalues['subscription_id'] = req.body.subscription_id; 
  }
  if(req.body.plan_id){
    updatedvalues['plan_id'] = req.body.plan_id; 
  }
  if(req.body.amount){
    updatedvalues['amount'] = req.body.amount; 
  }

  if(req.body.currency_type){
    updatedvalues['currency_type'] = req.body.currency_type; 
  }

  if(req.body.customer_id){
    updatedvalues['customer_id'] = req.body.customer_id; 
  }

  if(req.body.subscription_method){
    updatedvalues['subscription_method'] = req.body.subscription_method; 
  }

  if(req.body.invoice_id){
    updatedvalues['invoice_id'] = req.body.invoice_id; 
  }

  if(req.body.payment_status){
    updatedvalues['payment_status'] = req.body.payment_status; 
  }

  if(req.body.expireddate){
    updatedvalues['expireddate'] = req.body.expireddate; 
  }

  if(req.body.currentdate){
    updatedvalues['currentdate'] = req.body.currentdate; 
  }

  if(req.body.canceldate){
    updatedvalues['plan_cancel'] = req.body.canceldate;
  }
updatedvalues['stripe_status'] = "INACTIVE";

  // insert
  Subscriber.update(updatedvalues,{
    where : { user_id : req.body.user_id }
  })
  .then(interviews => {

    res.send({ status:200, message: "subscription plan Updated successfully!" });

              
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}
