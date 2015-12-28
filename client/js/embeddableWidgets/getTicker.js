	
function getLastTicker(exchange, pair, callback) {
	var xmlhttp = new XMLHttpRequest();
	var url = 'https://api.kaiko.com/v1/tickers/'+exchange+'/'+pair;

	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var ticker = JSON.parse(xmlhttp.responseText);
			callback(ticker);
		}
	}

	xmlhttp.open('GET', url, true);
	xmlhttp.send();
}
