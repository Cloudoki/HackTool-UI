define(['Views/home', 'Views/LoginView'],function (Home, Login){
		var Router = Backbone.Router.extend({

			routes: {

		        'home': 'home',
		        'login': 'login',
		        '*path': 'home'
		    },

		    home: function(){
		    	var view = new Home();
		    	Hacktool.RootView.setView(view);
		    },


		    login: function(){

		    	var view = new Login();
		    	Hacktool.RootView.setView(view);
		    }

		});

		return Router;
	}
);