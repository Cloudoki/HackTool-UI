
define(
	['Views/Dashboard', 'Views/TeamPage', 'Views/Article'],
	function (DashboardView, TeamPageView, ArticleView)
	{
		var Router = Backbone.Router.extend({
			
			routes: {

				'logout': 'logout',
		        'home': 'home',
		        'article(/:id)': 'article',
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