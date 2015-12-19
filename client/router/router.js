define('router',[
	'backbone',
	'jquery',
	'lodash',
	'Grid',
	'navbarView'
	] , function(Backbone, $, _, Grid, NavbarView) {

	var Router = Backbone.Router.extend({
		initialize: function() {
			console.log('router initialize Grid', Grid());
			// init navbar
			var navbarView = new NavbarView();
			navbarView.render();
		},

		routes: {
			'': 'type',
			'*type': 'type',
		},

		type: function(param) {
			// console.log(param);
			switch(param) {
				case "mining":
					this.mining();
					break;
				case "blockchain":
					this.blockchain();
					break;
				case "trading":
					this.trading();
					break;
				default:
					this.trading();
			}
		},

		blockchain: function() {
			console.log('route to blockchain!');
		},

		mining: function() {
			console.log('route to mining!');
		},

		trading: function() {
			console.log('route to trading!');
		}
	});
	
	return Router;

});