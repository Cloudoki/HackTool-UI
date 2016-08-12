
define(
	['Views/BaseView'],
	function (BaseView)
	{
		var Modal = BaseView.extend({	

			id: 'ht-modal',
			className: 'modal fade',

			initialize: function(options) {
				$.extend(this, options);

				if (!this.params)	this.params = {};
				if (!this.modal)	this.modal = 'modal';

				this.selfInitialize();
			},

		    render: function()
		    {

		        this.$el.html(Mustache.render(Templates[this.modal], this.params));
		        this.$el.attr('tabindex', '-1');
		        this.$el.attr('role', 'dialog');

		        this.selfRender();

		        return this;
		    },

		    getVal: function(selector) {

				return this.$el.find('[data-attr='+selector+']').val();
			},

			// Override function for modal instances
		    selfRender: function() {},
		    selfInitialize: function() {}
		});

		return Modal;
	}
);