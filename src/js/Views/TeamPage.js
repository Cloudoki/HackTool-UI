
define(
	['Views/BaseView'],
	function (BaseView)
	{
		var TeamPage = BaseView.extend({

			events: {},
			id: 'teampage',

			teamMembers: [],

			initialize: function(options) {

			},	

		    render: function(refresh)
		    {	
		    	this.$el.html(Mustache.render(Templates.team_page, {teamMembers: this.teamMembers}));

		    	if (!refresh)
		    		this.getTeam();

		        return this;
		    },

		    getTeam: function() {

		    	hacktoolSdk.Organizations.Teams.list("2052463", function(teamMembers) {
		    		
		    		this.teamMembers = teamMembers;
		    		this.render(true);

		    	}.bind(this));
		    }
		});

		return TeamPage;
	}
);