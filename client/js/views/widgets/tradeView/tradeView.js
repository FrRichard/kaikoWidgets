define('tradeView',[
	'text!/client/js/views/widgets/tradeView/tradeViewTemplate.html',
	'text!/client/js/views/widgets/tradeView/tradeViewWrapper.html',
	'tradeModel','tradeCollection',
	'parameterManager',
	'formatUtils'
	], function(TradeViewTemplate, TradeViewWrapper, TradeModel, TradeCollection, ParameterManager, FormatUtils) {

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
			this.tradeCollection.on('update', this.onUpdate.bind(this));
			this.formatUtils = new FormatUtils();
		},

		preRender: function() {
			this.$el.html(_.template(TradeViewWrapper));
		},

		render: function(newTrades) {
			if($('#kaikowidget_trade_list tr').length <= 10) {
				$('#kaikowidget_trade_list').prepend(this.template({data:newTrades}));
			} else {
				$('#kaikowidget_trade_list tr')[$('#kaikowidget_trade_list tr').length-1].remove();
								$('#kaikowidget_trade_list').prepend(this.template({data:newTrades}));

			}
		},

		onUpdate: function(newTrade) {
			this.newTrades = newTrade.toJSON();
			this.newTrades = this.formatTrade(this.newTrades);
			this.render(this.newTrades);
		},

		cleanView: function() {
			console.log("cleanView");
			$('#kaikowidget_trade_list').html('');
		},

		formatTrade: function(newTrades) {
			var self = this;
			_.each(newTrades, function(trade) {
				trade.data.amount = self.formatUtils.formatPrice(trade.data.amount);
				trade.data.price = self.formatUtils.formatPrice(trade.data.price);
				trade.data.date = self.formatUtils.formatDate(trade.data.timestamp);
			});
			// console.log(newTrades);
			return newTrades;
		},

		exchangeSwitch: function(e) {
			var exchange = e.target.value;
			ParameterManager.setTradesExchange(exchange);
			this.cleanView();
			this.tradeCollection.restart();
		}

	})

	return trade;
});