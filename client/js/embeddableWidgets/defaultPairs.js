var defaultPairs = {
	bistamp: 'btcusd',
	coinbase: 'btcusd',
	bitfinex: 'btcusd',
	btcchina: 'btccny',
	huobi: 'btccny'
}

function getDefaultPair(exchange) {
	return defaultPairs[exchange];
}