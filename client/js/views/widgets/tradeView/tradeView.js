define('tradeView',[
	'text!/client/js/views/widgets/tradeView/tradeViewTemplate.html',
	'tradeModel'
	], function(TradeViewTemplate, TradeModel) {

	var trade = Backbone.View.extend({
		el:$('#trades'),
		template: _.template(TradeViewTemplate),
		initialize: function() {
			var self = this;
			this.tradeModel = new TradeModel();
			this.tradeModel.on('change', this.onChange.bind(this));
		},

		render: function(newTrade) {
			$('#trades').html(this.template(newTrade));
		},

		onChange: function(newTrade) {
			this.newTrade = newTrade.toJSON();
			console.log(this.newTrade);
			this.render(this.newTrade);
		}

	})

	return trade;
});