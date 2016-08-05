
// THE ADMIN CAN EDIT THIS PAGE

define(
	['Views/BaseView', 'Models/Post', 'markdown'],
	function (BaseView, Post)
	{
		var Article = BaseView.extend({

			events: {},
			id: 'article',

			initialize: function(options) {

				$.extend(this, options);

				this.post = Application.Session.Posts.get(this.articleId);

				if (!this.post)
					this.post = new Post({id: this.articleId});
			},

		    render: function(refresh)
		    {
		    	this.$el.html(Mustache.render(Templates.article, {post: this.post.attributes}));

		    	if (!this.post.attributes.content && !refresh)
		    		this.getFile();

		    	if (refresh)
		    		this.$el.find('.article-content').html(markdown.toHTML(this.post.attributes.content));

		        return this;
		    },

		    getFile: function() {

		    	if (!this.post.attributes.filename)
		    		hacktoolSdk.Articles.get(Application.Organization, Application.Repo, this.post.id, function(data){
		    			$.extend(this.post.attributes, data);
		    			Application.Session.Posts.add(this.post);

		    			this.render(true);
		    		}.bind(this));

		    	else
					hacktoolSdk.Articles.read(Application.Organization, Application.Repo, this.post.attributes.filename, function(data){
		    			$.extend(this.post.attributes, data);

		    			this.render(true);
		    		}.bind(this));
		    }
		});

		return Article;
	}
);
