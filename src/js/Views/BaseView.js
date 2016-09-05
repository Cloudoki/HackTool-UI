define (
	[
		'underscore',
		'backbone',
		'mustache'
	],
	function (_, Backbone, mustache)
	{
		// Sets Mustache api available in all views
		Mustache = mustache;

		var BaseView = Backbone.View.extend ({
            
            windowScrollHandle: function(){
                
               var scrollValue = window.pageYOffset;
               
               $('.navbar-brand').css({
                   'background-image': 'url(images/logo-menu.png)',
                   'width' : '70px'
               })
               
            },

            renderAlert: function(target, type, content, params) {

				this.$el.find(target).html(Mustache.render(Templates.alert, {type: type, content: content, params: params}));
			},

		});

		return BaseView;
	}
);