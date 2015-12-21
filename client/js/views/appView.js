define('appView',[
	'kaikoWebsocket',
	'grid',
	'navbarView',
	'tradeView',
	'tradeModel'
	] , function(KaikoWebsocket, Grid, NavbarView, TradeView, TradeModel ) {	
	var app = Backbone.View.extend({
		initialize: function() {
			//init Grid
			Grid('trading');
				// init navbar
			this.navbarView = new NavbarView();
			this.navbarView.render();

			var tradeView = new TradeView();
		},

		render: function(type) {
			// //update Grid
			// Grid(type);

		}
	});

	return app;

});