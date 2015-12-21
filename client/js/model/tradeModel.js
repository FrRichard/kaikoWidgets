define('tradeModel', ['kaikoWebsocket', 'apiConf'], function(ws, ApiConf) {
	
	var tradeModel = Backbone.Model.extend({
		url: ApiConf.trades.urlModel,

		initialize: function() {
			console.log("ApiConf",ApiConf);
		},

	});

	return tradeModel;
});


// {
// 	channel:"trades"
// 	exchange: 'bitstamp'
// 	data: {
// 		amount: "0.01890",
// 		id: "19001901",
// 		price: "496",
// 		symbol: "btcusd",
// 	}
// }