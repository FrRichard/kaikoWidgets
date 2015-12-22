define('tradeModel', ['kaikoWebsocket', 'apiConf'], function(ws, ApiConf) {
	
	var tradeModel = Backbone.Model.extend({

		initialize: function(params) {
			this.params = params;
			this.url = ApiConf.trades.urlModel + JSON.stringify(params);
		},

		parse: function(response) {
			var self = this
			var trades = response.slice(0,10);
			console.log('traaades', trades);
			var res = [];
			_.each(trades, function(trade) {
				trade.timestamp = parseInt(trade.timestamp);
				var t = {
					exchange: self.params.exchange,
					channel: 'trades',
					data: trade,
				};
				res.push(t);
			});
		
			return res
		}

	});

	return tradeModel;
});


// params = {
// 	excahnge: bitstamp
// 	pair: btcusd
// }