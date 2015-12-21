define('tradeCollection', ['kaikoWebsocket','parameterManager'], function(ws, ParameterManager) {
	var tradeCollection = Backbone.Collection.extend({
		initialize: function() {
			this.max = 10;
		},

		start: function() {
			var self = this;
			ws.KaikoWebsocket.addEventListener('message', function(event) {
				var parsedData = JSON.parse(event.data);
				// console.log(parsedData);
				if(parsedData.channel == "trades" && parsedData.exchange == ParameterManager.trades.currentExchange) {
					if(self.length <= this.max) {
						self.unshift(parsedData);
					} else {
						self.pop();
						self.unshift(parsedData);
					}
				}
			});
		}

	});



	return tradeCollection;

});