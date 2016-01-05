define('appView',[
	'kaikoWebsocket',
	'grid',
	'navbarView',
	'tradeView',
	'tradeModel',
	'tickerView',
	'tickerModel',
	'heatmapView',
	] , function(KaikoWebsocket, Grid, NavbarView, TradeView, TradeModel, TickerView, TickerModel, HeatmapView) {	
	var app = Backbone.View.extend({
		initialize: function() {
			//init Grid
			Grid('trading');
				// init navbar
			this.navbarView = new NavbarView();
			this.navbarView.render();

		},

		render: function(type) {
			// //update Grid
			Grid(type);
			if(type == 'trading')  {
				var tradeView = new TradeView();
				var tickerView = new TickerView();
				var heatmapView = new HeatmapView();
			}

		}
	});

	return app;

});