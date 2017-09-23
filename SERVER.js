var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(process.env.PORT ||3000);

var mangUsers=[];

io.on("connection", function(socket){
  console.log("Connect: " + socket.id);

  socket.on("client-send-Username", function(data){
    if(mangUsers.indexOf(data)>=0){
      socket.emit("server-send-failed-register");
    }else{
      mangUsers.push(data);
      socket.Username = data;
      socket.emit("server-send-successful-register", data);
      io.sockets.emit("server-send-list-users", mangUsers);
    }
  });

  socket.on("logout", function(){
    mangUsers.splice(
      mangUsers.indexOf(socket.Username), 1
    );
    socket.broadcast.emit("server-send-list-users",mangUsers);
  });

  socket.on("user-send-message", function(data){
    io.sockets.emit("server-send-mesage", {un:socket.Username, nd:data} );
  });

  socket.on("I-am-typing", function(){
    var s = socket.Username + " dang go chu";
    io.sockets.emit("typing", s);
  });

  socket.on("I-stop-typing", function(){
    io.sockets.emit("STOP-typing");
  });


});

app.get("/", function(req, res){
  res.render("trangchu");
});
