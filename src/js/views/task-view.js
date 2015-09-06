var app = app || {};

(function(app) {
  app.TaskView = Backbone.View.extend({
    tagName: 'li',
    className: 'task',

    events: {
      'click': 'toggleCompleted'
    },

    template: _.template($('#task-template').html()),

    initialize: function() {
      _.bindAll(this, 'toggleCompleted', 'render');

      this.model.bind('change', this.render);

      this.render();
    },

    toggleCompleted: function() {
      this.model.toggleCompleted();
    },

    render: function() {
      this.$el.html(this.template({
        value: this.model.getValue()
      }));

      if (this.model.isCompleted()) {
        this.$el.addClass('completed');
      } else {
        this.$el.removeClass('completed');
      }

      return this;
    }
  });
})(app);
