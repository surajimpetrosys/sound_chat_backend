const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const { authJwt } = require("../middleware");
const interviews = require("../controllers/interviews.controller.js");
const radio = require("../controllers/radio.controller.js");
const driver = require("../controllers/driver.controller.js");

const gellery = require("../controllers/gellery.controller.js");
const podcast = require("../controllers/podcast.controller.js");
const slider = require("../controllers/slider.controller.js");
const shop = require("../controllers/shop.controller.js");
const order = require("../controllers/order.controller.js");
const plan = require("../controllers/plan.controller.js");
const music_album = require("../controllers/musicalbum.controller.js");
const adsbanner = require("../controllers/adsbanner.controller.js");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/v1/auth/signup",
    [
     // verifySignUp.checkDuplicateUsernameOrEmail,
     // verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.get("/verify", controller.verify);

  app.post("/api/v1/auth/signin", controller.signin);
  app.post("/api/v1/auth/interviews", [], interviews.listInterviews);
  app.post("/api/v1/auth/interviewsadd", [], interviews.addInterviews);
  app.post("/api/v1/auth/interviewsupdate", [], interviews.updateInterviews);
  app.post("/api/v1/auth/interviewsdetails", [], interviews.interviewDetail);
  app.post("/api/v1/auth/deleteinterviews", [], interviews.deleteInterviews);
  app.post("/api/v1/auth/alldeleteinterviews", [], interviews.alldeleteInterviews);

  app.post("/api/v1/auth/addgallery", [], gellery.addgallery);
  app.post("/api/v1/auth/listgallery", [], gellery.listgallery);
  app.post("/api/v1/auth/gallerydetails", [], gellery.gallerydetails);
  app.post("/api/v1/auth/updategallery", [], gellery.updategallery);
  app.post("/api/v1/auth/deletegallery", [], gellery.deletegallery);




  app.post("/api/v1/auth/adsbanner", [], adsbanner.bannerlist);
  app.post("/api/v1/auth/addbanner", [], adsbanner.addbanner);
  app.post("/api/v1/auth/updatebanner", [], adsbanner.updatebanner);
  app.post("/api/v1/auth/deletebanner", [], adsbanner.deletebanner);
  app.post("/api/v1/auth/bannerdetails", [], adsbanner.bannerdetails);


  app.post("/api/v1/auth/listpodcast", [], podcast.listpodcast);
  app.post("/api/v1/auth/homeslider", [], slider.homeslider);
  app.post("/api/v1/auth/addslider", [], slider.addslider);
  app.post("/api/v1/auth/updateslider", [], slider.updateslider);
  app.post("/api/v1/auth/deleteslider", [], slider.deleteslider);
  app.post("/api/v1/auth/sliderdetails", [], slider.sliderdetails);
  

  app.post("/api/v1/auth/listproduct", [], shop.listproducts);
  app.post("/api/v1/auth/productdetails", [], shop.productdetails);
  app.post("/api/v1/auth/addproduct", [], shop.addproduct);
  app.post("/api/v1/auth/updateproduct", [], shop.updateproduct);
  app.post("/api/v1/auth/deleteproduct", [], shop.deleteproduct);
  app.post("/api/v1/auth/addorder", [], order.addOrder);
  app.post("/api/v1/auth/listOrder", [], order.listOrder);
  app.post("/api/v1/auth/listallOrder", [], order.alllistOrder);
  app.post("/api/v1/auth/orderreport", [], order.OrderReport);
  app.post("/api/v1/auth/orderdetails", [], order.orderdetails);
  app.post("/api/v1/auth/updateorder", [], order.orderupdate);


  app.post("/api/v1/auth/addproductavailibility", [], shop.addproductavailibility);
  app.post("/api/v1/auth/updateproductavailibility", [], shop.updateproductavailibility);
  app.post("/api/v1/auth/deleteproductavailibility", [], shop.deleteproductavailibility);
  app.post("/api/v1/auth/checkproductavailibility", [], shop.checkproductavailibility);
  app.post("/api/v1/auth/detailsproductavailibility", [], shop.detailsproductavailibility);


  app.post("/api/v1/auth/listplan", [], plan.listplan);
  app.post("/api/v1/auth/usersubscription", [], plan.usersubscription);
  app.post("/api/v1/auth/subscriberdetails", [], plan.subscriptiondetails);
  app.post("/api/v1/auth/updatesubscriberplan", [], plan.updatesubscriberplan);
  app.post("/api/v1/auth/cancelsubscriberplan", [], plan.cancelsubscriberplan);




  app.post("/api/v1/auth/radiolive", [], radio.listliveradio);
  app.post("/api/v1/auth/addLiveradio", [], radio.addLiveradio);
  app.post("/api/v1/auth/editLiveradio", [], radio.editLiveradio);
  app.post("/api/v1/auth/LiveradioviewDetail", [], radio.LiveradioviewDetail);
  app.post("/api/v1/auth/deleteLiveradio", [], radio.deleteLiveradio);
  app.post("/api/v1/auth/alldeleteLiveradio", [], radio.alldeleteLiveradio);


  app.post("/api/v1/auth/listinstudio", [], radio.listinstudio);
  app.post("/api/v1/auth/addInstudiointerviews", [], radio.addInstudiointerviews);
  app.post("/api/v1/auth/editInstudiointerviews", [], radio.editInstudiointerviews);
  app.post("/api/v1/auth/InstudiointerviewsviewDetail", [], radio.InstudiointerviewsviewDetail);
  app.post("/api/v1/auth/deleteInstudiointerviews", [], radio.deleteInstudiointerviews);
  app.post("/api/v1/auth/alldeleteInstudiointerviews", [], radio.alldeleteInstudiointerviews);



  app.post("/api/v1/auth/listphoneinterviews", [], radio.listphoneinterviews);
  app.post("/api/v1/auth/addPhoneinterviews", [], radio.addPhoneinterviews);
  app.post("/api/v1/auth/deletePhoneinterviews", [], radio.deletePhoneinterviews);
  app.post("/api/v1/auth/editPhoneinterviews", [], radio.editPhoneinterviews);
  app.post("/api/v1/auth/PhoneinterviewsviewDetail", [], radio.PhoneinterviewsviewDetail);
  app.post("/api/v1/auth/alldeletePhoneinterviews", [], radio.alldeletePhoneinterviews);


  app.post("/api/v1/auth/addperdayschedule", [], radio.addperdayschedule);
  app.post("/api/v1/auth/deleteperdayschedule", [], radio.deleteperdayschedule);
  app.post("/api/v1/auth/updateperdayschedule", [], radio.updateperdayschedule);
 // app.post("/api/v1/auth/updateshowschedule", [], radio.updateshowschedule);
  app.post("/api/v1/auth/detailsperdayschedule", [], radio.detailsperdayschedule);


  app.post("/api/v1/auth/listsoundchatlive", [], radio.listsoundchatlive);
  app.post("/api/v1/auth/addSoundchatlive", [], radio.addSoundchatlive);
  app.post("/api/v1/auth/editSoundchatlive", [], radio.editSoundchatlive);
  app.post("/api/v1/auth/SoundchatliveviewDetail", [], radio.SoundchatliveviewDetail);
  app.post("/api/v1/auth/deleteSoundchatlive", [], radio.deleteSoundchatlive);
  app.post("/api/v1/auth/alldeleteSoundchatlive", [], radio.alldeleteSoundchatlive);

  app.post("/api/v1/auth/listshowscheduleperday", [], radio.listshowscheduleperday);
  
  app.post("/api/v1/auth/listlivecontent", [], radio.listlivecontent);
  app.post("/api/v1/auth/livecontentdetails", [], radio.livecontentdetails);
  app.post("/api/v1/auth/updatelivecontent", [], radio.updatelivecontent);


  app.post("/api/v1/auth/listshowschedule", [], radio.listshowschedule);
  app.post("/api/v1/auth/updateshowschedule", [], radio.updateshowschedule);
  app.post("/api/v1/auth/detailsshowschedule", [], radio.detailsshowschedule);
//app.post("/api/v1/auth/updateshowschedule", [], radio.updateshowschedule);
  app.post("/api/v1/auth/addSundayschedule", [], radio.addSundayschedule);
  app.post("/api/v1/auth/editSundayschedule", [], radio.editSundayschedule);
  app.post("/api/v1/auth/SundayscheduleviewDetail", [], radio.SundayscheduleviewDetail);
  app.post("/api/v1/auth/deleteSundayschedule", [], radio.deleteSundayschedule);
  app.post("/api/v1/auth/alldeleteSundayschedule", [], radio.alldeleteSundayschedule);


  app.post("/api/v1/auth/updateprofile", controller.updateprofile);
  app.post("/api/v1/adddriver",[], driver.addDriver);

  app.post("/api/v1/auth/getprofile", controller.getprofile);

  app.post("/api/v1/auth/changepassword", controller.changepassword);

  app.post("/api/v1/auth/forgetpassword", controller.forgetpassword);

  app.post("/api/v1/auth/termsconditions", controller.termsconditions);
 
  app.post("/api/v1/auth/listchat",controller.listChat);
  app.post("/api/v1/auth/listmusicalbum", [], music_album.listmusicalbum);
  app.post("/api/v1/auth/musicalbumdetails", [], music_album.musicalbumdetails);
  app.post("/api/v1/auth/addmusicalbum", [], music_album.addmusicalbum);
  app.post("/api/v1/auth/updatemusicalbum", [], music_album.updatemusicalbum);
  app.post("/api/v1/auth/deletemusicalbum", [], music_album.deletemusicalbum);


  app.post("/api/v1/auth/submitreview", [], music_album.addReview);
  app.post("/api/v1/auth/reviewlist", [], music_album.getReview); 

  app.post("/api/v1/auth/updatewallet", controller.updatewallet);
  app.post("/api/v1/auth/getwallet", controller.getwallet);

  app.post("/api/v1/auth/deletereport", [], gellery.deletereport);
  app.post("/api/v1/auth/listreport", [], gellery.listreport);
  app.post("/api/v1/auth/setreport", [], gellery.setreport);
  app.post("/api/v1/auth/updatereport", [], gellery.updatereport);
  app.post("/api/v1/auth/detailsreport", [], gellery.detailsreport);
  app.post("/api/v1/auth/userlist", [], controller.userlist);

  app.post("/api/v1/auth/deleteadsquery", [], gellery.deleteadsquery);
  app.post("/api/v1/auth/listadsquery", [], gellery.listadsquery);
  app.post("/api/v1/auth/setadsquery", [], gellery.setadsquery);
  app.post("/api/v1/auth/updateadsquery", [], gellery.updateadsquery);
  app.post("/api/v1/auth/detailsadsquery", [], gellery.detailsadsquery);



  app.post("/api/v1/auth/signout", controller.signout);
  app.post(
    "/api/v1/auth/signout",
    [authJwt.verifyToken],
    controller.signout
  );
    app.post("/api/v1/auth/admin/signin", controller.adminsignin);
    app.post("/api/v1/auth/admin/signout",[authJwt.adminverifyToken],controller.adminsignout);
};
