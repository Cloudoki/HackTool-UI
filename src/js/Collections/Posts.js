define(
	['Collections/BaseCollection', 'Models/Post', 'moment'],
	function (BaseCollection, Post, moment)
	{
		
		var Posts = BaseCollection.extend({

			model: Post,

			initialize: function() {
				this.on('add', this.preParse.bind(this))
			},

			preParse: function(post) {
				post.created_at = moment(post.get('created_at')).calendar(null, {
				    sameDay: '[Today], HH:mm',
				    lastDay: '[Yesterday], HH:mm',
				    lastWeek: '[Last] dddd, HH:mm',
				    sameElse: 'MMMM Do, HH:mm'
				})
			}
		});

		return Posts;
	}
);