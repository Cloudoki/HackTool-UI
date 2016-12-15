define(
    ['Views/BaseView', 'Views/RepoList', 'Views/landingScreen', 'Views/DashboardSubNav', 'Views/Calendar', 'Views/DashboardPosts', 'Views/SocialFeed', 'moment'],
    function (BaseView, RepoList, LandingScreen, DashboardSubNav, Calendar, DasboardPosts, SocialFeed, moment) {
        var Dashboard = BaseView.extend({

            error: function (err) {
                console.error(err);
            },

            initialize: function (options) {
                //window.addEventListener('scroll', this.windowScrollHandle, false)
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

//                $('#call-menu').click(function(e){
//                    e.preventDefault();
//                   $('#hidden-menu').toggleClass('active');
//                });

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
                        eventMouseover: function (data, event, view) {
                          var tooltip = {
                            "title": data.title,
                            "date": moment(data.start).format('MMMM Do YYYY, h:mm a')
                          };

                          $("body").append(Mustache.render(Templates.tooltip, tooltip));
                          $(this).mouseover(function (e) {
                              $(this).css('z-index', 10000);
                              $('.tooltip_topic_event').fadeIn('500');
                              $('.tooltip_topic_event').fadeTo('10', 1.9);
                          }).mousemove(function (e) {
                              $('.tooltip_topic_event').css('top', e.pageY + 10);
                              $('.tooltip_topic_event').css('left', e.pageX + 20);
                          });
                        },
                        eventMouseout: function (data, event, view) {
                            $(this).css('z-index', 8);
                            $('.tooltip_topic_event').remove();
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
