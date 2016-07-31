
// THE ADMIN CAN EDIT THIS PAGE

define(
	['Views/BaseView'],
	function (BaseView)
	{
		var ToolBelt = BaseView.extend({

			events: {
				'click [data-action=edit]': 'toggleEdit',
				'click [data-action=done]': 'toggleEdit',
				'click [data-action=remove]': 'removeRepo',
				'focus .repo-add input': 'enableSubmit',
				'blur .repo-add input': 'disableSubmit'
			},	

			initialize: function(options) {

			},	

		    render: function(refresh, edit)
		    {	
		    	this.$el.html(Mustache.render(Templates.tool_belt, {items: this.toolBelt, edit: edit}));

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

		    enableSubmit: function(e) {

		    	$(e.currentTarget).keypress(function(key){
		    		if (key.which == 13)
		    			this.addRepo()
		    	}.bind(this));
		    },

		    disableSubmit: function(e) {

		    	$(e.currentTarget).off('keypress');
		    },

		    toggleEdit: function() {

		    	this.$el.find('.tabbed-widget').toggleClass('edit');
		    },

		    addRepo: function() {

		    	var name = this.$el.find('[data-attr=repo-name]').val();
		    	var uri = this.$el.find('[data-attr=repo-uri]').val();

		    	if (!name || !uri)
		    		this.$el.find('.repo-add').append('nope.')

		    	else {
		    		this.toolBelt.push({name: name, url: uri});
		    		this.toolBelt.sort(function(a,b){ return a.name > b.name });

		    		this.save(function(){
		    			this.render(true, true);
		    		}.bind(this));
		    	}
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

		    	this.save(function(){
		    		$item.remove()
		    	});
		    },

		    save: function(success, error) {

		    	hacktoolSdk.Components.update('toolbelt', {
		    		content: this.toolBelt,
		    		sha: this.sha
		    	}, function(a){
		    		success()
		    	});
		    }
		});

		return ToolBelt;
	}
);