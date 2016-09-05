define(
	['Views/BaseView'],
	function (BaseView)
	{
		var ToolBelt = BaseView.extend({

			events: {
				'click .post-title': 'viewPost'
			},	

			initialize: function(options) {
				
			},

		    render: function(refresh)
		    {	
		    	this.$el.html(Mustache.render(Templates.tool_belt, {posts: this.posts}));

		    	if (!refresh)
		    		this.getPosts();

		        return this;
		    },

		    getPosts: function() {

		    	hacktoolSdk.Articles.listCategory('Tool Belt', function(data){

		    		Application.Session.Posts.set(data);

		    		this.posts = Application.Session.Posts.models;
		    		this.render(true);

		    	}.bind(this));
		    },

		    viewPost: function(e) {

		    	var filename = $(e.currentTarget).data('filename');
		    	var id = $(e.currentTarget).data('id');

		    	Application.Router.navigate('article/'+id, true);
		    }
		});

		return ToolBelt;
	}
);