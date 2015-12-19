define('router',[
	'backbone',
	'jquery',
	'lodash'
	] , function(Backbone, $, _) {

	var Router = Backbone.Router.extend({
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