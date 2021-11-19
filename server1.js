var request = require('request');
const hostname = '3.23.210.57'
const port =3035;

const app = require('express')();
//const axios = require('axios');
const http = require('http').createServer(app)
const bodyParser = require('body-parser');

// parse application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


/* Creating MySQL connection.*/

var mysql = require("mysql");

/*var con    =    mysql.createPool({
    host              :   'localhost',
    user              :   'root',
    password          :   '',
    database          :   'phy'
});
*/

var con    =    mysql.createPool({
    host              :   'localhost',
    user              :   'root',
    password          :   'iss@123',
    database          :   'backup'
});


app.get('/group_chat_history', function(req, res) {
  let sql = "SELECT * FROM groupchat limit 0,10";
  let query = con.query(sql, (err, results) => {
    if(err) throw err;
     res.send(JSON.stringify({"msg_code": 400, "message": "Group Chat History List", "data": results}));
  });
});

app.get('/group_chat_history_bylastmessageid/:id', function(req, res) {
  var id=req.params.id;
  let sql = "SELECT * FROM groupchat where id >"+id+" limit 0,10";
  let query = con.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"msg_code": 400, "message": "Group Chat History List", "data": results}));
  });
});


  
const socketio = require('socket.io')(http)
socketio.on("connection", (userSocket) => {

	    console.log("socket connected successfully");

    userSocket.on("send_message", (data) => {

        console.log("scoket message broadcast successfully.");

        let chatdata = {sender_id: data.senderId, room_id: data.roomId, message: data.message};
        let sql = "INSERT INTO groupchat SET ?";
        let query = con.query(sql, chatdata,(err, results) => {
        });
       
        userSocket.broadcast.emit("receive_message", data);

})

});


http.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
