define('apiConf', [], function() {
	var apiConf = {
		trades: {
			urlModel: '/api/trades/?params='
		},

		tickers: {
			urlModel: '/api/tickers/?params='
		},

		heatmap: {
			urlModel: '/api/heatmap/'
		}
	}




	return apiConf;
});