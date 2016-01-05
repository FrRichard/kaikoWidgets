var request = require('request');
var path = require('path');
var _ = require('underscore');
var Q = require('q');
var heatmapVolume = require(path.join(__dirname,'/aggregatesCalculation/heatmapVolume'));
var apiConf = require(path.join(__dirname,'/config/apiConf'));

function ApiProxy(params) {
	this.app = params.app;
};

ApiProxy.prototype.init = function(callback) {
	this.app.all('/api/trades', function(req, res) {
		var params = JSON.parse(req.query.params);
		var qs = {
			from: params.from,
			to: params.to
		}

		var options = {
			method: 'GET',
			url: 'https://api.kaiko.com/v1/trades/' + params.exchange + '/' + params.pair,
			qs:qs,
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

	this.app.all('/api/tickers', function(req, res) {
		var params = JSON.parse(req.query.params);
		var options = {
			method: 'GET',
			url: 'https://api.kaiko.com/v1/tickers/' + params.exchange + '/' + params.pair,
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

	this.app.all('/api/heatmap', function(req, res) {
		//Request URL:https://api.kaiko.com/v1/charts/coinbase/btcusd/history?symbol=COINBASE&resolution=5&from=1451030400&to=1451274215
		var p = [];
		var qs = {
			from: Math.floor(Date.now()/1000 - 3600), //14400
			to: Math.floor(Date.now()/1000),
			resolution: 5
		}

		_.each(apiConf.defaultPairs, function(pair, exchange) {
			var params = {
				exchange: exchange,
				pair: pair
			}
			p.push(getHistory(params));
		})

		Q.all(p).then(function(result) {
			var result = {
				data: result,
				qs: qs
			};

			res.status('200').send(result);
			console.log();
		});


		function getHistory(params) {
			var deferred = Q.defer();
			var options = {
				method: 'GET',
				url: 'https://api.kaiko.com/v1/charts/' + params.exchange + '/' + params.pair +'/history',
				qs:qs,
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json"
				}
			}

			var callback = function(error, response, body) {
				if(error) {
					console.log('error fetching trades', error);
					res.send(500, 'Something went wrong while fetching trades');
					deferred.reject();
				} else {
					var body = heatmapVolume(body, params.exchange, params.pair);
					deferred.resolve(body);
				}
			}

			request(options, callback);

			return deferred.promise;
		}

	});

	if(callback) {
		callback();
	}


};

module.exports = ApiProxy;