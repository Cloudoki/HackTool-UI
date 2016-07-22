
// THE ADMIN CAN EDIT THIS PAGE

define(
	['Views/BaseView'],
	function (BaseView)
	{
		var ToolBelt = BaseView.extend({

			events: {},	

			initialize: function(options) {

			},	

		    render: function(){	
                
		    	this.$el.html(Mustache.render(Templates.dashboard_sub_nav, {}))

		        return this;
		    }
		});

		return ToolBelt;
	}
);