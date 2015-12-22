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
				height: 7,
				col: 3,
				row: 0
			},

			trades: {
				id: 'trades',
				width: 3,
				height:3,
				col: 0,
				row: 0
			},

			other: {
				id: 'other',
				width: 3,
				height:4,
				col: 0,
				row: 3
			},

			other2: {
				id: 'other',
				width: 4,
				height:2,
				col: 9,
				row: 0
			},
			other3: {
				id: 'other',
				width: 4,
				height: 3,
				col: 9,
				row: 2
			},

		},

		mining: {
			stats: {
				id: 'mining_stats',
				width: 6,
				height: 7,
				col: 0,
				row: 0,
			},
			other:{
				id: 'blockchain_stats',
				width: 5,
				height: 3,
				col: 6,
				row: 0
			},
			other1:{
				id: 'blockchain_stats',
				width: 5,
				height: 2,
				col: 6,
				row: 3
			},
			other2:{
				id: 'blockchain_stats',
				width: 5,
				height: 2,
				col: 6,
				row: 6
			}
		},

		blockchain : {
			stats:{
				id: 'blockchain_stats',
				width: 3,
				height: 3,
				col: 0,
				row: 0
			},
			other:{
				id: 'blockchain_stats',
				width: 3,
				height: 3,
				col: 3,
				row: 0
			},
			other1:{
				id: 'blockchain_stats',
				width: 3,
				height: 3,
				col: 6,
				row: 0
			},
			other2:{
				id: 'blockchain_stats',
				width: 3,
				height: 3,
				col: 9,
				row: 0
			},
			other3:{
				id: 'blockchain_stats',
				width: 3,
				height: 3,
				col: 0,
				row: 3
			},
			other4:{
				id: 'blockchain_stats',
				width: 3,
				height: 3,
				col: 3,
				row: 3
			},
			other5:{
				id: 'blockchain_stats',
				width: 3,
				height: 3,
				col: 6,
				row: 3
			},
			other6:{
				id: 'blockchain_stats',
				width: 3,
				height: 3,
				col: 9,
				row: 3
			}
		}

	}




	return conf;
})