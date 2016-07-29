
define(
	['Views/Dashboard', 'Views/ArticleAdd', 'Views/TeamPage'],
	function (DashboardView, ArticleAddView, TeamPageView)
	{
		var Router = Backbone.Router.extend({
			
			routes: {

				'logout': 'logout',
		        'home': 'home',
		        'article/new': 'articleAdd',
		        'team': 'team',
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