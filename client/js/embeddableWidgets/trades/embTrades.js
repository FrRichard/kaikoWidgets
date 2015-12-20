
var kaikoWebsocket = wsChannel();
var tableStructure = '';
var max = 10;
var lastTrades = [];
var currentExchange = ['huobi'];
var selectedExchange = {
	get current () {
		if(currentExchange.length == 0) return undefined;
		return currentExchange[0];
	}
}

// get the last 10trades
getLasttrades('bitstamp','btcusd', max, 
	function(trades) { 
		lastTrades = trades; 
		updateDOM(trades);
	});

kaikoWebsocket.addEventListener('message', function(event) {
	var exchange = selectedExchange.current;
	var parsedData = JSON.parse(event.data);
	if(parsedData.channel == 'trades' && parsedData.exchange == exchange) {
		if(lastTrades.length >= max) {
			lastTrades.pop(parsedData);
		} 
		console.log(parsedData.exchange);
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
		document.getElementById('kaikowidget_trade_amount'+i).innerHTML = trade.data.amount;
		document.getElementById('kaikowidget_trade_price'+i).innerHTML = trade.data.price;
		document.getElementById('kaikowidget_trade_date'+i).innerHTML = tradeDate;
		if(trade.data.sell) {
			document.getElementById('kaikowidget_trade_buysell'+i).className = 'fa fa-caret-down';
		} else {
			document.getElementById('kaikowidget_trade_buysell'+i).className = 'fa fa-caret-up';
		}
	})
}

function formatDate(timestamp) {
	if(!timestamp) {
		var date = new Date();
	} else {
		var date = new Date(timestamp);
	}
	var hours = date.getHours();
	var minutes = "0" + date.getMinutes();
	var seconds = "0" + date.getSeconds();

	formattedDate = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
	return formattedDate;
}

function getExchangename(exchange) {
	this.exchange = exchange;
	return this.exchange;
}

function exchangeSwitch() {
	var exchange = document.getElementById('exchangeSwitch').value;
	currentExchange[0] = exchange;
	//clean former exchange trades
	cleanDOM(lastTrades);
	lastTrades = [];
}

function cleanDOM(trades) {
	trades.forEach(function(trade,i) {
		document.getElementById('kaikowidget_trade_amount'+i).innerHTML = "";
		document.getElementById('kaikowidget_trade_price'+i).innerHTML = "";
		document.getElementById('kaikowidget_trade_date'+i).innerHTML = "";
		document.getElementById('kaikowidget_trade_buysell'+i).className = "";
	})
}