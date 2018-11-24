const express = require('express');
const bodyParser = require('body-parser');
// const fs = require('fs-sync'); kacke

// const log4js = require('log4js') au kacke
// const fs = require('fs') ???

 //let ws = new WebSocket("ws://echo.websocket.org", "myProtocol");

let app = express();
const port = process.env.PORT || 3001;

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

      console.log(text);
  
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

app.post('/sound', function(req, res, err){
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

let server =  app.listen(port, function(){
    console.log('Gialaleserver on port: ' + port)
})






  