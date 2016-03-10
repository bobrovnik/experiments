var express = require('express');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use("/client", express.static(__dirname + '/client'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('draw', function(msg){
        socket.broadcast.emit('draw', msg);
    });

    socket.on('clear', function(msg){
        socket.broadcast.emit('clear', msg);
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});