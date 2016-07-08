var token;
function request(config) {
	if(!config.headers) config.headers = {}
	if(!config.headers.Authorization && token) config.headers.Authorization = 'token ' + token;
	return $.ajax(config);
}

function filterRepos(repos) {
	for(repo in repos) {
		console.log(repos[repo]);
	}
	//console.log("repos", repos);
}

var hacktoolSdk = {

	config: function(t) {
		token = t;
	},

	Organizations:  {
		Teams: {
			list: function (argument) {
				// body...
			}
		},
		Repositories: {
			list: function (organization, callback) {
				request({
				  	url: 'https://api.github.com/orgs/'+organization+'/repos?type=all',
				  	method: 'GET'
				}).done(function(data) {
					filterRepos(data);
					callback(null, data)
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
