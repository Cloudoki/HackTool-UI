define(
	['backbone'],
	function(Backbone)
	{
		var User = Backbone.Model.extend({

            initialize: function(options) { },
            
			url: function() {
                var url = "http://127.0.0.1:3000/login";
                return url;
            }
		});

		return User;
	}
)
