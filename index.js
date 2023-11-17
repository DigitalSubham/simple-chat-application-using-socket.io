const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve("./public")));

//socket.io

io.on("connection", (socket) => {
  //   console.log("user is connected", socket.id);
  socket.on("user-message", (message) => {
    // console.log("new message got from user", message);
    io.emit("message", message);
  });
});

app.get("/", (req, res) => {
  return res.sendFile("./public/index.html");
});

server.listen(3000, () => {
  console.log("server started at port 3000");
});
