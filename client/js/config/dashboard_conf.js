define('dashboard_conf', [], function() {
	var conf = {
		trading: {
			ticker: {
				id: 'ticker',
				width:4,
				height:2,
				col:9,
				row:0,
			},

			orderbook: {
				id: 'orderbook',
				width: 5,
				height: 2,
				col: 3,
				row: 0
			},

			trades: {
				id: 'trades',
				width: 3,
				height:2,
				col: 0,
				row: 0
			}

		},

		mining: {
			stats: {
				id: 'mining_stats',
				width: 6,
				height: 4,
				col: 0,
				row: 0,
			}
		},

		blockchain : {
			stats:{
				id: 'blockchain_stats',
				width: 2,
				height: 8,
				col: 4,
				row: 0
			}
		}

	}




	return conf;
})