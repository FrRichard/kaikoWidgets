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
			'change #tradeSwitch':'exchangeSwitch',
			'click  #embedtrades': 'showTradesEmbed',
			'focusout #embedtrades': 'hideTradesEmbed'
		},

		initialize: function() {
			this.tradeCollection = new TradeCollection();
			this.formatUtils = new FormatUtils();
			this.preRender();
			var params = {
				exchange: ParameterManager.trades.currentExchange,
				pair: ParameterManager.trades.currentPair
			}

			this.getLastTrades(params);

			this.tradeCollection.on('update', this.onUpdate.bind(this));
		},

		getLastTrades: function(params) {
			var self = this;
			this.tradeModel = new TradeModel(params);
			this.tradeModel.fetch({
				success: function(response, model) {
					var model = self.tradeModel.parse(model);
					this.newTrades = self.formatTrade(model);
					self.tradeCollection.add(model);
				}
			});
		},

		preRender: function() {
			this.$el.html(_.template(TradeViewWrapper));
		},

		render: function(newTrades) {
			$('#kaikowidget_trade_list').html(this.template({data:newTrades}));
		},

		onUpdate: function(newTrade) {
			this.newTrades = newTrade.toJSON();
			this.newTrades = this.formatTrade(this.newTrades);
			this.render(this.newTrades);
		},

		cleanView: function() {
			$('#kaikowidget_trade_list').html('');
		},

		formatTrade: function(newTrades) {
			var self = this;
			_.each(newTrades, function(trade) {
				trade.data.amount = self.formatUtils.formatPrice(trade.data.amount);
				trade.data.price = self.formatUtils.formatPrice(trade.data.price);
				trade.data.date = self.formatUtils.formatDate(trade.data.timestamp);
				if(trade.data.sell) {
					trade.data.arrow = "fa fa-caret-down";
					trade.data.type = 'down';
				} else {
					trade.data.arrow = "fa fa-caret-up";
					trade.data.type = "up";
				}
			});
			return newTrades;
		},

		exchangeSwitch: function(e) {
			var exchange = e.target.value;
			ParameterManager.setTradesExchange(exchange);
			this.cleanView();
			params = {
				exchange: ParameterManager.trades.currentExchange,
				pair: ParameterManager.trades.currentPair
			}
			this.getLastTrades(params);
			this.tradeCollection.restart();
		},

		showTradesEmbed: function() {
			$('#embedtrades').html('<textarea id=embedtradestext></textarea>');
			$('#embedtradestext').text('<iframe src="http://kaikowidgets.herokuapp.com/trades" style="border:none; height:200px; min-height:200px; width:285px; overflow-y:hidden"></iframe>')
			$('#embedtradestext').focus();
		},

		hideTradesEmbed: function() {
			$('#embedtrades').text(' Embed this widget to your page ! ');
		},

		isJson: function(str) {
		    try {
		        JSON.parse(str);
		    } catch (e) {
		        return false;
		    }
		    return true;
		}


	})

	return trade;
});