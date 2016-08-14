define(
    ['Views/BaseView', 'Views/ToolBelt', 'Views/landingScreen', 'Views/DashboardSubNav', 'Views/Calendar', 'Views/DashboardPosts', 'Views/SocialFeed'],
    function (BaseView, ToolBelt, LandingScreen, DashboardSubNav, Calendar, DasboardPosts, SocialFeed) {
        var Dashboard = BaseView.extend({

            error: function (err) {
                console.log(err);
            },

            initialize: function (options) {
                
                
                window.addEventListener('scroll', this.windowScrollHandle, false)
                

            },

            render: function () {
                this.$el.html(Mustache.render(Templates.dashboard, {}));

                this.renderLanding();
                this.renderSubNav();
                this.renderSocialFeed();
                this.renderCalendar();
                this.renderStats();
                this.renderToolBelt();
                this.renderPosts();

                $('#call-menu').click(function(e){
                    e.preventDefault();
                   $('#hidden-menu').toggleClass('active'); 
                });
                
                return this;
            },
            
            renderPosts: function () {
                var posts = new DasboardPosts();
                this.$el.find('section.dashboard_posts').html(posts.render().el);
            },
            
            renderLanding : function (){
                var land = new LandingScreen();
                this.$el.find('section.landing-screen').html(land.render().el);
            },

            renderSubNav: function () {

                var dash = new DashboardSubNav();
                this.$el.find('section.subnav').html(dash.render().el);

            },

            // Render twitter hashtags (add twitter integration)
            renderSocialFeed: function () {

                var feed = new SocialFeed({
                    handle: Application.config.social.twitter_handle
                });
                this.$el.find('section.feed').html(feed.render().el);
            },

            // Render calendar data (from calendar.json)
            renderCalendar: function () {

                var componentName = "calendar";
				var events = '';

                hacktoolSdk.Components.get(componentName, function (data) {
                    // Render data here
                    events = data[componentName];
                }, this.error);

                var calendar = new Calendar();
                this.$el.find('section.calendar').html(calendar.render().el);
				
               var that = this;
               setTimeout(function(){
				   
				   console.log(events)
				   
                    that.$el.find('#calendar-holder').fullCalendar({
                    header: {
                        left: 'prev,next today',
                        center: '',
                        right: 'title'
                    },
                    defaultView: 'month',
                    defaultDate: new Date(),
                    editable: true,
                    
						
                    // RENDER EVENTS FROM THE SDK AS ARRAY OF OBJ
					events: events
                    
                });
               },500)
            
            },

            // Render github organization stats
            renderStats: function () {},

            // Render ToolBelt from toolbelt.json
            renderToolBelt: function () {

                var toolbelt = new ToolBelt();
                this.$el.find('section.toolbelt').html(toolbelt.render().el);
            }
        });

        return Dashboard;
    }
);