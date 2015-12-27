define('tickerModel', ['kaikoWebsocket', 'apiConf'], function(ws, ApiConf) {
	
	var tickerModel = Backbone.Model.extend({

		initialize: function(params) {
			this.params = params;
			this.url = ApiConf.tickers.urlModel + JSON.stringify(params);
		},

		parse: function(response) {
			var self = this

			var res = [];
		
			return res
		}

	});

	return tickerModel;
});


// params = {
// 	excahnge: bitstamp
// 	pair: btcusd
// }