
const db = require("../models");

const Material = db.material;
const Feature = db.feature;
const VehicleType = db.vehicletype;



exports.listMaterial = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "content can not be empty!"
    });
  }

  
  Material.findAll({ 
    where: { status: '1' },        
    order: [
            ['id', 'ASC'],            
        ]    
  })
  .then(material => {      
    
      res.send({ status:200,data: material, message: "Material listed successfully!" });
    
  });
  

}


exports.listFeature = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "content can not be empty!"
    });
  }

  
  Feature.findAll({ 
    where: { status: '1' },        
    order: [
            ['id', 'ASC'],            
        ]    
  })
  .then(feature => {      
    
      res.send({ status:200,data: feature, message: "Feature listed successfully!" });
    
  });
  

}



exports.listVehicleType = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "content can not be empty!"
    });
  }

  
  VehicleType.findAll({ 
    where: { status: '1' },        
    order: [
            ['id', 'ASC'],            
        ]    
  })
  .then(type => {      
    
      res.send({ status:200,data: type, message: "Vehicle Type listed successfully!" });
    
  });
  

}















