var wsChannel = function () {
		var KaikoWebsocket = new WebSocket('wss://markets.kaiko.com:8080/v1');
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

		KaikoWebsocket.onopen = function(event) {
			KaikoWebsocket.send(JSON.stringify(Channel));
		}

		return KaikoWebsocket;
};
