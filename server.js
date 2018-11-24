const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const io = require('socket.io')();
let multer = require('multer');
const storage =  multer.diskStorage(
  {
      destination: './sounds/',
      filename: function ( req, file, cb ) {
          socket.to(req.body.room).emit('newSong', file)
          cb( null, file.originalname+ '-' + Date.now()+".webm",);
      }
  }
);

const upload = multer( { storage: storage } );

let app = express();
const port = process.env.PORT || 3001;
const socketPort = process.env.SOCKETPORT || 3002;

let server =  app.listen(port, function(){
    console.log('Gialaleserver on port: ' + port)
})

let webSocketServer =  app.listen(socketPort, function(){
    console.log('Gialalewebsocketserver on port: ' + socketPort)
})
io.attach(webSocketServer);
io.on('connection', function(socket){
    socket.on('joinRoom' , roomString => {
        socket.join(roomString);
    });

    console.log('a gialale has connected');
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser());

function rndString() {
    let text = "";
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 20; i++)
      text += chars.charAt(Math.floor(Math.random() * chars.length));

    return text;
  }

  roomString = rndString()
  let roomJSON = {roomString : roomString};


app.get(`/getRoomCode`, function(req, res, err){
    res.json(roomJSON);
})


app.get(`/:${roomString}`, function(req, res, err){
    res.send(`You are in the Gialale Room ${roomString}`) 
})

app.post('/sound',upload.single('memo'), function(req, res, err){
    console.log(req.body)
})

app.post(`/getRoomCode`), function(req,res,err){
    console.log('A Post from Gialale');
    res.send('Post Gialale');
}









  