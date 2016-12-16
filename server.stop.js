var io = require('socket.io-client');
var socketClient = io.connect('http://localhost:4000');

socketClient.on('connect', () => {
  socketClient.emit('npmStop');
  setTimeout(() => {
    process.exit(0);
  }, 1000);
});