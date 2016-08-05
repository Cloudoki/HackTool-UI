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
		    	this.$el.html(Mustache.render(Templates.article_add, {}));
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
		    		title: document.getElementById("title").value,
		    		content: this.mde.value()
		    	};

		    	console.log(article)
		    	// add article
		    	hacktoolSdk.Articles.add(Application.Organization, Application.Repo, article);
		    }
		});

		return ArticleAdd;
	}
);
