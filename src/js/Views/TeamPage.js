
define(
	['Views/BaseView'],
	function (BaseView)
	{
		var TeamPage = BaseView.extend({

			events: {},	

			initialize: function(options) {

			},	

		    render: function()
		    {	
		    	this.$el.html(Mustache.render(Templates.team_page, {}));

		        return this;
		    }
		});

		return TeamPage;
	}
);