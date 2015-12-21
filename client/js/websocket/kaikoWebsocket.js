define('kaikoWebsocket', [], function() {

	var wsChannel = function () {
		var self = this;		
		this.KaikoWebsocket = new WebSocket('wss://markets.kaiko.com:8080/v1');
		var Channel = {
		  "type": "subscribe",
		  "exchanges": [
		    { "name": "bitfinex", "channels": ["ticker", "trades", "orderbook"] },
		    { "name": "bitstamp", "channels": ["ticker","trades", "orderbook"] },
		    { "name": "btcchina", "channels": ["ticker", "trades", "orderbook"] },
		    { "name": "coinbase", "channels": ["ticker", "trades", "orderbook"] },
		    { "name": "huobi", "channels": ["ticker", "trades", "orderbook"] }
		  ]
		};

		this.KaikoWebsocket.onopen = function(event) {
			self.KaikoWebsocket.send(JSON.stringify(Channel));
		}

		return this;
	};

	wsChannel.instance = null;
	// wsChannel.

	wsChannel.getInstance = function() {
		if(wsChannel.instance === null) {
			this.instance =  new wsChannel();
			// return wsChannel.instance;
		} 
			// console.log("Already instantiated");
		return wsChannel.instance;
		
	};

	return wsChannel.getInstance();
});