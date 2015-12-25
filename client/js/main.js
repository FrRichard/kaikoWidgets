
require.config({
	paths: {
		//libs
		jquery: '../../bower_components/jquery/dist/jquery.min',
		// "jquery-ui": '../bower_components/jquery-ui/jquery-ui.min',
		lodash: '../../bower_components/lodash/lodash',
		backbone: '../../bower_components/backbone/backbone-min',
		underscore: '../../bower_components/underscore/underscore-min',
		gridstack: '../../libs/gridstack/dist/gridstack',
		text: '../../bower_components/text/text',

		//conf
		dashboard_conf: '/client/js/config/dashboard_conf',
		apiConf: '/client/js/config/apiConf',

		//helpers
		formatUtils: '/client/js/helpers/formatUtils',

		// router
		router: '/client/js/router/router',

		//dashboard
		grid: '/client/js/grid',

		//websocket
		kaikoWebsocket: '/client/js/websocket/kaikoWebsocket',

		//manager
		parameterManager: '/client/js/manager/parameterManager',

		//views
		appView: '/client/js/views/appView',
		navbarView: '/client/js/views/navbarView',
		//widget views
		tradeView: '/client/js/views/widgets/tradeView/tradeView',
		tickerView: '/client/js/views/widgets/tickerView/tickerView',

		//models
		tradeModel: '/client/js/model/tradeModel',
		tickerModel: '/client/js/model/tickerModel',

		//collections
		tradeCollection: '/client/js/collections/tradeCollection',
		tickerCollection: '/client/js/collections/tickerCollection',

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
