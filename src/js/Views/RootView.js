
define(
	['Views/BaseView', 'Views/Modals/Modal', 'Views/Modals/ArticleDeleteModal'],
	function (BaseView, ModalView, ArticleDeleteModal)
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

				var params = {
					user: Application.Session.User.attributes,
					organization: Application.Organization
				};

				$('header').html(Mustache.render(Templates.topnav, params));
			},

			showModal: function(template, params) {
				var modals = {
					'article_delete_modal': ArticleDeleteModal
				};

				var modalView = template? modals[template]: ModalView;

				var modal = new modalView({params: params, modal: template});

				$('#ht-modal').remove(); // remove any existing modals
				$('body').append(modal.render().el);

				$('#ht-modal').modal({backdrop: (params? params.static || true: true)});

				return modal;
			},

			hideModal: function() {

				$('#ht-modal').modal('hide');
			},
		});

		return RootView;
	}
);