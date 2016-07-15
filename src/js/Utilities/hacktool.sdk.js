var token;
var options;
var  hacktoolRepos = [];

function request(config) {
	if(!config.headers) config.headers = {}
	if(!config.headers.Authorization && token) config.headers.Authorization = 'token ' + token;
	return $.ajax(config);
}

function filterRepos(repos) {

	for(repo in repos) {

		//change it to hacktool
		if (repos[repo].name.substring(0, 8) == "backbone") {
			hacktoolRepos.push(repos[repo]);
		}
	}

	return hacktoolRepos;
}

var hacktoolSdk = {

	config: function(opts) {
		options = opts;
	},

	Organizations:  {
		Teams: {
			list: function (argument) {
				// body...
			}
		},
		Repositories: {
			list: function (callback) {
				request({
				  	url: 'https://api.github.com/orgs/'+options.organizations+'/repos?type=all',
				  	method: 'GET'
				}).done(function(data) {
					callback(null, filterRepos(data))
				}).error(callback);
			}
		},
		list: function (callback) {
			request({
			  	url: 'https://api.github.com/user/orgs',
			  	method: 'GET'
			}).done(function(data) {
				callback(null, data)
			}).error(callback);
		},
		repo: function (organization) {
			alert(organization);
		}
	},

	Users: {
		login: function (argument) {
		// body...
		}
	}

}
