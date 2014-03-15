var app = app || {};

app.Message = Backbone.Model.extend({
	url: 'http://booklog.io/1/post',
	defaults: {
		success: false,
		errors: [],
		errfor: [],

		posts: []
	}
});

app.MessageView = Backbone.View.extend({
	el: '#message',
	initialize: function() {
		this.model = new app.Message();	

		this.template = _.template($('#tmpl-message').html());

		this.model.bind('change', this.render, this);

		this.model.fetch({
			success: function(model, response, options) {
			}
		});
	},
	render: function() {
		// ViewModel
		var data = this.template(this.model.attributes);
		this.$el.html(data);
	}
});

$(document).ready(function () {
	app.messageView = new app.MessageView();
});