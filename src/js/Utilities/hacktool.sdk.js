var token;
var  hacktoolRepos = [];

function request(config) {
	if(!config.headers) config.headers = {}
  	if(!config.headers.Authorization && token) config.headers.Authorization = "token " + token;
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

	setToken: function(t){
		token = t;
	},

	Organizations:  {
		Teams: {
			list: function (argument) {
				// body...
			}
		},
		Repositories: {
			list: function (organization, success, error) {
				request({
				  	url: 'https://api.github.com/orgs/'+organization+'/repos?type=public',
				  	method: 'GET'
				}).done(function(data) {
					success(filterRepos(data))
				}).error(error);
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
		me: function (success, error) {
			request({
			  	url: 'https://api.github.com/user',
			  	method: 'GET'
			}).done(function(data) {
				success(data)
			}).error(error);
		}
	},

	Components: {

		// Global GET function for every json file in the repo
		get: function (component, success, error) {
			request({
			  	url: 'https://api.github.com/repos/Cloudoki/_hacktool/contents/'+component+'.json',
			  	method: 'GET'
			}).done(function(data) {				
				hacktoolSdk.Components.read(data.download_url, success)
			}).error(error);
		},

		// Raw JSON fetcher for the file
		read: function(content, success, error) {
			$.getJSON(content, null, success);
		}
	}

}
