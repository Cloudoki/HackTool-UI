
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
		    	//this.$el.html(Mustache.render(Templates.dashboard, {}));

                this.renderSubNav();
		    	this.renderArticles();
		    	this.renderSocialFeed();
		    	this.renderCalendar();
		    	this.renderStats();
		    	this.renderToolBelt();

		        return this;
		    },

            renderSubNav:function(){
                
                this.$el.html(Mustache.render(Templates.dashboard_sub_nav, {}))
            },
            
		    // Render article list (from the articles folder)
		    renderArticles: function() {

		    },

		    // Render twitter hashtags (add twitter integration)
		    renderSocialFeed: function() {

		    },

		    // Render calendar data (from calendar.json)
		    renderCalendar: function() {

		    	var componentName = "calendar";

		    	hacktoolSdk.Components.get(componentName, function(data) {
		    		// Render data here
					console.log(data[componentName]);
				}, this.error);
		    },

		    // Render github organization stats
		    renderStats: function() {

		    },

		    // Render ToolBelt from toolbelt.json
		    renderToolBelt: function() {

		    	var componentName = "toolbelt";

		    	hacktoolSdk.Components.get(componentName, function(data) {
		    		// Render data here
					console.log(data[componentName]);
				}, this.error);
		    },
		});

		return Dashboard;
	}
);
