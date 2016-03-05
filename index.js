document.addEventListener('DOMContentLoaded', function() {
  var address = 'ws://127.0.0.1:9099';
  var ws = new WebSocket(address);
  ws.addEventListener('open', function() {
    console.log('Connected');
  });
  ws.addEventListener('close', function(e) {
    console.log('Closed');
  });
  ws.addEventListener('message', function(e) {
    console.log(e);
  });
  console.log('onLoad');
  document.getElementById('send').onclick = function() {
    var value = document.getElementById('input_field').value;
    ws.send(JSON.stringify({
      action: 'input',
      payload: value,
    }));
  }
});
