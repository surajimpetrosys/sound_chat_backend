
const db = require("../models");

const Card = db.paymentcard;
const Notification = db.notification;
const UserWallet = db.userwallet;

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
          res.status(400).send({
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

exports.listCard = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  
  Card.findAll({ 
    where: { user_id: req.body.user_id },    
    attributes : ['id','name','last_digit','is_primary'],
    order: [
            ['id', 'DESC'],            
        ]    
  })
  .then(cards => {  

      UserWallet.findOne({
        where: { user_id: req.body.user_id }
      })
      .then(wallet => {    
          if(wallet){
            res.send({ status:200,wallet: wallet.amount, data: cards, message: "Cards listed successfully!" });
          }else{
            res.send({ status:200,wallet: '0', data: cards, message: "Cards listed successfully!" });
          }
          
      });
    
      
    
  });
  

}



exports.deleteCard = (req, res) => {

  if (!req.body.user_id || !req.body.card_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  
  Card.findOne({ 
    where: { user_id: req.body.user_id, id: req.body.card_id },    
  })
  .then(cards => { 
      console.log(cards);
      if(cards){
        if(!cards.is_primary){
            cards.destroy({

            }).
            then(c =>{
                // insert notifications
                  Notification.create({
                    'title': 'Delete Card',
                    'description': 'You have successfully deleted card.',
                    'type':'payment',
                    'user_id': req.body.user_id
                  });

                res.send({ status:200,message: "Cards deleted successfully!" });  
            })
            
        }else{
            res.send({
              status:400,
              message: "You cannot delete primary card. please make other card as primary and then try again!"
            });
        }
      }else{
          res.send({
              status:400,
              message: "card not found!"
            });
      }             
    
  });
  

}



exports.primaryCard = (req, res) => {

  if (!req.body.user_id || !req.body.card_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  
  Card.findOne({ 
    where: { user_id: req.body.user_id, id: req.body.card_id },    
  })
  .then(cards => { 
      console.log(cards);
      if(cards){
        if(!cards.is_primary){            

             let updateValues = { is_primary: '0' };

              Card.update(updateValues,{
                where: {
                  user_id: req.body.user_id
                }
              })
            

            cards.update({
                 'is_primary' : '1'           
            }).
            then(c =>{
                // insert notifications
                  Notification.create({
                    'title': 'Card Status',
                    'description': 'You have successfully changed card as primary.',
                    'type':'payment',
                    'user_id': req.body.user_id
                  });

                res.send({ status:200,message: "Card set as primary successfully!" });  
            })
            
        }else{
            res.send({
              status:400,
              message: "This card is already set as primary card!"
            });
        }
      }else{
          res.send({
              status:400,
              message: "card not found!"
            });
      }             
    
  });
  

}


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




