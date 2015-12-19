define(['router'], function(Router) {
	var app = function(){};

	app.prototype.initialize = function() {
		console.log("App has been initialized");
		var initRouter = new Router;
		Backbone.history.start();
	}


	return new app();

});