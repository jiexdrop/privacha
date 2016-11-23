var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//Heroku port or locat in order to do tests
var PORT = process.env.PORT || 8080;

app.get('/', function(req, res){
  res.sendfile('index.html');
});

http.listen(PORT, function(){
  console.log('listening on *:'+PORT);
});


io.sockets.on('connection', function (socket, pseudo) {
    // When connected to server what the client will recive
    socket.emit('message', 'Vous êtes bien connecté !');

    //Send to all when new connection
    socket.broadcast.emit('message', ' ');

    // if psuedo sent then set the psuedo
    socket.on('messagePsuedo', function(pseudo) {
        socket.pseudo = pseudo;
    });

    socket.on('message', function (message) {
        // On message who said the message and the message is broadcasted to all
        socket.broadcast.emit('message', socket.pseudo + ' dit: ' + message);
    });
});
