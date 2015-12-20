define('navbarView',['text!/client/js/views/templates/navbarTemplate.html','kaikoWebsocket'], function(navbarTemplate,KaikoWebsocket) {
	var navbar = Backbone.View.extend({
		el: $('#navbar'),

		initialize: function() {
		},

		render:  function() {
			var template = _.template( navbarTemplate);
			this.$el.append(template);
			this.setClickEvent();
		},

		setClickEvent: function() {

			$('#navbar a').click(function(e) {
				$('#navbar a').removeClass('selectedNavbar');
				$(e.target).toggleClass('selectedNavbar');
			});
		}

	});

	return navbar;
});