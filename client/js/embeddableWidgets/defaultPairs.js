var defaultPairs = {
	bitstamp: 'btcusd',
	coinbase: 'btcusd',
	bitfinex: 'btcusd',
	btcchina: 'btccny',
	huobi: 'btccny'
}

function getDefaultPair(exchange) {
	return defaultPairs[exchange];
}