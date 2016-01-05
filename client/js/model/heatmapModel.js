define('heatmapModel',
	['apiConf'], function(ApiConf) {
		var heatmapModel = Backbone.Model.extend({
			initialize: function(params) {
				this.params = params;
				this.url = ApiConf.heatmap.urlModel + JSON.stringify(params);
			}


		});

		return heatmapModel;
})