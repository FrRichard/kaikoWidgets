define('parameterManager', [], function() {
	var parameterManager = function parameterManager() {

	};

	parameterManager.instance = null;

	parameterManager.prototype.trades = {
		//default
		currentExchange : 'coinbase',
		currentPair : 'btcusd'
	}

	parameterManager.prototype.tickers = {
		currentExchange: 'coinbase',
		currentPair: 'btcusd'
	}

	parameterManager.prototype.exchangeKeys = ['btc-e', 'btcchina', 'bitfinex', 'bitstamp', 'coinbase', 'kraken', 'okcoin' ];


	parameterManager.prototype.defaultPairs = {
		bitstamp: 'btcusd',
		coinbase: 'btcusd',
		bitfinex: 'btcusd',
		btcchina: 'btccny',
		huobi: 'btccny',
		"btc-e": 'btcusd',
		kraken: 'btcusd',
		okcoin: 'btccny'
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

	parameterManager.prototype.setTickersExchange = function(exchange) {
		this.tickers = {
			currentExchange: exchange,
			currentPair: this.defaultPairs[exchange]
		}
	},


	parameterManager.getInstance = function () {
		if(this.instance === null) {
			this.instance = new parameterManager();
		}
		return this.instance;
	}


	return parameterManager.getInstance();

});