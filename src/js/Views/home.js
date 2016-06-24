
define(
	['Views/BaseView'],
	function (BaseView)
	{
		var Home = BaseView.extend({
            
			events: {
				// SET EVENTS
			},

			initialize: function(options) {

				console.log('home');
			},

		    render: function() {	
		    	
		    	this.$el.html( Mustache.render( Templates.home, {} ) );
       
		        return this;
		    },

		    fill: function(type, collection) {

		    	
		    },

		    showError: function() {

		    	this.renderAlert('.error-alert', 'danger', 'oooopppppsssss');
		    }
		});

		return Home;
	}
);