var WebSocketServer = require('ws').Server;

var http = require('http');
var path = require('path')
var http = require('http');
var express = require('express');
var socket_io = require('socket.io');

var app = express();
// Leave uncommented for now
// var bodyParser = require('body-parser');
// app.use(bodyParser.json());


// var drawingRoutes = require('./routes/drawings');
// var drawingServices = require('./services/drawings')

var server = http.Server(app);
var io = socket_io(server);



// app.use(express.static('public'));
app.use(express.static('public'));
app.use('/', function(req,res){
    res.sendFile(path.join(__dirname+'/public/video.html')); 
    //path.join(__dirname+'/public/video.html'))
});

app.use('*', function(req, res) {
    res.status(404).json({ message: 'Not Found' });
});



//app.use('*', );

io.on('connection', function (socket) {
    console.log('Client connected');
    // socket.on('broadcast',function(){
        
    // })
    socket.on('message', function(message) {
        console.log('received: %s', message);
        socket.broadcast.emit('message', message );
        // drawingServices.update(id,point,function(){
        //      console.log('inside callback server'+id);
        //      socket.broadcast.emit('draw',point,id);
        // },function(err){
        //     console.log(err);
        //     return err;
        // });
       
    });
});

server.listen(8080);

// var wss = new WebSocketServer({port: 8080});

// wss.broadcast = function(data) {
//     for(var i in this.clients) {
//         this.clients[i].send(data);
//     }
// };

// wss.on('connection', function(ws) {
//     ws.on('message', function(message) {
//         console.log('received: %s', message);
//         wss.broadcast(message);
//     });
// });