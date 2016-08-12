
define(
	['Views/Modals/Modal'],
	function (ModalView)
	{
		var ArticleDeleteModal = ModalView.extend({	

			events: {
				'click [data-action=confirm]': 'confirm'
			},

			confirm: function() {
				this.trigger('delete:confirm');
			}
		});

		return ArticleDeleteModal;
	}
);