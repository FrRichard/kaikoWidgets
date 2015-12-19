define('dashboard_conf', [], function() {
	var conf = {
		trading: {
			ticker: {
				id: 'ticker',
				width:4,
				height:2,
				col:0,
				row:0,
			},

			orderbook: {
				id: 'orderbook',
				width: 4,
				height: 2,
				col: 4,
				row: 0
			},

			trades: {
				id: 'trades',
				width: 4,
				col: 9,
				row: 0
			}

		},

		mining: {

		},

		blockchain : {

		}

	}




	return conf;
})