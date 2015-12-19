define('navbarView',['text!/client/js/views/templates/navbarTemplate.html'], function(navbarTemplate) {
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
				console.log("this has been clicked",e.target);
				$('#navbar a').removeClass('selectedNavbar');
				$(e.target).toggleClass('selectedNavbar');
			});
		}

	});

	return navbar;
});