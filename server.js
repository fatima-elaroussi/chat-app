const express = require("express");

const app = express();

const server = require("http").createServer(app);

const io = require("socket.io")(server);

const mongoose = require("mongoose");
const message = require("./models/Messeges");

mongoose
  .connect("mongodb://localhost:27017/FIRSTDB")
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("views", "./views");
app.use(express.static("./views"));

app.get("/", (req, res) => {
  res.render("index.html");
});

io.on("connection", (socket) => {
  socket.on("send", (data) => {
    //socket.emit("send", data);
    //io.sockets.emit("send", data);
    socket.broadcast.emit("send", data);
  });
});

server.listen(3000);
