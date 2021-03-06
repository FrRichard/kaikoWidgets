
var kaikoWebsocket = wsChannel();
var tableStructure = '';
var max = 10;
var lastTrades = [];
var currentExchange = ['coinbase'];
var selectedExchange = {
	get current () {
		if(currentExchange.length == 0) return undefined;
		return currentExchange[0];
	}
}

function updateLastTrades(trades) {
	updateDOM(trades);
}

// get the last 10trades
getLastTrades(currentExchange[0], getDefaultPair(currentExchange[0]), max, updateLastTrades);

kaikoWebsocket.addEventListener('message', function(event) {
	var exchange = selectedExchange.current;
	var parsedData = JSON.parse(event.data);
	if(parsedData.channel == 'trades' && parsedData.exchange == exchange) {
		if(lastTrades.length >= max) {
			lastTrades.pop(parsedData);
		} 
		lastTrades.unshift(parsedData);
		updateDOM(lastTrades);
	}
});

(function setDOM() {
	for(i=0; i<max; i++) {
		tableStructure += '<tr><td class=kaikowidget_trade_amount id=kaikowidget_trade_amount'+i+'> </td><td class=kaikowidget_trade_price id=kaikowidget_trade_price'+i+'>' + 
		'</td><td class=kaikowidget_trade_date id=kaikowidget_trade_date'+i+'> </td> <td class=kaikowidget_trade_buysell> <i id=kaikowidget_trade_buysell'+i+'> </i> </td> </tr>';
	}
	document.getElementById('kaikowidget_trade_list').innerHTML = tableStructure;
})();

function updateDOM(trades) {
	trades.forEach(function(trade, i) {
		var tradeDate = formatDate(trade.data.timestamp);
		var tradeAmount = formatPrice(trade.data.amount);
		var tradePrice = formatPrice(trade.data.price);
		document.getElementById('kaikowidget_trade_amount'+i).innerHTML = tradeAmount;
		document.getElementById('kaikowidget_trade_price'+i).innerHTML = tradePrice;
		document.getElementById('kaikowidget_trade_date'+i).innerHTML = tradeDate;
		if(trade.data.sell) {
			document.getElementById('kaikowidget_trade_buysell'+i).className = 'fa fa-caret-down';
			document.getElementById('kaikowidget_trade_price'+i).className = 'down';
		} else {
			document.getElementById('kaikowidget_trade_buysell'+i).className = 'fa fa-caret-up';
			document.getElementById('kaikowidget_trade_price'+i).className = 'up';

		}
	})
}

function getExchangename(exchange) {
	this.exchange = exchange;
	return this.exchange;
}

function exchangeSwitch() {
	var exchange = document.getElementById('tradeSwitch').value;
	currentExchange[0] = exchange;
	//clean former exchange trades
	cleanDOM(lastTrades);
	lastTrades = [];
	getLasttrades(currentExchange[0], getDefaultPair(currentExchange[0]), max, updateLastTrades);
}

function cleanDOM(trades) {
	trades.forEach(function(trade,i) {
		document.getElementById('kaikowidget_trade_amount'+i).innerHTML = "";
		document.getElementById('kaikowidget_trade_price'+i).innerHTML = "";
		document.getElementById('kaikowidget_trade_date'+i).innerHTML = "";
		document.getElementById('kaikowidget_trade_buysell'+i).className = "";
	})
}