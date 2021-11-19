
const db = require("../models");
const multer = require("multer");
const upload = multer({
  dest: "/var/www/html/soundradiobackend/images/product/"
});
var uploadSingle = upload.any();

const product = db.product;
const productavailability =db.productavailability;
exports.listproducts = (req, res) => {

    product.findAll({         
    order: [
            ['id', 'DESC'],            
        ],
        include:[{
          model: productavailability,          
          //attributes: ['id','name']
          }]      
  })
  .then(noti => {      
    
      res.send({ status:200,data: noti, message: "product listed successfully!" });
    
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
  
}

exports.productdetails = (req, res) => {

    if (!req.body) {
    res.status(400).send({
    message: "Content can not be empty!"
    });
    }
    
    
    product.findOne({ 
    where: { id: req.body.id },
    //attributes:['id','vehicle_type','vehicle_no'],
    order: [
          ['id', 'DESC'],            
      ],
include:[{
          model: productavailability,          
          //attributes: ['id','name']
          }]  
    })
    .then(productdetails => {      
    
    res.send({ status:200, data: productdetails, message: "product details here!" });
    
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
    
    
    }


exports.addproduct = (req, res) => {
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

        if (!mobileimage) {
          res.status(400).send({
            message: "poster for mobile can not be empty!"
          });
        }

      //  if (!desktopimage) {
    //      res.status(400).send({
            //message: "poster for desktop can not be empty!"
          //});
        //}
        if (!req.body.title) {
          res.status(400).send({
            message: "title can not be empty!"
          });
        }
        if (!req.body.description) {
          res.status(400).send({
            message: "description can not be empty!"
          });
        }
        if (!req.body.SKU) {
          res.status(400).send({
            message: "SKU can not be empty!"
          });
        }
        if (!req.body.Price) {
          res.status(400).send({
            message: "Price can not be empty!"
          });
        }
        if (!req.body.currency) {
          res.status(400).send({
            message: "currency can not be empty!"
          });
        }

        if (!req.body.Discount) {
          res.status(400).send({
            message: "Discount can not be empty!"
          });
        }
       // if (!req.body.Quantity) {
         // res.status(400).send({
           // message: "Quantity can not be empty!"
         // });
       // }
       // if (!req.body.size) {
         // res.status(400).send({
           // message: "size can not be empty!"
         // });
       // }
       // if (!req.body.color) {
         // res.status(400).send({
           // message: "color can not be empty!"
         // });
       // }

        if (!req.body.catogery) {
          res.status(400).send({
            message: "catogery can not be empty!"
          });
        }

        if (!mobileimage) {
          res.status(400).send({
            message: "image can not be empty!"
          });
        }
       


// if (!req.body.Shop) {
//   res.status(400).send({
//     message: "Shop can not be empty!"
//   });
// }
// if (!req.body.Published_At) {
//   res.status(400).send({
//     message: "Publish Date can not be empty!"
//   });
// }

// if (!req.body.Starts_At) {
//   res.status(400).send({
//     message: "Start Date can not be empty!"
//   });
// }
// if (!req.body.Ends_At) {
//   res.status(400).send({
//     message: "End Date can not be empty!"
//   });
// }


  product.findAll({where : 
    { title:req.body.title,SKU: req.body.SKU}
  })
  .then(Liveradios => {      
      
      if(Liveradios.length > 0){              

        res.send({ status:400, message: "post name/title/content  already is there!" });
      } else {

          // insert
          product.create({
            title: req.body.title,
            description: req.body.description,
            SKU: req.body.SKU,
            Price: req.body.Price,
            currency: req.body.currency,
            Discount: req.body.Discount,
           // Quantity: req.body.Quantity,
           // size: req.body.size, 
         //   color: req.body.color,
            catogery: req.body.catogery, 
            image: mobileimage,
      //      Shop: req.body.Shop,
    //        Published_At: req.body.Published_At,
  //          Starts_At: req.body.Starts_At,
//            Ends_At: req.body.Ends_At
          })
          .then(Liveradios => {

            res.send({ status:200,message: "Pruduct added successfully!" }); 
          })

      }
  })
  .catch(err => {
                  res.status(500).send({ message: err.message });
                });
              })

}

exports.updateproduct = (req, res) => {
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
            message: "pruduct Id can not be empty!"
          });
        }
        let updateValues = {};


       if(mobileimage){
        updateValues['image'] = mobileimage;
       }

      //  if(desktopimage){
      //   updateValues['feature_img_desktop'] = desktopimage;
      //  }
       if(req.body.title){
        updateValues['title'] = req.body.title
      }
      if(req.body.description){
        updateValues['description'] = req.body.description
      }
      if(req.body.SKU){
        updateValues['SKU'] = req.body.SKU
      }
      if(req.body.Price){
        updateValues['Price'] = req.body.Price
      }

       if(req.body.currency){
        updateValues['currency'] = req.body.currency
      }

      if(req.body.Discount){
        updateValues['Discount'] = req.body.Discount
      }

      if(req.body.Quantity){
        updateValues['Quantity'] = req.body.Quantity
      }

      if(req.body.size){
        updateValues['size'] = req.body.size
      }

      if(req.body.color){
        updateValues['color'] = req.body.color
      }

      if(req.body.catogery){
        updateValues['catogery'] = req.body.catogery
      }

      if(req.body.Shop){
        updateValues['Shop'] = req.body.Shop
      }

      if(req.body.Published_At){
        updateValues['Published_At'] = req.body.Published_At
      }

      if(req.body.Starts_At){
        updateValues['Starts_At'] = req.body.Starts_At
      }

      if(req.body.Ends_At){
        updateValues['Ends_At'] = req.body.Ends_At
      }

        // insert
        product.update(updateValues,{
          where : { id : req.body.id }
        })
        .then(interviews => {

          res.send({ status:200,data:interviews, message: "Product updated successfully!" });

                    
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
      })
}



