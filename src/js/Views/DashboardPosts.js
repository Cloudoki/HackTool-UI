
// THE ADMIN CAN EDIT THIS PAGE

define(
	['Views/BaseView', 'Collections/Posts'],
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
