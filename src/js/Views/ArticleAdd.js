define(
	['Views/BaseView', 'simplemde', 'chosen'],
	function (BaseView, SimpleMDE)
	{
		var ArticleAdd = BaseView.extend({

			events: {
				'click .submit': 'submit'
			},

			initialize: function(options) {

			},

		    render: function()
		    {
		    	this.$el.html(Mustache.render(Templates.article_add, {categories: Application.config.content.categories}));
		    	this.mde = null;

		    	this.$el.find('.chosen-select').chosen({width: "100%", disable_search_threshold: 10});

		    	// Temporary hack to initialize the editor
		    	setTimeout(function(){
		    		this.mde = new SimpleMDE({element: document.getElementById("mdeditor")})
		    	}.bind(this), 100);

		        return this;
		    },
		    submit: function() {
		    	// Read simplemde content and title
		    	var article = {
		    		title: this.$el.find("#title").val(),
		    		content: this.mde.value(),
		    		category: this.$el.find('.category').val()
		    	};

		    	console.log(article)
		    	// add article
		    	hacktoolSdk.Articles.add(article);
		    }
		});

		return ArticleAdd;
	}
);
