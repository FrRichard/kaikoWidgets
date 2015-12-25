define('parameterManager', [], function() {
	var parameterManager = function parameterManager() {

	};

	parameterManager.instance = null;

	parameterManager.prototype.trades = {
		//default
		currentExchange : 'btcchina',
		currentPair : 'btccny'
	}

	parameterManager.prototype.tickers = {
		currentExchange: 'btcchina',
		currentPair: 'btccny'
		// currentExchange: 'bitstamp',
		// currentPair: 'btcusd'
	}


	parameterManager.prototype.defaultPairs = {
		bitstamp: 'btcusd',
		coinbase: 'btcusd',
		bitfinex: 'btcusd',
		btcchina: 'btccny',
		huobi: 'btccny'
	}

	parameterManager.prototype.getDefaultPair = function getDefaultPair(exchange) {
		return this.defaultPairs[exchange];
	}

	parameterManager.prototype.setTradesExchange = function(exchange) {
		this.trades = {
			currentExchange: exchange,
			currentPair: this.defaultPairs[exchange]
		}
	}


	parameterManager.getInstance = function () {
		if(this.instance === null) {
			this.instance = new parameterManager();
		}
		return this.instance;
	}


	return parameterManager.getInstance();

});