exports.deleteproduct = (req, res) => {

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

  
  product.findOne({ 
    where: { id: req.body.id },    
  })
  .then(noti => { 
      if(noti){
        noti.destroy({

            }).
            then(c =>{

                res.send({ status:200,message: "pruduct deleted successfully!" });  
            })
      }else{
          res.send({
              status:400,
              message: "product not found!"
            });
      }             
    
  });
  

}



exports.addproductavailibility = (req, res) => {
  uploadSingle(req,res,function(err){
  var image = ''; var desktopimage = '';
        if(req.files){
            for (i = 0; i < req.files.length; i++) {
              if(req.files[i].fieldname == 'mobileimage'){
                image = (req.files[i].filename);
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

      //  if (!desktopimage) {
    //      res.status(400).send({
            //message: "poster for desktop can not be empty!"
          //});
        //}
        if (!req.body.id_product) {
          res.status(400).send({
            message: "product id can not be empty!"
          });
        }
        if (!req.body.price) {
          res.status(400).send({
            message: "price can not be empty!"
          });
        }
        if (!req.body.quantity) {
          res.status(400).send({
            message: "quantity can not be empty!"
          });
        }

       // if (!req.body.avaibility) {
        //  res.status(400).send({
           // message: "avaibility can not be empty!"
          //});
        //}

        if (!image) {
          res.status(400).send({
            message: "image can not be empty!"
          });
        }
        if (!req.body.color) {
          res.status(400).send({
            message: "color can not be empty!"
          });
        }
        if (!req.body.size) {
          res.status(400).send({
            message: "size can not be empty!"
          });
        }
        if (!req.body.hexcode) {
          res.status(400).send({
            message: "hexcode can not be empty!"
          });
        }

  productavailability.findAll({where : 
    { id_product: req.body.id_product, size:req.body.size, color:req.body.color,hexcode:req.body.hexcode}
  })
  .then(Liveradios => {      
      
      if(Liveradios.length > 0){              

        res.send({ status:400, message: "product size-color  already is there!" });
      } else {

          // insert
          productavailability.create({
            price: req.body.price,
            quantity: req.body.quantity,
            avaibility: req.body.quantity,
            size: req.body.size, 
            color: req.body.color,
            hexcode:req.body.hexcode,
            Image: image,
            id_product: req.body.id_product
          })
          .then(Liveradios => {

            res.send({ status:200,message: "Pruduct added successfully!" }); 
          })

      }
  })
  .catch(err => {
                  res.status(500).send({ message: err.message });
                });
              })

}

exports.updateproductavailibility = (req, res) => {
  uploadSingle(req,res,function(err){
        var image = ''; var desktopimage = '';
        if(req.files){
            for (i = 0; i < req.files.length; i++) {
              if(req.files[i].fieldname == 'mobileimage'){
                image = (req.files[i].filename);
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

        if (!req.body.id_product) {
          res.send({
            status:400,
            message: "pruduct Id can not be empty!"
          });
        }

if (!req.body.id) {
          res.send({
            status:400,
            message: "id can not be empty!"
          });
        }
        let updateValues = {};


       if(image){
        updateValues['Image'] = image;
       }

      //  if(desktopimage){
      //   updateValues['feature_img_desktop'] = desktopimage;
      //  }

       if(req.body.price){
        updateValues['price'] = req.body.price
      }

      if(req.body.quantity){
        updateValues['quantity'] = req.body.quantity
      }
      if(req.body.avaibility){
        updateValues['avaibility'] = req.body.avaibility
      }

      if(req.body.size){
        updateValues['size'] = req.body.size
      }

      if(req.body.color){
        updateValues['color'] = req.body.color
      }
if(req.body.hexcode){
        updateValues['hexcode'] = req.body.hexcode
      }

        // insert
        productavailability.update(updateValues,{
          where : { id_product: req.body.id_product, id:req.body.id }
        })
        .then(interviews => {

          res.send({ status:200,data:interviews, message: "Product availibility updated successfully!" });

                    
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
      })
}



exports.deleteproductavailibility = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  if (!req.body.id_product) {
    res.status(400).send({
      message: "id can not be empty!"
    });
  }


if (!req.body.id) {
          res.send({
            status:400,
            message: "id can not be empty!"
          });
        }

  productavailability.findOne({ 
    where: { id_product: req.body.id_product, id:req.body.id },   
  })
  .then(noti => { 
      if(noti){
        noti.destroy({

            }).
            then(c =>{

                res.send({ status:200,message: "pruduct availibility deleted successfully!" });  
            })
      }else{
          res.send({
              status:400,
              message: "product availibility not found!"
            });
      }             
    
  });
  

}


exports.checkproductavailibility = (req, res) => {
  var notinstockarray = [];

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
if (!req.body.carditems) {
    res.status(400).send({
      message: "card is required!"
    });
  }

  if (req.body.carditems.length < 1) {
    res.status(400).send({
      message: "card can not be empty!"
    });
  }


  for (let index = 0; index < req.body.carditems.length; index++) {

    productavailability.findOne({
      where: { id_product: req.body.carditems[index].product_id, size: req.body.carditems[index].size, color: req.body.carditems[index].color},
    })
      .then(noti => {
       

          if (noti) {
          if (noti.avaibility >= req.body.carditems[index].quantity) {
            console.log('available')
          } else {
            notinstockarray.push(noti.size)
            console.log(notinstockarray);
          }
        } else {
          console.log('not available')
        }

      });
  }
console.log(notinstockarray);
 res.send({ status:200, data:notinstockarray, message: "in this size and color, product is not available!" }); 
}





exports.detailsproductavailibility = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }


  productavailability.findOne({
    where: { id: req.body.id },
    //attributes:['id','vehicle_type','vehicle_no'],
    order: [
      ['id', 'DESC'],
    ]
  })
    .then(productdetails => {

      res.send({ status: 200, data: productdetails, message: "product  Avaibility details here!" });

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });


}
