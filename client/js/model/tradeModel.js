define('tradeModel', ['kaikoWebsocket', 'apiConf'], function(ws, ApiConf) {
	
	var tradeModel = Backbone.Model.extend({

		initialize: function(params) {

			this.url = ApiConf.trades.urlModel + JSON.stringify(params);
		},

	});

	return tradeModel;
});


// params = {
// 	excahnge: bitstamp
// 	pair: btcusd
// }