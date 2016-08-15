
// THE ADMIN CAN EDIT THIS PAGE

define(
	['Views/BaseView'],
	function (BaseView)
	{
		var Settings = BaseView.extend({

			events: {
				'click [data-action=remove]': 'removeAdmin',
				'focus .admin-add input': 'enableSubmit',
				'blur .admin-add input': 'disableSubmit'
			},

		    render: function()
		    {
		    	this.$el.html(Mustache.render(Templates.settings, {settings: Application.config}));

		        return this;
		    },

		    enableSubmit: function(e) {

		    	$(e.currentTarget).keypress(function(key){
		    		if (key.which == 13)
		    			this.addAdmin()
		    	}.bind(this));
		    },

		    disableSubmit: function(e) {

		    	$(e.currentTarget).off('keypress');
		    },

		    addAdmin: function() {

		    	var email = this.$el.find('[data-attr=admin-email]').val();

		    	if (!email)
		    		this.$el.find('.admin-add').append('nope.');
		    	else 
		    		hacktoolSdk.Settings.addAdmin(email, this.adminUpdated.bind(this, false, email), this.adminError.bind(this));
		    },

		    removeAdmin: function(e) {

		    	var $item = $(e.currentTarget).closest('.display');
		    	var email = $item.data('email');

		    	hacktoolSdk.Settings.removeAdmin(email, this.adminUpdated.bind(this, true, email), this.adminError.bind(this));
		    },

		    adminUpdated: function(remove, email) {
		    	
		    	if (!remove)
		    		this.$el.find('.admin-list').append(Mustache.render(Templates.admin_list_item, {email: email}));
		    	else
		    		this.$el.find('.admin-list [data-email="'+email+'"]').remove();

		    	this.$el.find('.admin-add input').val('');
		    },

		    adminError: function(error) {
		    	this.renderAlert('.admin-alerts', 'danger', error);
		    }
		});

		return Settings;
	}
);