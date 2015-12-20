
require.config({
	paths: {
		//conf
		dashboard_conf: '../../client/js/config/dashboard_conf',

		//libs
		jquery: '../../bower_components/jquery/dist/jquery.min',
		// "jquery-ui": '../bower_components/jquery-ui/jquery-ui.min',
		lodash: '../../bower_components/lodash/lodash',
		backbone: '../../bower_components/backbone/backbone-min',
		underscore: '../../bower_components/underscore/underscore-min',
		gridstack: '../../libs/gridstack/dist/gridstack',
		text: '../../bower_components/text/text',

		// router
		router: '/client/js/router/router',

		//dashboard
		grid: '/client/js/grid',

		//websocket
		kaikoWebsocket: '/client/js/websocket/kaikoWebsocket',

		//views
		appView: '/client/js/views/appView',
		navbarView: '/client/js/views/navbarView',
		//widget views
		tradeView: '/client/js/views/widgets/tradeView/tradeView',

		//models
		tradeModel: '/client/js/model/tradeModel',


		//collections


	},

  	shim: {
	    "backbone": {
	    	deps: ['underscore','jquery'],
	        exports: "Backbone"
	    },

	    "lodash": {
	        exports: "_"
	    },
	    "jquery": {
	    	exports: "$"
	    },
	    "gridstack": {
	    	deps: ['jquery','underscore'],
	    	exports: "Gridstack"
	    }
	}

});

require([
  'jquery', 'backbone', 'lodash', 'router', 
], function( $, Backbone, _, Router){
   	new Router();
	Backbone.history.start();
});
