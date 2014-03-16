var app = app || {};

app.Message = Backbone.Model.extend({
	url: function() {
		return 'http://booklog.io/1/post';
	},
	defaults: {
		success: false,
		errors: [],
		errfor: [],

		subject: '',
		content: ''
	}
});

app.MessageView = Backbone.View.extend({
	el: '#message',
	events: {
		'click #btn-submit': 'submit', 
	},
	initialize: function() {
		this.model = new app.Message();	
	},
	render: function() {
	},
	submit: function() {
		var subject = this.$el.find('#subject').val();
		var content = this.$el.find('#content').val();

		this.model.set('subject', subject);
		this.model.set('content', content);

		this.model.save();
	}
});

$(document).ready(function () {
	app.messageView = new app.MessageView();
});