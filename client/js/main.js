// Filename: main.js

// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
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
		grid: '/client/js/Grid',

		//views
		navbarView: '/client/js/views/navbarView',

		//models


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
	    // "jquery-ui": {
	    // 	deps: ['jquery'],
	    // 	exports: "jquery-ui"
	    // },
	    "gridstack": {
	    	deps: ['jquery','underscore'],
	    	exports: "Gridstack"
	    }
	}

});

require([
  'app', 'jquery', 'backbone', 'lodash'
], function(App){
  // The "app" dependency is passed in as "App"
   // var app = new App();
   App.initialize();
   console.log(App);
});
