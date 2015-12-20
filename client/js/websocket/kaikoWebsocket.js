define('kaikoWebsocket', [
	'tradeModel',


	], function(TradeModel) {

	var wsChannel = function () {
		var self = this;
		// init Model
		this.tradeModel = new TradeModel();
		this.KaikoWebsocket = new WebSocket('wss://markets.kaiko.com:8080/v1');
		var Channel = {
		  "type": "subscribe",
		  "exchanges": [
		    // { "name": "bitfinex", "channels": ["ticker", "trades", "orderbook"] }
		    { "name": "bitstamp", "channels": ["ticker","trades", "orderbook"] },
		    // { "name": "btcchina", "channels": ["ticker", "trades", "orderbook"] },
		    // { "name": "coinbase", "channels": ["ticker", "trades", "orderbook"] },
		    // { "name": "huobi", "channels": ["ticker", "trades", "orderbook"] }
		  ]
		};

		this.KaikoWebsocket.onopen = function(event) {
			console.log("kaikoWebsocket is Open");
			self.KaikoWebsocket.send(JSON.stringify(Channel));
		}

		this.KaikoWebsocket.onmessage = function(event) {
			// console.log(event.data);
			var parsedData = JSON.parse(event.data);
			console.log(parsedData);
			if(parsedData.channel == "trades") {
				self.tradeModel.set(parsedData);
				// displayPrice(parsedData.data);
			}
		}


		function displayPrice(trade) {
			// var price = document.getElementById('price');
			// price.innerHTML = trade.price + trade.symbol;
		} 

		return this;
	};

	wsChannel.instance = null;
	// wsChannel.

	wsChannel.getInstance = function() {
		if(wsChannel.instance === null) {
			console.log("kaikoWebsocket is instantiated");
			wsChannel.instance =  new wsChannel();
			return wsChannel.instance;
		} else {
			// console.log("Already instantiated");
			return wsChannel.instance;
		}
	};

	return wsChannel.getInstance;
});