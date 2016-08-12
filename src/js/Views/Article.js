
// THE ADMIN CAN EDIT THIS PAGE

define(
	['Views/BaseView', 'Models/Post', 'markdown', 'simplemde', 'chosen'],
	function (BaseView, Post, md, SimpleMDE)
	{
		var Article = BaseView.extend({

			events: {
				'click [data-action=edit]': 'editMode',
				'click .submit': 'submit'
			},
			id: 'article',

			initialize: function(options) {

				$.extend(this, options);

				if (this.articleId)
					this.readyPost();
			},

			// If we are viewing an existing post, ready and fetch it
			readyPost: function() {

				this.post = Application.Session.Posts.get(this.articleId);

				if (!this.post)
					this.post = new Post({id: this.articleId});
			},

		    render: function(refresh)
		    {
		    	this.$el.html(Mustache.render(Templates.article, {
		    		post: this.post? this.post.attributes: null,
		    		canEdit: this.canEdit(),
		    		categories: Application.config.content.categories
		    	}));

		    	// If we are viewing a post and still don't have it in storage, get it
		    	if (this.post) {

		    		if (!this.post.attributes.content && !refresh)
		    			this.getFile();

		    		if (refresh)
		    			this.$el.find('.article-content').html(markdown.toHTML(this.post.attributes.content));
		    	}
		    	
		    	// If we are not viewing a post, enter edit/create mode
		    	else
		    		this.editMode();

		        return this;
		    },

		    canEdit: function() {

		    	if (!this.post)						return false;
		    	if (Application.Session.isAdmin)	return true;
		    	
		    	if (this.post.attributes.created_by == Application.Session.User.get('login'))
		    		return true;
		    },

		    // Get a file from Git
		    getFile: function() {

		    	if (!this.post.attributes.filename)
		    		hacktoolSdk.Articles.get(this.post.id, function(data){
		    			
		    			$.extend(this.post.attributes, data);
		    			Application.Session.Posts.add(this.post);

		    			this.render(true);

		    		}.bind(this));

		    	else
					hacktoolSdk.Articles.read(this.post.attributes.filename, function(data){
		    			
		    			$.extend(this.post.attributes, data);
		    			
		    			this.render(true);

		    		}.bind(this));
		    },

		    // Enter edit/create mode
		    editMode: function(e) {

		    	this.mde = null;

		    	this.$el.find('.article-wrapper').addClass('editing');
		    	this.$el.find('.chosen-select').val(this.post? this.post.attributes.category: null);
		    	this.$el.find('.chosen-select').chosen({width: "100%", disable_search_threshold: 10});

		    	// Temporary hack to initialize the editor
		    	setTimeout(function(){
		    		this.mde = new SimpleMDE({element: document.getElementById("mdeditor")})

		    		if (e) 
		    			this.mde.value(this.post.attributes.content)

		    	}.bind(this), 100);
		    },

		    submit: function() {

		    	// Read simplemde content and title
		    	var article = {
		    		title: this.$el.find("#title").val(),
		    		content: this.mde.value(),
		    		category: this.$el.find('.category').val()
		    	};

		    	// add article
		    	hacktoolSdk.Articles.add(article);
		    }
		});

		return Article;
	}
);
