define(
	['Views/BaseView', 'simplemde'],
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
		    	// Temporary hack to initialize the editor
		    	setTimeout(function(){
		    		this.mde = new SimpleMDE({element: document.getElementById("mdeditor")})
		    	}.bind(this), 100);

		        return this;
		    },
		    submit: function() {
		    	// Read simplemde content and title
		    	var article = JSON.stringify({"title": document.getElementById("title").value, "content": this.mde.value()});

		    	// add article
		    	hacktoolSdk.Articles.add(btoa(article));
		    }
		});

		return ArticleAdd;
	}
);
