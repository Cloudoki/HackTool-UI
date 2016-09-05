
define(
	['Views/BaseView'],
	function (BaseView)
	{
		var TeamPage = BaseView.extend({

			events: {},
			id: 'teampage',

			teamMembers: [],

			initialize: function(options) {
				
				$('body').addClass('small_header');
				$('body').find('.sub_title').html('Buccaneers these proud women and men are. <em>Salute</em>!');

			},

		    render: function(refresh)
		    {
		    	this.$el.html(Mustache.render(Templates.team_page, {teamMembers: this.teamMembers}));

		    	if (!refresh)
		    		this.getTeam();

		        return this;
		    },

		    getTeam: function() {

		    	hacktoolSdk.Organizations.Teams.list(function(teamMembers) {

		    		this.teamMembers = teamMembers;
		    		this.render(true);

		    	}.bind(this));
		    }
		});

		return TeamPage;
	}
);
