define(
    ['Views/BaseView', 'Views/RepoList', 'Views/landingScreen', 'Views/DashboardSubNav', 'Views/Calendar', 'Views/DashboardPosts', 'Views/SocialFeed'],
    function (BaseView, RepoList, LandingScreen, DashboardSubNav, Calendar, DasboardPosts, SocialFeed) {
        var Dashboard = BaseView.extend({

            error: function (err) {
                console.error(err);
            },

            initialize: function (options) {
                window.addEventListener('scroll', this.windowScrollHandle, false);
            },

            render: function () {
                this.$el.html(Mustache.render(Templates.dashboard, {}));
                this.renderLanding();
                this.renderSubNav();
                this.renderSocialFeed();
                this.renderStats();
                this.renderRepoList();
                this.renderPosts();
                this.renderCalendar();
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
            renderCalendar: function (callback) {

                var calendar = new Calendar();
                var componentName = "calendar";
                var self = this;

                this.$el.find('section.calendar').html(calendar.render().el);

                hacktoolSdk.Components.get(componentName, function (data) {
                    // Render data here
                    self.$el.find('#calendar-holder').fullCalendar({
                        header: {
                            left: 'prev,next today',
                            center: '',
                            right: 'title'
                        },
                        defaultView: 'month',
                        defaultDate: new Date(),
                        editable: true,

                        // RENDER EVENTS FROM THE SDK AS ARRAY OF OBJ
                        events: data[componentName]
                    });
                }, this.error);
            },

            // Render github organization stats
            renderStats: function () {
            },

            // Render ToolBelt from toolbelt.json
            renderRepoList: function () {

                var repolist = new RepoList();
                this.$el.find('section.toolbelt').html(repolist.render().el);
            }
        });

        return Dashboard;
    }
);
