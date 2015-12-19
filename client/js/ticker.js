console.log("WEBSOCKET");

var KaikoWebsocket = new WebSocket('wss://markets.kaiko.com:8080/v1');
var Channel = {
  "type": "subscribe",
  "exchanges": [
    // { "name": "bitfinex", "channels": ["ticker", "trades", "orderbook"] }
    { "name": "bitstamp", "channels": ["ticker", "trades", "orderbook"] },
    // { "name": "btcchina", "channels": ["ticker", "trades", "orderbook"] },
    // { "name": "coinbase", "channels": ["ticker", "trades", "orderbook"] },
    // { "name": "huobi", "channels": ["ticker", "trades", "orderbook"] }
  ]
};

KaikoWebsocket.onopen = function(event) {
	console.log("Socket is Open");
	KaikoWebsocket.send(JSON.stringify(Channel));
}

KaikoWebsocket.onmessage = function(event) {
	// console.log(event.data);
	var parsedData = JSON.parse(event.data);
	console.log(parsedData);
	if(parsedData.channel == "trades") {
		displayPrice(parsedData.data);
	}
}


function displayPrice(trade) {
	var price = document.getElementById('price');
	price.innerHTML = trade.price + trade.symbol;
} 

