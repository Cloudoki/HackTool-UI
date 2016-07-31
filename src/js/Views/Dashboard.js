define(
    ['Views/BaseView', 'Views/ToolBelt', 'Views/DashboardSubNav', 'Views/Calendar', 'Views/DashboardPosts'],
    function (BaseView, ToolBelt, DashboardSubNav, Calendar, DasboardPosts)
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

                this.renderSubNav();
                this.renderSocialFeed();
                this.renderCalendar();
                this.renderStats();
                this.renderToolBelt();
                this.renderPosts();

                return this;
            },

            renderPosts : function(){
              var posts = new DasboardPosts();
               this.$el.find('section.dashboard_posts').html(posts.render().el);
            },

           renderSubNav:function(){

               var dash = new DashboardSubNav();
               this.$el.find('section.subnav').html(dash.render().el);

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

               var calendar = new Calendar();
               this.$el.find('section.calendar').html(calendar.render().el);
		    },

		    // Render github organization stats
		    renderStats: function() {
		    },

		    // Render ToolBelt from toolbelt.json
		    renderToolBelt: function() {

          var toolbelt = new ToolBelt();
          this.$el.find('section.toolbelt').html(toolbelt.render().el);          
		    },
		});

		return Dashboard;
	}
);
