define('tradeModel', [], function() {
	
	var tradeModel = Backbone.Model.extend({
		initialize: function() {

		},

		defaults :  {
			channel:"trades",
			exchange: 'bitstamp',
			data: {
				amount: "1",
				id: "1",
				price: "1",
				symbol: "btcusd",
			}
		}

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