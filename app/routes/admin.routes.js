module.exports = app => {
    
    const paymentcard = require("../controllers/paymentcard.controller.js");
    const notification = require("../controllers/notification.controller.js");
    const general = require("../controllers/general.controller.js");
    const controller = require("../controllers/auth.controller");
    const { authJwt } = require("../middleware");
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
    

    app.post("/api/v1/addcard",[], paymentcard.addCard);
    app.post("/api/v1/listcard",[], paymentcard.listCard);
    app.post("/api/v1/deletecard",[], paymentcard.deleteCard);
    app.post("/api/v1/primarycard",[], paymentcard.primaryCard);
    app.post("/api/v1/listnotification",[], notification.listNotification);
    app.post("/api/v1/auth/admin/signin",[authJwt.verifyToken], controller.adminsignin);
    app.post("/api/v1/auth/admin/signout",[authJwt.verifyToken],controller.adminsignout);

}

