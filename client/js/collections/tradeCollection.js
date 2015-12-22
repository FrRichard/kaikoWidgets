define('tradeCollection', ['kaikoWebsocket','parameterManager'], function(ws, ParameterManager) {
	var tradeCollection = Backbone.Collection.extend({
		initialize: function() {
			var self = this;
			this.max = 10;
			ws.KaikoWebsocket.addEventListener('message', function(event) {
				var parsedData = JSON.parse(event.data);
				self.filter(parsedData);
			});
		},


		filter: function(parsedData) {
			if(parsedData.channel == "trades" && parsedData.exchange == ParameterManager.trades.currentExchange) {
				if(this.length >= this.max) {
					this.unshift(parsedData);
				} else {
					this.pop();
					this.unshift(parsedData);
				}
			}
		},

		restart: function() {
			var self = this;
			this.reset();			
		}
	});



	return tradeCollection;

});