define('tradeView',[
	'text!/client/js/views/widgets/tradeView/tradeViewTemplate.html',
	'text!/client/js/views/widgets/tradeView/tradeViewWrapper.html',
	'tradeModel','tradeCollection',
	'parameterManager'
	], function(TradeViewTemplate, TradeViewWrapper, TradeModel, TradeCollection, ParameterManager) {

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
			this.tradeCollection.start();

		},

		preRender: function() {
			this.$el.html(_.template(TradeViewWrapper));
		},

		render: function(newTrades) {
			if($('#kaikowidget_trade_list tr').length <= 10) {
				$('#kaikowidget_trade_list').append(this.template({data:newTrades}));
			} else {
				$('#kaikowidget_trade_list tr')[$('#kaikowidget_trade_list tr').length-1].remove();
								$('#kaikowidget_trade_list').append(this.template({data:newTrades}));

			}
		},

		onChange: function(newTrade) {
			this.newTrades = newTrade.toJSON();
			this.render(this.newTrades);
		},

		exchangeSwitch: function(e) {
			var exchange = e.target.value;
			ParameterManager.setTradesExchange(exchange);
		}

	})

	return trade;
});