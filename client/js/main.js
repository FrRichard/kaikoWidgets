
require.config({
	paths: {
		//libs
		jquery: '../../bower_components/jquery/dist/jquery.min',
		// "jquery-ui": '../bower_components/jquery-ui/jquery-ui.min',
		lodash: '../../bower_components/lodash/lodash',
		backbone: '../../bower_components/backbone/backbone-min',
		underscore: '../../bower_components/underscore/underscore-min',
		gridstack: '../../libs/gridstack/dist/gridstack',
		d3: '../../bower_components/d3/d3.min',
		text: '../../bower_components/text/text',
		moment: '../../bower_components/momentjs/moment',

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
		heatmapView: '/client/js/views/widgets/heatmapView/heatmapView',
		//charts
		heatmapChart: '/client/js/views/charts/heatmap',

		//models
		tradeModel: '/client/js/model/tradeModel',
		tickerModel: '/client/js/model/tickerModel',
		heatmapModel: '/client/js/model/heatmapModel',

		//collections
		tradeCollection: '/client/js/collections/tradeCollection',
		tickerCollection: '/client/js/collections/tickerCollection',

	},

  	shim: {
	    // "backbone": {
	    // 	deps: ['underscore','jquery'],
	    //     exports: "backbone"
	    // },

	    "underscore": {
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
