
define(
	['Views/BaseView'],
	function (BaseView)
	{
		var RootView = BaseView.extend({

		    render : function ()
			{	
				if (typeof (this.view) === 'undefined')
					return;
				
				$('#main-content').html (this.view.render().el);

				// Scroll to top
				window.scrollTo(0, 0);	
			},

			setView : function (view)
			{
				this.view = view;
				this.render ();

				this.view.trigger('view:rendered');
			},

			renderNav: function() {
				$('header').html(Mustache.render(Templates.topnav, {}));
			}
		});

		return RootView;
	}
);