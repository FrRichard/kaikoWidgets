var kaikoWebsocket = wsChannel(); 
var currentExchange = ['coinbase'];
var selectedExchange = {
	get current () {
		if(currentExchange.length == 0) return undefined;
		return currentExchange[0];
	}
};

// get the last 10trades
getLastTicker(selectedExchange.current , getDefaultPair(selectedExchange.current), updateLastTicker);

function updateLastTicker(ticker) {
	var ticker = formatTicker(ticker);
	updateDOM(ticker);
}

kaikoWebsocket.addEventListener('message', function(event) {
	var exchange = selectedExchange.current;
	var parsedData = JSON.parse(event.data);
	if(parsedData.channel == 'ticker' && parsedData.exchange == exchange) {
		var ticker = formatWSTicker(parsedData.data);
		updateDOM(ticker);
	}
});

function updateDOM(ticker) {
	document.getElementById('ticker_last').innerHTML = ticker.last;
	document.getElementById('ticker_high').innerHTML = 'High: ' + ticker.high;
	document.getElementById('ticker_low').innerHTML = 'Low: ' + ticker.low;
	document.getElementById('ticker_volume').innerHTML = 'Volume: ' + ticker.vol24 + ' ' + ticker.item;
}

function exchangeSwitch() {
	var exchange = document.getElementById('tickerSwitch').value;
	cleanDOM();
	currentExchange[0] = exchange;
	getLastTicker(selectedExchange.current , getDefaultPair(selectedExchange.current), updateLastTicker);
}

function cleanDOM() {
	document.getElementById('ticker_last').innerHTML = "";
	document.getElementById('ticker_high').innerHTML = "";
	document.getElementById('ticker_low').innerHTML = "";
	document.getElementById('ticker_volume').innerHTML = "";
}

function formatTicker(ticker) {
	var ticker = formatPair(ticker);
	ticker.vol24 = formatPrice(ticker.vol24); 

	return ticker;
}

function formatWSTicker(ticker) {
	ticker['vol24'] = ticker.volume;
	ticker = formatPair(ticker);
	ticker.vol24 = formatPrice(ticker.vol24);
	return ticker
}
