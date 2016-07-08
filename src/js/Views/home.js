
define(
	['Views/BaseView', 'Models/Login'],
	function (BaseView, Login)
	{
		var Home = BaseView.extend({

			events: {
				"click #login": "loginRequest"
			},

			initialize: function(options) {

				var location = window.location.href;

				if (location.indexOf("code") > 1)  this.getCode(location);
			},

		    render: function() {

		    	this.$el.html( Mustache.render( Templates.home, {} ) );

		        return this;
		    },

		    fill: function(type, collection) {


		    },

		    loginRequest: function() {
		    	window.location.href = "https://www.github.com/login/oauth/authorize?client_id=55d515edbc303bfeaabe&scope=read:org"
		    },

		    getCode: function(location) {

		    	var code = location.substr(location.indexOf("=") + 1);
		    	var data = {"code":code}
		    	this.model = new Login();

		    	this.model.save(data, {
		    		success: this.storeToken.bind(this),
		    		error: function() {
                        console.log('BOOOOOO! ');
                    }
		    	});
		    },

            storeToken : function() {
            	var token = this.model.attributes.access_token;
            	hacktoolSdk.config(token)
            	console.log('token', token)
                localStorage.setItem('token', token)


				/*hacktoolSdk.Organizations.list(function(err, data) {
					console.log('2', err, data);
				});*/

				hacktoolSdk.Organizations.Repositories.list("Cloudoki", function(err, data) {
					//console.log(err, data);
				});
            },

		    showError: function() {

		    	this.renderAlert('.error-alert', 'danger', 'oooopppppsssss');
		    }
		});



		return Home;
	}
);
