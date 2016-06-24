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

            renderAlert: function(target, type, content, params) {

				this.$el.find(target).html(Mustache.render(Templates.alert, {type: type, content: content, params: params}));
			}
            
		});

		return BaseView;
	}
);