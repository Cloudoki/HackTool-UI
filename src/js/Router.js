
define(
	['Views/Dashboard', 'Views/TeamPage', 'Views/Article', 'Views/Settings', 'Views/ToolBelt'],
	function (DashboardView, TeamPageView, ArticleView, SettingsPageView, ToolBeltView)
	{
		var Router = Backbone.Router.extend({
			
			routes: {

				'logout': 'logout',
		        'home': 'home',
		        'article(/:id)': 'article',
		        'team': 'team',
		        'settings': 'settings',
		        'toolbelt': 'toolbelt',
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

		    toolbelt: function(){
		    	var view = new ToolBeltView();
		    	Application.RootView.setView(view);
		    },

		    settings: function(){
		    	var view = new SettingsPageView();
		    	Application.RootView.setView(view);
		    },

		    logout: function() {

		    	Application.Session.logout();
		    }
		});

		return Router;
	}
);