define(
	['Views/BaseView'],
	function (BaseView)
	{
		var LandingScreen = BaseView.extend({

			events: {},	

			initialize: function(options) {

			},	

		    render: function()
		    {	
		    	this.$el.html(Mustache.render(Templates.project_landing_screen, {}));

		        return this;
		    }
		});

		return LandingScreen;
	}
);