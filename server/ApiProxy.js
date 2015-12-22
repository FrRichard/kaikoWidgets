var request = require('request');

function ApiProxy(params) {
	this.app = params.app;
};

ApiProxy.prototype.init = function(callback) {
	this.app.all('/api/trades', function(req, res) {
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
};

module.exports = ApiProxy;