var request = require('request');

function ApiProxy(params) {
	this.app = params.app;
};

ApiProxy.prototype.init = function(callback) {
	this.app.all('/api/trades', function(req, res) {
		console.log("Have you called the trades API ??",req.query);
		var params = JSON.parse(req.query.params);

		var options = {
			method: 'GET',
			url: 'https://api.kaiko.com/v1/trades/' + params.exchange + '/' + params.pair,
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			}
		}

		var callback = function(error, response, body) {
			if(error) {
				console.log('error fetching trades', error);
				res.send(500, 'Something went wrong while fetching trades');
			} else {
				res.status('200').send(body);
			}
		}

		request(options, callback);

	});
	// var self = this;
	// this.app.all('/api/*', function(req, res) {
	// 	// console.log('api proxy : ' + self.apiProxyHost + req.url);
	// 	// console.log('body : ' + JSON.stringify(req.body));
	// 	var options = {
	// 		method: req.method,
	// 		url: self.apiProxyHost + req.url,
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			"Accept": "application/json"
	// 		},
	// 		body: JSON.stringify(req.body)
	// 	};
	// 	var callback = function(error, response, body) {
	// 		if (error) {
	// 			console.log('error', error);
	// 			res.send(500, 'something went wrong')
	// 		} else {
	// 			res.send(response.statusCode, body);
	// 		}
	// 	};
	// 	request(options, callback);
	// });

	// if (callback) {
	// 	callback();
	// }

};

module.exports = ApiProxy;