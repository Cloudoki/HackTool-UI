
define(
	['Views/BaseView', 'Models/Login'],
	function (BaseView, Login)
	{
		var Home = BaseView.extend({

			events: {
				"click #login": "loginRequest"
			},

			initialize: function(options) {

				console.log('home');

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
		    	window.location.href = "https://www.github.com/login/oauth/authorize?client_id=55d515edbc303bfeaabe"
		    },

		    getCode: function(location) {
                
		    	var code = location.substr(location.indexOf("=") + 1);
		    	var data = {"code":code}
		    	this.model = new Login();

		    	//this.auth.endpoint = code;

		    	this.model.save(data, {
		    		success: this.storeToken.bind(this),
		    		error: function() {
                        console.log('BOOOOOO! ');
                    }
		    	});
		    },

            storeToken : function() {
                
                localStorage.setItem('token', this.model.attributes.access_token)
            },
            
		    showError: function() {

		    	this.renderAlert('.error-alert', 'danger', 'oooopppppsssss');
		    }
		});



		return Home;
	}
);
