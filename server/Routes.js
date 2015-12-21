function ApiRoutes(params) {
	this.app = params.app
}

ApiRoutes.prototype.init = function(callback) {
	var self = this;
	this.app.get('/', function (req, res) {
		res.sendFile(path.join(__dirname, '/client','embbedHereView.html'));
	});

	if(callback) {
		callback();
	}

}

module.exports = ApiRoutes;