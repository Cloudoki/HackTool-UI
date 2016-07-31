
// THE ADMIN CAN EDIT THIS PAGE

define(
	['Views/BaseView'],
	function (BaseView)
	{
		var ToolBelt = BaseView.extend({

			events: {
				'click [data-action=edit]': 'edit',
				'click [data-action=remove]': 'removeRepo'
			},	

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

		    	hacktoolSdk.Components.get("toolbelt", function(data, sha) {
		    		this.toolBelt = data.toolbelt;
		    		this.sha = sha;
		    		this.render(true);
				}.bind(this), this.error);
		    },

		    edit: function() {

		    	this.$el.find('.tabbed-widget').addClass('edit');
		    },

		    removeRepo: function(e) {

		    	var $item = $(e.currentTarget).closest('.display');
		    	var url = $item.data('uri');

		    	for (var n in this.toolBelt) {
		    		if (this.toolBelt[n].url == url) {
		    			this.toolBelt.splice(n,1);
		    			break;
		    		}
		    	}

		    	this.save($item);
		    },

		    save: function(item) {

		    	hacktoolSdk.Components.update('toolbelt', {
		    		content: this.toolBelt,
		    		sha: this.sha
		    	}, function(a){
		    		item.remove();
		    	});
		    }
		});

		return ToolBelt;
	}
);