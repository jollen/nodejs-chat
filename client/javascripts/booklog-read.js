var app = app || {};

app.Message = Backbone.Model.extend({
	url: function() {
		if (this.attributes.posts.length === 0)
			return 'http://booklog.io/1/post';

		this.currentId = this.currentId + 1;

		return 'http://booklog.io/1/post/' + this.attributes.posts[this.currentId].id;
	},
	currentId: -1,
	defaults: {
		success: false,
		errors: [],
		errfor: [],

		post: {},
		posts: []
	}
});

app.MessageView = Backbone.View.extend({
	el: '#message',
	events: {
		'click #btn-next': 'next', 
	},
	initialize: function() {
		var self = this;

		this.model = new app.Message();	
		this.template = _.template($('#tmpl-message').html());

		this.model.fetch({
			success: function(model, response, options) {
				self.model.bind('change', self.render, self);
			}
		});
	},
	render: function() {
		// ViewModel
		var data = this.template(this.model.attributes);
		this.$el.html(data);
	},
	next: function() {
		this.model.fetch();
	}
});

$(document).ready(function () {
	app.messageView = new app.MessageView();
});