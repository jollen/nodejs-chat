var app = app || {};

/**
 * MODELS
 */
app.PostItem = Backbone.Model.extend({
	url: 'http://booklog.io/1/post',
	currentId: -1,
	defaults: {
		success: false,
		errors: [],
		errfor: [],

		posts: []
	}
});

app.Post = Backbone.Model.extend({
	id: undefined,
	url: function() {
		return 'http://booklog.io/1/post/' + this.id;
	},
	initialize: function() {
	},
	defaults: {
		success: false,
		errors: [],
		errfor: [],
		post: {
			wchars: 0,
			subject: '',
			content: ''
		}
	}
});

app.PostCollection = Backbone.Collection.extend({
	model: app.Post
});

/*
 * VIEWS
 */
app.PostItemView = Backbone.View.extend({
	el: '#content-post-item',
	initialize: function() {
		var self = this;

		this.model = new app.PostItem();
		this.collection = new app.PostCollection();

		this.template = _.template($('#tmpl-post-item').html());
		this.model.bind('change', this.render, this);

		this.model.fetch({
			success: function(model, response, options) {
			}
		});
	},
	render: function() {
		var self = this,
			data = this.template(this.model.attributes);

		this.$el.html(data);

	    $('[data-tag="post-item"]').each(function () {
	        var me = $(this),
	        	id = me.data('id'),
	        	post = new app.Post({id: id});

			post.fetch({
				success: function(model, response, options) {
					me.find('.status-loading').addClass('hide');
				}
			});

			self.collection.push(post);

	        me.on('click', function() {
	        	var id = me.data('id'),
	        		post = self.collection.get(id);

	        	app.postView.model.set(post.attributes);
	        });
		});
	}
});

app.PostView = Backbone.View.extend({
	el: '#content-post',
	initialize: function() {
		var id = this.$el.data('post-id');

		this.model = new app.Post();	
		this.template = _.template($('#tmpl-post').html());
		this.model.bind('change', this.render, this);

		this.model.set('id', id);
		this.model.fetch({
			success: function(model, response, options) {
				console.log(JSON.stringify(model));
			}
		});
	},
	render: function() {
		var data = this.template(this.model.attributes);
		this.$el.html(data);
	}
});

$(document).ready(function () {
	//app.postItemView = new app.PostItemView();

	/* read one post by ID */
	app.postView = new app.PostView();
});