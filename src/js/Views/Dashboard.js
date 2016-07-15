
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

		    	this.renderArticles();
		    	this.renderSocialFeed();
		    	this.renderCalendar();
		    	this.renderStats();
		    	this.renderToolBelt();

		    	// Example sdk request
		  		hacktoolSdk.Organizations.Repositories.list(Application.Organization,function(err, data) {
					console.log(err, data);
				});

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
