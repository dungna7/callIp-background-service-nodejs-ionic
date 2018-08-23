const express = require('express'),
http = require('http'),
app = express(),
server = http.createServer(app),
io = require('socket.io').listen(server);
app.get('/', (req, res) => {

res.send('Chat Server is running on port 3000')
});
io.on('connection', (socket) => {

console.log('user connected')
socket.on('join', function(userNickname) {

        console.log(userNickname +" : has joined the chat "  );

 socket.broadcast.emit('userjoinedthechat',userNickname +" : has   joined the chat ");
    })


socket.on('messagedetection', (senderNickname,messageContent) => {
       
       //log the message in console 

       console.log(senderNickname+" : " +messageContent)
       
      //create a message object 
      
      let  message = {"message":messageContent, 
                      "senderNickname":senderNickname}
        
// send the message to all users including the sender  using io.emit  
       
      io.emit('message', message )
     
      })

 socket.on('disconnect', function() {

	console.log(' has left ')

	socket.broadcast.emit( "userdisconnect" ,' user has left')

})
})
var svraddr = '192.168.0.8';
var svrport = 3000;
server.listen(svrport,"192.168.77.39" || "localhost" || '127.0.0.1',()=>{

console.log('Node app is running on port 3000')

})