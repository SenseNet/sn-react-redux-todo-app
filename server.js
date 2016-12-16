const http = require('http');
const express = require('express');
const app = express();

var server = http.createServer(app);
server.listen(4000, () => {
  console.log('HTTP server listening on port 4000');
});

app.get('/', function (req, res) {

    res.render('index');

});

let io = require('socket.io')(server);
io.on('connection', (socketServer) => {
  socketServer.on('npmStop', () => {
    process.exit(0);
  });
});