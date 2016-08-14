
define(
	['Models/User', 'Collections/Posts'],
	function (User, Posts)
	{
		var Session = {
			
			version : 1,
			isAdmin: false,

			loadEssentialData : function (callback)
			{	
				this.User = new User();
				this.Posts = new Posts();

				this.User.once("activated", function () {	

					this.isAdmin = this.User.admin;

					callback();
				}.bind(this));
				
				this.User.Fetch({error: this.authError.bind(this)});
			},

			// Error on API, for example
			authError: function() {
				// this.logout();
			},

			logout: function() {

				this.authenticationtoken = null;
				localStorage.removeItem('token');

				var r = /[^\/]*$/;
				var path = window.location.href.replace(r, '');
				window.location = path;
			}
		};


		return Session;
	}
);