
var app = app || {};

app.Message = Backbone.Model.extend({
	defaults: {
	    type: 'message',
	    data: {
	        message: 'hello world !!!',	// data.message
	        username: 'YOU',
	        timestamp: 1406439479931
    	}
    }
});

app.Control = Backbone.Model.extend({
	url: function() {
		return "http://182.50.155.56:8080/send?m=" + this.get('m');
	},
	defaults: {
		m: '',
		u: ''
    }
});

app.MessageView = Backbone.View.extend({
	el: '#board',
	events: {
	},
	initialize: function() {
		this.model = new app.Message();
		this.template = _.template( $('#tmpl-message').html() );
		this.createWebSocket();
		this.model.bind('change', this.render, this);
		this.render();
	},
	render: function() {
		var htmlCode = this.template(this.model.attributes);

		this.$el.prepend(htmlCode);
	},
	createWebSocket: function () {
		var self = this;

		this.websocket = new WebSocket("ws://182.50.155.56:8080/start", ['echo-protocol']);
		 
		function onWsMessage(message) {
		   var jsonObj = JSON.parse(message.data);
			 
		   self.model.set('data', jsonObj.data);
		}

		this.websocket.onopen = function() {
			console.log('Websocket: connected.');
		};

		this.websocket.onclose = function() { 
			console.log('Websocket: closed.');
		};

		this.websocket.onmessage = onWsMessage;
	}
});

app.ControlView = Backbone.View.extend({
	el: '#control',
	events: {
		'click #submit': 'send'
	},
	initialize: function() {
		this.model = new app.Control();
	},
	send: function() {
		var message;

		message = this.$el.find('#text').val();

		this.model.set('m', message);
		this.model.save();
	}
});

$(document).ready(function() {
	app.messageView = new app.MessageView();
	app.controlView = new app.ControlView();
});




