define('appView',[
	'kaikoWebsocket',
	'grid',
	'navbarView',
	] , function(KaikoWebsocket, Grid, NavbarView ) {	
	var app = Backbone.View.extend({
		initialize: function() {
			// init navbar
			var navbarView = new NavbarView();
			navbarView.render();
			//init websocket
			KaikoWebsocket();
		},

		render: function(type) {
			//init Grid
			Grid(type);

		}
	});

	return app;

});