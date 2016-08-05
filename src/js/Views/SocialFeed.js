
// THE ADMIN CAN EDIT THIS PAGE

define(
	['Views/BaseView'],
	function (BaseView)
	{
		var SocialFeed = BaseView.extend({

			events: {},	

			initialize: function(options) {

				$.extend(this, options);
			},	

		    render: function()
		    {
		    	this.$el.html(Mustache.render(Templates.social_feed, {handle: this.handle}));

		        return this;
		    }
		});

		return SocialFeed;
	}
);