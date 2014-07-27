var app = app || {};

app.Message = Backbone.Model.extend({
	url: function() {
		return 'http://booklog.io/1/post';
	},
	defaults: {
		success: false,
		errors: [],
		errfor: [],

		subject: undefined,
		content: undefined
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
		var self = this;
		var subject = this.$el.find('#subject').val();
		var content = this.$el.find('#content').val();

		this.model.set('subject', subject);
		this.model.set('content', content);

		this.model.save(this.model.attributes, {
			// if REST API is success
            success: function(model, response, options) {
            	// is there a error at server response
            	if (response.success === false) {
            		var keys = Object.keys(response.errfor);
            		
            		for (i = 0; i < keys.length; i++) {
	            		self.$el.find('#errfor-' + keys[i])
	            			.addClass('has-error');
	            	}
            	}
            },
            error: function(model, response, options) {
            }
        });
	}
});

$(document).ready(function () {
	app.messageView = new app.MessageView();
});