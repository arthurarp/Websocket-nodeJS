import express from 'express';
import socketio from 'socket.io';
import http from 'http';

const app = express();
const httpServer = http.createServer(app);
const mysocket = new socketio.Server(httpServer);

app.use(express.static('public'));
app.set('views', 'public');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

const messages: any[] = [];

mysocket.on('connection', (socket) => {
  console.log('New Connection: ' + socket.id);

  socket.emit('previousMessages', messages);
  var ip = socket.handshake.address;
  console.log(ip);
  socket.on('sendMessage', (data) => {
    console.log('data: ' + data);
    data['id'] = socket.id;
    data['ip'] = ip;
    messages.push(data);
    socket.broadcast.emit('receivedMessage', data);
  });

  socket.on("disconnect", (reason) => {
    console.log("Disconnected: " + reason);
  });
});


httpServer.listen(3333);