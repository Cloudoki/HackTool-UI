
// THE ADMIN CAN EDIT THIS PAGE

define(
	['Views/BaseView'],
	function (BaseView)
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

		    		this.posts = data.articles;
		    		this.render(true);
		    		
		    	}.bind(this));
		    	// hacktoolSdk.Articles.read("k7y_1469808711483.json", function(data){console.log(data)})
		    },

		    viewPost: function(e) {

		    	var filename = $(e.currentTarget).data('filename');

		    	console.log(title);

		    	Application.Router.navigate('article/'+title, true)
		    }
		});

		return Calendar;
	}
);