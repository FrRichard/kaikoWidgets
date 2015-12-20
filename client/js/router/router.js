define('router',[
	'backbone',
	'jquery',
	'lodash',
	'appView'
	] , function(Backbone, $, _, AppView) {

	var Router = Backbone.Router.extend({
		initialize: function() {
			this.appView =	new AppView();	
		},

		routes: {
			'': 'type',
			'*type': 'type',
		},

		type: function(param) {
			// console.log(param);
			switch(param) {
				case 'mining':
					this.mining('mining');
					break;
				case 'blockchain':
					this.blockchain('blockchain');
					break;
				case 'trading':
					this.trading('trading');
					break;
				default:
					this.trading('trading');
			}
		},

		blockchain: function(param) {
			console.log('route to blockchain!');
			this.appView.render(param);
		},

		mining: function(param) {
			console.log('route to mining!');
			this.appView.render(param);
		},

		trading: function(param) {
			console.log('route to trading!');
			this.appView.render(param);
		}
	});
	
	return Router;

});