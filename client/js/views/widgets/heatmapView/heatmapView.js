define('heatmapView', [
	'heatmapModel',
	'parameterManager',
	'formatUtils',
	'heatmapChart'
	
	], function(HeatmapModel, ParameterManager, formatUtils, HeatmapChart) {

		var heatmapView = Backbone.View.extend({

			el: '#heatmap',

			events: {},

			initialize: function() {
				var self = this;
				this.getData();
				setInterval(self.getData.bind(this), 60000);
				this.heatmapChart = new HeatmapChart();
				this.heatmapChart.init(this.el);
			},


			render: function(data) {
				// this.$el.html(this.template());
				this.heatmapChart.update(data);
			},

			getData: function(params) {
				var self = this;
				this.heatmapModel = new HeatmapModel();
				this.heatmapModel.fetch({
					success: function(response, data) {
						self.render(data);
						console.log(data);
					}
				});
			}

		})

		return heatmapView;
});