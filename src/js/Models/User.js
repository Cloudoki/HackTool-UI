
define(
	['Models/BaseModel'],
	function (BaseModel)
	{
		var User = BaseModel.extend({

			initialize: function(options) {

				this.once('change', this.activate);			
			},

			Fetch: function() {

				hacktoolSdk.Users.me(function(user){
					$.extend(this.attributes, user);
					this.activate();
					
				}.bind(this))
			},

			url: function() {

				return Application.Api + '/me';
			},

			activate: function() {
				this.trigger('activated');
			},

			isAdmin: function() {

				var admins = Application.config.settings.admins;

				this.admin = _.find(admins, function(user) {
					return user.email == this.get('email')
				}.bind(this))? true: false;
			}
		});

		return User;
	}
);