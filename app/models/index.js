const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.admin = require("./admin.model.js")(sequelize, Sequelize);

db.role = require("./role.model.js")(sequelize, Sequelize);
db.userprofile = require("./userProfile.model.js")(sequelize, Sequelize);
db.userwallet = require("./userWallet.model.js")(sequelize, Sequelize);


db.paymentcard = require("./paymentCard.model.js")(sequelize, Sequelize);

db.notification = require("./notification.model.js")(sequelize, Sequelize);
db.interviews = require("./interviews.model.js")(sequelize, Sequelize);
db.liveradio = require("./liveradio.model.js")(sequelize, Sequelize);
db.studiointerviews = require("./instudioradio.model.js")(sequelize, Sequelize);
db.phoneinterviews = require("./phoneinterviews.model.js")(sequelize, Sequelize);
db.soundchatlive = require("./soundchatradio.model.js")(sequelize, Sequelize);
db.sundayschedule = require("./sundayshow.model.js")(sequelize, Sequelize);
db.mondayschedule = require("./mondayshow.model.js")(sequelize, Sequelize);
db.tuesdayschedule = require("./tuesdayshow.model.js")(sequelize, Sequelize);
db.thursdayschedule = require("./thursdayshow.model.js")(sequelize, Sequelize);
db.wednesdayschedule = require("./wednesdayshow.model.js")(sequelize, Sequelize);
db.fridayschedule = require("./fridayshow.model.js")(sequelize, Sequelize);
db.suturdayschedule = require("./suturdayshow.model.js")(sequelize, Sequelize);
db.gelleries = require("./gellery.model.js")(sequelize, Sequelize);
db.podcast = require("./podcast.model.js")(sequelize, Sequelize);
db.slider = require("./slider.model.js")(sequelize, Sequelize);
db.schedule = require("./schedule.model.js")(sequelize, Sequelize);
db.product = require("./product.model.js")(sequelize, Sequelize);
db.order = require("./order.model.js")(sequelize, Sequelize);
db.plan = require("./plan.model.js")(sequelize, Sequelize);
db.subscriber = require("./subscriber.model.js")(sequelize, Sequelize);
db.termscondition = require("./termscondition.model.js")(sequelize, Sequelize);


db.musicalbum = require("./musicalbum.model.js")(sequelize, Sequelize);
db.albumreview= require("./albumreview.model.js")(sequelize, Sequelize);

db.adsbanner =  require("./adsbanner.model.js")(sequelize, Sequelize);

db.galleryimage =  require("./galleryimage.model.js")(sequelize, Sequelize);
db.audio =  require("./audio.model.js")(sequelize, Sequelize);
db.chat = require("./chat.model.js")(sequelize, Sequelize);

db.report = require("./report.model.js")(sequelize, Sequelize);
db.reportmedia = require("./reportmedia.model.js")(sequelize, Sequelize);
db.productavailability = require("./productavailability.model.js")(sequelize, Sequelize);
db.scheduleperday = require("./scheduleperday.model.js")(sequelize, Sequelize);
db.livecontent = require("./livecontent.model.js")(sequelize, Sequelize);

db.adsquery = require("./adsquery.model.js")(sequelize, Sequelize);
db.adsquerymedia = require("./adsquerymedia.model.js")(sequelize, Sequelize);

// db.vehicle = require("./vehicle.model.js")(sequelize, Sequelize);
// db.vehiclefeature = require("./vehicleFeature.model.js")(sequelize, Sequelize);
// db.vehicleprice = require("./vehiclePrice.model.js")(sequelize, Sequelize);
// db.vehiclematerial = require("./vehicleMaterial.model.js")(sequelize, Sequelize);
// db.vehicleimages = require("./vehicleImages.model.js")(sequelize, Sequelize);
// db.vehicleassign = require("./vehicleAssign.model.js")(sequelize, Sequelize);

// db.tripassign = require("./tripAssign.model.js")(sequelize, Sequelize);

// db.userVehicleType = sequelize.define('user_vehicle_types')


// db.loadgoods = require("./loadGoods.model.js")(sequelize, Sequelize);
// db.goodsimages = require("./goodsImages.model.js")(sequelize, Sequelize);
// db.trip = require("./trip.model.js")(sequelize, Sequelize);
// db.tripgoods = require("./tripgoods.model.js")(sequelize, Sequelize);
// db.contract = require("./contract.model.js")(sequelize, Sequelize);
// db.contractgoods = require("./contractgoods.model.js")(sequelize, Sequelize);
// db.docimage = require("./DocImage.model.js")(sequelize, Sequelize);

