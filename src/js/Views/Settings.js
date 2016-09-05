
// THE ADMIN CAN EDIT THIS PAGE

define(
	['Views/BaseView'],
	function (BaseView)
	{
		var Settings = BaseView.extend({

			events: {
				'click [data-action=remove]': 'removeAdmin',
				'focus .admin-add input': 'enableSubmit',
				'blur .admin-add input': 'disableSubmit',
				'click [data-action=save]': 'saveSettings'
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

		    saveSettings: function() {

		    	var settings = {
		    		"name": this.$el.find('[data-attr=hacktool-name]').val(),
					"description": this.$el.find('[data-attr=hacktool-description]').val(),
					"time": {
						"date": "20 September 2016",
						"time": "09:00 (UTC+1)"
					},
					"location": {
						"street": this.$el.find('[data-attr=hacktool-street]').val(),
						"place": this.$el.find('[data-attr=hacktool-place]').val()
					}
		    	}
		    	
		    	hacktoolSdk.Settings.editSettings(settings, this.settingsUpdated.bind(this), this.settingsError.bind(this));
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
		    },

		    settingsUpdated: function() {
		    	this.renderAlert('.settings-alerts', 'success', "Settings updated!");
		    },

		    settingsError: function() {
		    	this.renderAlert('.settings-alerts', 'danger', error);
		    }
		});

		return Settings;
	}
);