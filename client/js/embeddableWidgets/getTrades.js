	
function getLasttrades(exchange, pair, max, callback) {
	var xmlhttp = new XMLHttpRequest();
	var url = 'https://api.kaiko.com/v1/trades/'+exchange+'/'+pair;
	var trades;
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var trades = JSON.parse(xmlhttp.responseText).slice(0,10);
			trades = websocketFormat(exchange, pair,trades);
			callback(trades);
		}
	}

	xmlhttp.open('GET', url, true);
	xmlhttp.send();
}

function websocketFormat(exchange, pair, trades) {
	var formattedTrades = [];
	trades.forEach(function(trade) {
		trade.timestamp = parseInt(trade.timestamp);
		var newT = {
			exchange: exchange,
			pair: pair,
			data: trade
		}
		formattedTrades.push(newT);
	})
	return formattedTrades;
}