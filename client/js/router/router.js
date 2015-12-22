define('router',['appView'] , function(AppView) {

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
			this.appView.render(param);
		},

		mining: function(param) {
			this.appView.render(param);
		},

		trading: function(param) {
			this.appView.render(param);
		}
	});
	
	return Router;

});