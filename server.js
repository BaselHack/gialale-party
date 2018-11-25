const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');
const fileUpload = require('express-fileupload');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyB2Fy0irdVm4Mm_HBJZTX3QObEF1C9g4uc');
const ytdl = require('ytdl-core');



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
    const memo_id = req.body.room + req.body.title + rndString();
    fs.writeFile('./music/' + memo_id, req.files.memo + '.webm');
    youtube.searchVideos(data.searchTerm, 1)
    .then(result => {
        console.log(`The video's title is ${result[0].title}`);
        data.title = result[0].title;
        data.id = result[0].id;
        data.video = result[0].raw;
        data.memo_id = memo_id;
        console.log(result[0])

        ytdl('http://www.youtube.com/watch?v=' +data.id).pipe(fs.createWriteStream('music/'+data.id + '.mp4', {quality: 'lowest', format: 'mp3'}));

        const soundTrack = fs.readFile('./music/' +data.id + '.mp4',(err,response) => {
          data.file = response;
          io.to(data.room).emit('newSong', data);
        });

      })
    .catch(console.log);
})

app.post(`/getRoomCode`), function(req,res,err){
    console.log('A Post from Gialale');
    res.send('Post Gialale');
}

app.get('/music/:track_id',(req,res) => {
  res.sendFile(__dirname + '/music/' + req.params.track_id + '.mp4');
})

app.get('/music/:memo_id', (req,res) => {
  res.sendFile(__dirname + '/music/' +req.params.memo_id + '.webm');
})
