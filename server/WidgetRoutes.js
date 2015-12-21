var path = require('path');


function ApiWidgetRoutes(params) {
	this.app = params.app;
}

ApiWidgetRoutes.prototype.init = function(callback) {
	var self = this;
	this.app.get('/trades', function(req, res) {
		// console.log(path.join(this.webapp_client_path, '../client/js/embeddableWidgets/trades/embTrades.html'));
		res.sendFile(path.join(__dirname, '../client/js/embeddableWidgets/trades/embTrades.html'));
	}); 

	if(callback) {
		callback();
	}

}

module.exports = ApiWidgetRoutes;