// db.vehicletype = require("./vehicleType.model.js")(sequelize, Sequelize);
// db.material = require("./material.model.js")(sequelize, Sequelize);
// db.feature = require("./feature.model.js")(sequelize, Sequelize);

//*********** relations ******************

db.user.hasOne(db.userprofile, {foreignKey: 'user_id'});

db.user.hasOne(db.userwallet, {foreignKey: 'user_id'});
db.albumreview.belongsTo(db.musicalbum, {foreignKey: 'album_id'});
db.musicalbum.hasMany(db.audio, {foreignKey: 'album_id'});
db.report.hasMany(db.reportmedia, {foreignKey: 'id_report'});
db.product.hasMany(db.productavailability, {foreignKey: 'id_product'});
db.schedule.hasMany(db.scheduleperday, {foreignKey: 'day_id'});

db.adsquery.hasMany(db.adsquerymedia, {foreignKey: 'id_query'});

// db.vehicle.hasMany(db.vehiclefeature, {foreignKey: 'vehicle_id'});

// db.vehicle.hasOne(db.vehicleprice, {foreignKey: 'vehicle_id'});

// db.vehicle.hasMany(db.vehiclematerial, {foreignKey: 'vehicle_id'});

// db.vehicle.hasMany(db.vehicleimages, {foreignKey: 'vehicle_id'});


// db.loadgoods.hasMany(db.goodsimages, {foreignKey: 'goods_id'});

// db.vehicletype.belongsToMany(db.vehicle, {  
//   through: "user_vehicle_types",
//   foreignKey: "vehicleTypeId",
//   otherKey: "vehicleId"
// });
// db.vehicle.belongsToMany(db.vehicletype, {
//   as: 'vtype',
//   through: "user_vehicle_types",
//   foreignKey: "vehicleId",
//   otherKey: "vehicleTypeId"
// });
db.gelleries.hasMany(db.galleryimage, {foreignKey: 'gallery_id'});

// db.vehicle.belongsTo(db.user, {foreignKey: 'user_id'})

// db.contractgoods.belongsTo(db.contract, { foreignKey : 'contract_id' });
// db.contract.hasMany(db.contractgoods, { foreignKey : 'contract_id' });
// db.contractgoods.belongsTo(db.loadgoods, { foreignKey : 'goods_id' });
// db.loadgoods.hasMany(db.contractgoods, { foreignKey : 'goods_id' });

// db.tripgoods.belongsTo(db.trip, { foreignKey : 'trip_id' });
// db.trip.hasMany(db.tripgoods, { foreignKey : 'trip_id' });
// db.tripgoods.belongsTo(db.loadgoods, { foreignKey : 'goods_id' });
// db.loadgoods.hasMany(db.tripgoods, { foreignKey : 'goods_id' });

// db.trip.belongsTo(db.vehicle, { foreignKey : 'vehicle_id' });
// db.trip.belongsTo(db.user, { as: 'sender', foreignKey : 'sender_id' });
// db.trip.belongsTo(db.user, { as: 'receiver', foreignKey : 'receiver_id' });
// db.contractgoods.belongsToMany(db.contract, {  
//   through: db.contractgoods,  
//   foreignKey: "goods_id",
//   otherKey: "contract_id"
// });
// db.contract.belongsToMany(db.contractgoods, {
//   as: 'contractgoods', 
//   through: db.contractgoods,   
//   foreignKey: "contract_id",
//   otherKey: "goods_id"
// });


// db.user.hasMany(db.vehicleassign, {foreignKey: 'user_id'});
// db.vehicleassign.belongsTo(db.vehicle, {foreignKey: 'vehicle_id'});
// db.vehicleassign.belongsTo(db.user, {foreignKey: 'user_id'});



// db.user.hasMany(db.tripassign, {foreignKey: 'user_id'});
// db.tripassign.belongsTo(db.trip, {foreignKey: 'trip_id'});
// db.tripassign.belongsTo(db.user, {foreignKey: 'user_id'});
// db.trip.hasOne(db.tripassign, {foreignKey: 'trip_id'});
//db.vehicleimages.belongsTo(db.vehicle, {foreignKey: 'vehicle_id'});

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["Freemium", "Premium", "PremiumPlus","admin"];

module.exports = db;
