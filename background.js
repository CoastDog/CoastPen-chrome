window.onload = function() {
  var server = new http.Server();
  server.addEventListener('request', function(req) {
    // Serve hihi.
    req.writeHead(200, {
      'Content-Type': 'text/plain',
      'Content-Length': 5});
    req.end('hihi\n');
    var laserExtensionId = 'llkmhohmbogloloockknondominpdlap';
    chrome.runtime.sendMessage(laserExtensionId, {getTargetData: true});
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
