var socket = io("https://demo-realtime-chat.herokuapp.com/");

socket.on("server-send-failed-register", function(){
  alert("Sai Username (co nguoi da dang ki roi!!!)");
});

socket.on("server-send-list-users", function(data){
  $("#boxContent").html("");
  data.forEach(function(i){
    $("#boxContent").append("<div class='user'>" + i + "</div>");
  });
});

socket.on("server-send-successful-register", function(data){
  $("#currentUser").html(data);
  $("#loginForm").hide(2000);
  $("#chatForm").show(1000);
});

socket.on("server-send-mesage", function(data){
  $("#listMessages").append("<div class='ms'>" + data.un + ":" + data.nd +"</div>");
});

socket.on("typing", function(data){
  $("#thongbao").html("<img width='20px' src='typing05.gif'> " + data);
});

socket.on("STOP-typing", function(){
  $("#thongbao").html("");
});


$(document).ready(function(){
  $("#loginForm").show();
  $("#chatForm").hide();

  $("#txtMessage").focusin(function(){
    socket.emit("I-am-typing");
  })

  $("#txtMessage").focusout(function(){
    socket.emit("I-stop-typing");
  })

  $("#btnRegister").click(function(){
    socket.emit("client-send-Username", $("#txtUsername").val());
  });

  $("#btnLogout").click(function(){
    socket.emit("logout");
    $("#chatForm").hide(2000);
    $("#loginForm").show(1000);
  });

  $("#btnSendMessage").click(function(){
    socket.emit("user-send-message", $("#txtMessage").val());
  });


});
