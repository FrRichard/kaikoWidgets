define('tickerView', [
	'text!/client/js/views/widgets/tickerView/tickerViewTemplate.html',
	'text!/client/js/views/widgets/tickerView/tickerViewWrapper.html',
	'parameterManager',
	'tickerModel',
	'tickerCollection',
	'formatUtils'

	], function(TickerViewTemplate, TickerViewWrapper, ParameterManager, TickerModel, TickerCollection, FormatUtils) {

		var tickerView = Backbone.View.extend({

			el:'#ticker',
			template: _.template(TickerViewTemplate),

			events: {
				'change #tickerSwitch': 'exchangeSwitch'
			},

			initialize: function() {
				var self = this;
				this.preRender();
				var params = {
					exchange: ParameterManager.tickers.currentExchange,
					pair: ParameterManager.tickers.currentPair
				};
				this.getLastTicker(params);

				this.tickerCollection = new TickerCollection();
				this.formatUtils = new FormatUtils();
				this.tickerCollection.on('update', this.onUpdate.bind(this));


			},

			preRender: function() {
				this.$el.html(_.template(TickerViewWrapper));
			},

			render: function(newTicker) {
				$('#kaikowidget_ticker_list').html(this.template({data:newTicker}));
			},

			onUpdate: function(newTicker) {
				this.newTicker = newTicker.toJSON();
				console.log(newTicker);
				this.newTicker[0].data['exchange'] = this.newTicker[0].exchange;
				this.newTicker[0].data['vol24'] = this.newTicker[0].data.volume;
				this.newTicker[0].data['item']  = this.newTicker[0].data.symbol.slice(0, 3);
				this.newTicker[0].data['currency']  = this.newTicker[0].data.symbol.slice(3);
				console.log('new ticker', this.newTicker[0].data);

				this.render(this.newTicker[0].data);
			},

			getLastTicker: function(params) {
				var self = this;
				this.tickerModel = new TickerModel(params);
				this.tickerModel.fetch({
					success: function(response,model) {
						self.render(model);
					}
				});
			},

			exchangeSwitch: function(e) {
				var exchange = e.target.value;
				ParameterManager.setTickersExchange(exchange);
				params = {
					exchange: ParameterManager.tickers.currentExchange,
					pair: ParameterManager.tickers.currentPair
				}
				this.getLastTicker(params);
				this.tickerCollection.restart();
			},




		});

		return tickerView;

});