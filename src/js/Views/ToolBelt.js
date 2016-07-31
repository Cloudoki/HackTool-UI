
// THE ADMIN CAN EDIT THIS PAGE

define(
	['Views/BaseView'],
	function (BaseView)
	{
		var ToolBelt = BaseView.extend({

			events: {},	

			initialize: function(options) {

			},	

		    render: function(refresh)
		    {	
		    	this.$el.html(Mustache.render(Templates.tool_belt, {items: this.toolBelt}));

		    	if (!refresh)
		    		this.getData();

		        return this;
		    },

		    getData: function() {

		    	hacktoolSdk.Components.get("toolbelt", function(data) {
		    		this.toolBelt = data.toolbelt;
		    		this.render(true);
				}.bind(this), this.error);
		    }
		});

		return ToolBelt;
	}
);