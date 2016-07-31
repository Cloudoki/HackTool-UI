
define(
	['Views/Dashboard', 'Views/ArticleAdd', 'Views/TeamPage', 'Views/Article'],
	function (DashboardView, ArticleAddView, TeamPageView, ArticleView)
	{
		var Router = Backbone.Router.extend({
			
			routes: {

				'logout': 'logout',
		        'home': 'home',
		        'article/:id': 'article',
		        'newarticle': 'articleAdd',
		        'team': 'team',
		        '*path': 'home'
		    },

		    home: function(){
		    	var view = new DashboardView();
		    	Application.RootView.setView(view);
		    },

		    article: function(id){
		    	var view = new ArticleView({articleId: id});
		    	Application.RootView.setView(view);
		    },

		    articleAdd: function(){
		    	var view = new ArticleAddView();
		    	Application.RootView.setView(view);
		    },

		    team: function(){
		    	var view = new TeamPageView();
		    	Application.RootView.setView(view);
		    },

		    logout: function() {

		    	Application.Session.logout();
		    }
		});

		return Router;
	}
);