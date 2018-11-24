const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const io = require('socket.io')();
let multer = require('multer');
let upload = multer({dest: 'sounds/'});

// const fs = require('fs-sync'); kacke

// const log4js = require('log4js') au kacke
// const fs = require('fs') ???

 //let ws = new WebSocket("ws://echo.websocket.org", "myProtocol");

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

let roomString = '';
let soundString = 'exampleSound';
let memo = "memoName"
let soundJSON ={string : soundString, Blob : memo}

function rndString() {
    let text = "";
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 20; i++)
      text += chars.charAt(Math.floor(Math.random() * chars.length));

    return text;
  }

  roomString = rndString()
  let roomJSON = {roomString : roomString};

//   app.use((req, res , next) =>{
    
//     let log = `${roomString}`;

//     console.log(log)
//     fs.appendFile('server.log', log + '\n', (err)=>{
//         if(err){
//             console.log('Unable to append to server.log')
//         }
//     });

//     next();
// });

app.get(`/getRoomCode`, function(req, res, err){
    res.json(roomJSON);

    // if(err){
    //     console.log('Unable to roomcode')
    // }  
})


app.get(`/getRoomCode/${roomString}`, function(req, res, err){
    res.send(`You are in the Gialale Room ${roomString}`)

    // if(err){
    //     console.log('Unable to room');
    // }  
})

app.post('/sound',upload.single('memo'), function(req, res, err){
    // res.send(`Check out this gialaleSound`);
    console.log(req.body)
    res.send(soundJSON);

    

    // if(err){
    //     console.log('Unable to post sound');
    // }  
})

app.post(`/getRoomCode`), function(req,res,err){
    console.log('A Post from Gialale');
    res.send('Post Gialale');

    // if(err){
    //     console.log('Unable to post getRoom')
    // }  
}









  