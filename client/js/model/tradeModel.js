define('tradeModel', ['kaikoWebsocket', 'apiConf'], function(ws, ApiConf) {
	
	var tradeModel = Backbone.Model.extend({

		initialize: function(params) {
			this.params = params;
			this.url = ApiConf.trades.urlModel + JSON.stringify(params);
		},

		parse: function(response) {
			var self = this
			var trades = response.slice(0,10);
			var res = [];
			_.each(trades, function(trade) {
				var t = {
					exchange: self.params.exchange,
					channel: 'trades',
					data: trade,
				};
				res.push(t);
			});
			console.log("reeeees", res);
			return res
		}

	});

	return tradeModel;
});


// params = {
// 	excahnge: bitstamp
// 	pair: btcusd
// }