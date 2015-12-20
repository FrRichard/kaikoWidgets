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
			//init websocket
			KaikoWebsocket();
			// init navbar
			this.navbarView = new NavbarView();

			var tradeView = new TradeView();

		},

		render: function(type) {
			//init Grid
			this.navbarView.render();
			Grid(type);

		}
	});

	return app;

});