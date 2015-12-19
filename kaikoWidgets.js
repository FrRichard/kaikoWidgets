var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(__dirname, +'/client'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/client','embbedHereView.html'));
});

app.get('/tickerview', function(req, res) {
	res.sendFile(path.join(__dirname, '/client/views/widgets/tickerView.html'));
}); 

// app.get('*', function(req, res) {
// 	res.send('404 nop');
// });

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
})