
define(
	['Router', 'config', 'Models/User', 'Views/RootView', 'Session'],
	function (Router, config, User, RootView, Session)
	{
		var Application = {

			version : 1,
			authentication: true,

			init : function ()
			{
				// Load configs
				Application.config = config;
				Application.Api = config.apiurl;
				Application.Organization = config.organizations;
				Application.Team = config.team;
				Application.Repo = config.int_repo;
				Application.Session = Session;

				if (this.authentication) {
					this.authenticate();
					this.loadUserData();
				}
				else
					this.begin();

				return this;
			},

			// Oauth2 Authentication
			authenticate: function() {

				var token = window.localStorage.getItem('token');

				//Check if there is authentication
				if(token && token.length > 9)
				{
					Application.Session.authenticationtoken = token;
					Backbone.accesstoken = token;
					hacktoolSdk.setToken(token);

				} else{ console.log("token error", token); window.location = window.location.pathname+"login.html";}
			},

			// Get User data after authentication;
			// Inits the backbone views & router
			loadUserData: function() {

				this.Session.loadEssentialData (function ()	{

					this.begin();
				}.bind(this));
			},

			// Callbak function after user authentication
			begin: function() {

				$('body').addClass('loaded').removeClass('loading');

				// Root view
				Application.RootView = new RootView();
				Application.RootView.renderNav();

				// Router
				Application.Router = new Router ();

				Backbone.history.start();
			}
		};

		Backbone.ajax = function() {
		    arguments[0].headers = {
		        'Authorization': Application.Session.authenticationtoken,
		    };

		    return Backbone.$.ajax.apply(Backbone.$, arguments);
		};

		return Application;
	}
);
