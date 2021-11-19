const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const app = express();
app.use(cors())
const db = require("./app/models");
// const Role = db.role;
db.sequelize.sync();
const Chat = db.chat;

// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user"
//   });
 
//   Role.create({
//     id: 2,
//     name: "transporter"
//   });

//   Role.create({
//     id: 3,
//     name: "driver"
//   });
 
//   Role.create({
//     id: 4,
//     name: "admin"
//   });
// }


var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('images'));
//app.use(express.static('files'));

// simple route
app.get("/home", (req, res) => {
	console.log('home');
  res.json({ message: "Welcome" });
});
// routes
require('./app/routes/auth.routes')(app);
// require('./app/routes/user.routes')(app);
// require('./app/routes/transporter.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;

const http = require('http').Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);

  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    console.log('data', data)

    Chat.create({
      sender_id: data.senderId,
      receiver_id: data.receiverId,
      chat_id: data.chatId,
      message: data.body,
      type: 1,
      status: '0',
      trip_id: data.TripId
    }).then(chat => {
      console.log(chat)
    })


    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} diconnected`);
    socket.leave(roomId);
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
})
