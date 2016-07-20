
define(
	['Views/BaseView'],
	function (BaseView)
	{
		var Dashboard = BaseView.extend({

			events: {},

			error: function(err) {
				console.log(err);
			},

			initialize: function(options) {

			},

		    render: function()
		    {
		    	this.$el.html(Mustache.render(Templates.dashboard, {}));

		    	this.renderArticles();
		    	this.renderSocialFeed();
		    	this.renderCalendar();
		    	this.renderStats();
		    	this.renderToolBelt();

		    	var componentName = 'toolbelt';

		    	// Example sdk request for a component data file (JSON)
		  		hacktoolSdk.Components.get(componentName, function(data) {
					console.log(data[componentName]);
				}, this.error
				);

				// hacktoolSdk.Users.me(function(data) {
				// 	console.log(data);
				// },this.error
				// );

		        return this;
		    },

		    // Render article list (from the articles folder)
		    renderArticles: function() {

		    },

		    // Render twitter hashtags (add twitter integration)
		    renderSocialFeed: function() {

		    },

		    // Render calendar data (from calendar.json)
		    renderCalendar: function() {

		    },

		    // Render github organization stats
		    renderStats: function() {

		    },

		    // Render ToolBelt from toolbelt.json
		    renderToolBelt: function() {

		    },
		});

		return Dashboard;
	}
);
