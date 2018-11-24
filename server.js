const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');
const fileUpload = require('express-fileupload');


let app = express();
app.use(fileUpload()); 

const port = process.env.PORT || 3001;
const socketPort = process.env.SOCKETPORT || 3002;

let server =  app.listen(port, function(){
    console.log('Gialaleserver on port: ' + port)
})

let webSocketServer =  app.listen(socketPort, function(){
    console.log('Gialalewebsocketserver on port: ' + socketPort)
})
let io = socketio(webSocketServer);
io.on('connection', function(socket){
    socket.on('joinRoom' , roomString => {
        socket.join(roomString);
        console.log('a gialale has connected = ' + roomString);
    });
    
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser());

function rndString() {
  let text = "";
  let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOQQRSRTUVWXYZ0123456789";

  for (var i = 0; i < 7; i++)
    text += chars.charAt(Math.floor(Math.random() * chars.length));

  return text;
}

app.get(`/getRoomCode`, function(req, res, err){
  let roomString = rndString();
  let roomJSON = {roomString : roomString};

  res.json(roomJSON);
  console.log(roomJSON)
})

app.post('/sound', function(req, res, err){
    const data = {
      room : req.body.room,
      memo : req.files.memo,
      title : req.body.title
    }

    io.to(req.body.room).emit('newSong', data)
})

app.post(`/getRoomCode`), function(req,res,err){
    console.log('A Post from Gialale');
    res.send('Post Gialale');
}









  