define('tradeModel', ['kaikoWebsocket', 'tradeCollection'], function(ws) {
	
	var tradeModel = Backbone.Model.extend({
		initialize: function() {
			var self = this;
			// console.log(KaikoWebsocket().KaikoWebsocket.onmessage);
			ws.KaikoWebsocket.addEventListener('message', function(event) {
				var parsedData = JSON.parse(event.data);
				// console.log(parsedData);
				if(parsedData.channel == "trades") {
					self.set(parsedData);
					// console.log(parsedData);
				}
			});
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