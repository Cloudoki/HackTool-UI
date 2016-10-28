
// THE ADMIN CAN EDIT THIS PAGE

define(
	['Views/BaseView'],
	function (BaseView)
	{
		var RepoList = BaseView.extend({

			events: {
				'click [data-action=edit]': 'toggleEdit',
				'click [data-action=done]': 'toggleEdit',
				'click [data-action=remove]': 'removeRepo',
				'focus .repo-add input': 'enableSubmit',
				'blur .repo-add input': 'disableSubmit'
			},

			initialize: function(options) {

			},

		    render: function(refresh, edit)
		    {
		    	this.$el.html(Mustache.render(Templates.repo_list, {items: this.repoList, edit: edit, admin: Application.Session.isAdmin}));

		    	if (!refresh)
		    		this.getData();

		        return this;
		    },

		    getData: function() {

				hacktoolSdk.Organizations.Repositories.list(function(repos){
		    		this.repoList = repos;
		    		this.render(true);
				}.bind(this), this.error);
		    },
		});

		return RepoList;
	}
);
