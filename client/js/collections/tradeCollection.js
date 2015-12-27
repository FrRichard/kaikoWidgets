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
				// console.log(this.length, this.max, this.length<=this.max);
				if(this.length < this.max) {
					// console.log('add');
					this.unshift(parsedData);
				} else {
					console.log('remove and add');
					this.pop();
					this.unshift(parsedData);
				}
			}
		},

		restart: function() {
			console.log('restart');
			var self = this;
			this.reset();			
		}
	});



	return tradeCollection;

});