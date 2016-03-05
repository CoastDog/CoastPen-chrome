var laserExtensionId = 'oahfegphkjbgdacfibhkldkikjmfjmdm';

window.onload = function() {
  var server = new http.Server();
  var wsServer = new http.WebSocketServer(server);
  server.addEventListener('request', function(req) {
    // Serve hihi.
    req.writeHead(200, {
      'Content-Type': 'text/plain',
      'Content-Length': 5});
    req.end('hihi\n');
    chrome.runtime.sendMessage(laserExtensionId, {getTargetData: true});
    return true;
  });
  var connectedSockets = [];
  wsServer.addEventListener('request', function(req) {
    console.log("connect");
    var socket = req.accept();
    connectedSockets.push(socket);
    socket.addEventListener('message', function(e) {
      console.log("on message")
      console.log(e);
      for (var i = 0; i < connectedSockets.length; i++)
        connectedSockets[i].send('pong');
    });
    socket.addEventListener('close', function() {
      console.log('Client disconnected');
      for (var i = 0; i < connectedSockets.length; i++) {
        if (connectedSockets[i] == socket) {
          connectedSockets.splice(i, 1);
          break;
        }
      }
    });
    return true;
  });
  server.listen(9099);
};

chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    innerBounds: {
      width: 800,
      height: 600,
      minWidth: 200,
      minHeight: 200,
    }
  });
});
