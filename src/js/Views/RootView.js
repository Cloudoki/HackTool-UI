
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

				$('#main-content').find('.full-height').css('min-height', ($(window).height()-290)+'px');

				if (this.view.viewClass)
					$('body').addClass(this.view.viewClass);
				if (this.view.viewId)
					$('body').attr('id', this.view.viewId);

				if (this.view.title) {
					$('.header').show();
					$('.header-title').html(this.view.title);
				}
				else 
					$('.header').hide();

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

				var user = null,
					userid = null;

				//$('header').html(Mustache.render(Templates.topnav, {logged: user? true: false, user: user, userid: userid, group: group, is_admin: is_group_admin}));
				$('header').html(Mustache.render(Templates.topnav, {}));
			},

			renderFooter: function() {

				var year = new Date().getFullYear();

				$('footer').html(Mustache.render(Templates.footer, {year: year}));
			},
            
			showModal: function(template, params, model) {
			
				var modals = {
					// ADD MODALS HERE
				};

				var modalView = template? modals[template]: ModalView;				
				var modal = new modalView({params: params, modal: template, model: model});

				$('#mv-modal').remove(); // remove any existing modals
				$('body').append(modal.render().el);
				
				$('#mv-modal').modal();

				return modal;
			},

			hideModal: function() {

				$('#mv-modal').modal('hide');
			}
		});

		return RootView;
	}
);