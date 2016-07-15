
// THE ADMIN CAN EDIT THIS PAGE

define(
	['Views/BaseView'],
	function (BaseView)
	{
		var Calendar = BaseView.extend({

			events: {},	

			initialize: function(options) {

			},	

		    render: function()
		    {	
		    	this.$el.html(Mustache.render(Templates.calendar, {}));

		        return this;
		    }
		});

		return Calendar;
	}
);