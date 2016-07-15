
define(
	['Views/BaseView'],
	function (BaseView)
	{
		var Dashboard = BaseView.extend({

			events: {},

			initialize: function(options) {

			},

		    render: function()
		    {
		    	this.$el.html(Mustache.render(Templates.dashboard, {}));

		    	hacktoolSdk.Organizations.Repositories.list(function(err, data) {
					console.log(err, data);
				});

		        return this;
		    }
		});

		return Dashboard;
	}
);
