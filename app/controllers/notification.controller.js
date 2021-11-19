
const db = require("../models");

const Card = db.paymentcard;
const Notification = db.notification;

exports.addCard = (req, res) => {

        if (!req.body) {
          res.status(400).send({
            message: "Content can not be empty!"
          });
        }

        if (!req.body.name || !req.body.card_no || !req.body.cvv || !req.body.expire_month || !req.body.expire_year) {
          res.status(400).send({
            message: "Some fields are empty!"
          });
        }

        if (!req.body.user_id) {
          res.send({
            status:400,
            message: "Invalid user_id!"
          });
        }


        Card.findOne({ 
          where: { user_id: req.body.user_id , is_primary : '1'},                    
        })
        .then(cards => {                  
            console.log('cards',cards);
            var crypted = crypt(req.body.card_no);            
                                    
            var last_digit = req.body.card_no.replace(/.(?=.{4})/g, 'x');            

            if(cards){

                Card.findAll({ 
                    where: { user_id: req.body.user_id },  
                })
                .then(allcards => {
                      var flag = 0;
                      for(var i=0; i<allcards.length; i++){
                          if(req.body.card_no == decrypt(allcards[i].card_no)){
                            flag = 1;
                          }
                      }

                      if(flag){
                        res.send({
                          status:400,
                          message: "This card is already registered!"
                        });
                      }
                      else{
                          Card.create({
                            name: req.body.name,
                            card_no: crypted,
                            last_digit : last_digit,
                            cvv: crypt(req.body.cvv),
                            expire_month: req.body.expire_month,
                            expire_year: req.body.expire_year,
                            is_primary: '0',
                            user_id: req.body.user_id
                          })
                          .then(card => {          
                            console.log(card.id);
                            // insert notifications
                            Notification.create({
                              'title': 'New Card',
                              'description': 'You have successfully registered card.',
                              'type':'payment',
                              'user_id': req.body.user_id
                            });

                            res.send({ status:200,message: "Card registered successfully!" }); 
                          })
                          .catch(err => {
                            res.status(500).send({ message: err.message });
                          });
                      }
                })

                
            }else{
                Card.create({
                  name: req.body.name,
                  card_no: crypted,
                  last_digit : last_digit,
                  cvv: crypt(req.body.cvv),
                  expire_month: req.body.expire_month,
                  expire_year: req.body.expire_year,
                  is_primary: '1',
                  user_id: req.body.user_id
                })
                .then(card => {          
                  console.log(card.id);
                  // insert notifications
                  Notification.create({
                    'title': 'New Card',
                    'description': 'You have successfully registered card.',
                    'type':'payment',
                    'user_id': req.body.user_id
                  });

                  res.send({ status:200,message: "Card registered successfully!" }); 
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

exports.listNotification = (req, res) => {

  if (!req.body.user_id) {
    res.status(400).send({
      message: "user_id can not be empty!"
    });
  }

  
  Notification.findAll({ 
    where: { user_id: req.body.user_id },        
    order: [
            ['id', 'DESC'],            
        ]    
  })
  .then(noti => {      
    
      res.send({ status:200,data: noti, message: "Notifications listed successfully!" });
    
  });
  

}















