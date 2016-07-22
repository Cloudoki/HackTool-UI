
define(
	['Views/Dashboard', 'Views/ArticleAdd'],
	function (DashboardView, ArticleAddView)
	{
		var Router = Backbone.Router.extend({
			
			routes: {

				'logout': 'logout',
		        'home': 'home',
		        'article/new': 'articleAdd',
		        '*path': 'home'
		    },

		    home: function(){
		    	var view = new DashboardView();
		    	Application.RootView.setView(view);
		    },

		    articleAdd: function(){
		    	var view = new ArticleAddView();
		    	Application.RootView.setView(view);
		    },


		    logout: function() {

		    	Application.Session.logout();
		    }
		});

		return Router;
	}
);