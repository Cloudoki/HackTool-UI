define(
	['Views/BaseView', 'simplemde'],
	function (BaseView, SimpleMDE)
	{
		var ArticleAdd = BaseView.extend({

			events: {},	

			initialize: function(options) {

			},	

		    render: function()
		    {	
		    	this.$el.html(Mustache.render(Templates.article_add, {}));

		    	// Temporary hack to initialize the editor
		    	setTimeout(function(){
		    		var mde = new SimpleMDE({element: document.getElementById("mdeditor")})	
		    	}, 100);		    	

		        return this;
		    }
		});

		return ArticleAdd;
	}
);