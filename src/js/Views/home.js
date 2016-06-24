
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

		    	this.auth = new Login();

		    	console.log(this.auth);

		    	//this.auth.endpoint = code;

		    	this.auth.save(data, {
		    		success: console.log("yayy!!!!"),

		    		error: console.log("boooo")
		    	});
		    },

		    showError: function() {

		    	this.renderAlert('.error-alert', 'danger', 'oooopppppsssss');
		    }
		});



		return Home;
	}
);
