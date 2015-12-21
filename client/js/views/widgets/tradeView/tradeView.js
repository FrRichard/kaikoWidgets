define('tradeView',[
	'text!/client/js/views/widgets/tradeView/tradeViewTemplate.html',
	'text!/client/js/views/widgets/tradeView/tradeViewWrapper.html',
	'tradeModel','tradeCollection'
	], function(TradeViewTemplate, TradeViewWrapper, TradeModel, TradeCollection) {

	var trade = Backbone.View.extend({
		el:'#trades',
		template: _.template(TradeViewTemplate),

		events: {
			'click #exchangeSwitch':'exchangeSwitch'
		},

		initialize: function() {
			var self = this;
			this.preRender();
			// this.tradeModel = new TradeModel();
			// this.tradeModel.on('change', this.onChange.bind(this));
			this.tradeCollection = new TradeCollection();
			this.tradeCollection.on('update', this.onChange.bind(this));

		},

		preRender: function() {
			this.$el.html(_.template(TradeViewWrapper));
		},

		render: function(newTrades) {
			$('#kaikowidget_trade_table thead').append(this.template({data:newTrades}));
		},

		onChange: function(newTrade) {
			this.newTrades = newTrade.toJSON();
			this.render(this.newTrades);
		},

		exchangeSwitch: function() {
			console.log('SWITCH!');
		}

	})

	return trade;
});