// Filename: main.js

// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
	paths: {
		//libs
		jquery: '../bower_components/jquery/dist/jquery.min',
		lodash: '../bower_components/lodash/lodash',
		backbone: '../bower_components/backbone/backbone-min',
		underscore: '../bower_components/underscore/underscore-min',

		// router
		router: '/client/router/router'


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
