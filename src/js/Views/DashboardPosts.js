
// THE ADMIN CAN EDIT THIS PAGE

define(
	['Views/BaseView', 'Collections/Posts', 'markdown'],
	function (BaseView, Posts)
	{
		var Calendar = BaseView.extend({

			events: {
				'click .post-title': 'viewPost'
			},
			posts: [],

			initialize: function(options) {

			},

		    render: function(refresh)
		    {
		    	this.$el.html(Mustache.render(Templates.dashboard_posts, {posts: this.posts}));

		    	if (!refresh)
		    		this.getPosts();

		        return this;
		    },

		    getPosts: function() {

		    	hacktoolSdk.Articles.list(function(data){

		    		Application.Session.Posts.set(data.articles);

		    		this.posts = Application.Session.Posts.models.reverse();

						// hide content from the feed unless you are the creator or admin
						for ( var i = 0; i < this.posts.length; i++ ) {
							var canView = this.posts[i].attributes.created_by == Application.Session.User.get('login');
							if(this.posts[i].attributes.hidden && !canView && !Application.Session.isAdmin) {
								this.posts[i].attributes["visible"] = false;
							} else {
								this.posts[i].attributes["visible"] = true;
								this.posts[i].attributes["show-icon"] = this.posts[i].attributes.hidden ? true : false;
							}
							// format text for preview
							var tmp = document.createElement('div');
							tmp.innerHTML = markdown.toHTML(this.posts[i].attributes["intro"]);
							var intro = tmp.textContent || tmp.innerText || "";
							this.posts[i].attributes["intro"] = intro;
						}

		    		this.render(true);

		    	}.bind(this));
		    },

		    viewPost: function(e) {

		    	var filename = $(e.currentTarget).data('filename');
		    	var id = $(e.currentTarget).data('id');

		    	Application.Router.navigate('article/'+id, true);
		    }
		});

		return Calendar;
	}
);
