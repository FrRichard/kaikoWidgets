var path = require('path');


function ApiWidgetRoutes(params) {
	this.app = params.app;
}

ApiWidgetRoutes.prototype.init = function(callback) {
	var self = this;
	this.app.get('/trades', function(req, res) {
		res.sendFile(path.join(__dirname, '../client/js/embeddableWidgets/trades/embTrades.html'));
	});

	this.app.get('/ticker', function(req, res) {
		res.sendFile(path.join(__dirname, '../client/js/embeddableWidgets/ticker/embTicker.html'));
	});

	if(callback) {
		callback();
	}

}

module.exports = ApiWidgetRoutes;