var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var webapp = process.cwd() + '/';
var webapp_server_path = webapp + 'server/';
var webapp_client_path = webapp + 'client/';

var Routes = require(webapp_server_path + '/Routes');
var WidgetRoutes = require(webapp_server_path + '/WidgetRoutes');
var ApiProxy = require(webapp_server_path + '/ApiProxy');


app.use(express.static(__dirname, +'/client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

var params = {
	app: app,
	webapp_server_path: webapp_server_path,
	webapp_client_path: webapp_client_path
}

// init app routes
var Routes = new Routes(params);
Routes.init();
// init widgets routes
var WidgetRoutes = new WidgetRoutes(params);
WidgetRoutes.init();
// init api proxy
var ApiProxy = new ApiProxy(params);
ApiProxy.init();



// app.get('*', function(req, res) {
// 	res.send('404 nop');
// });

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
})
