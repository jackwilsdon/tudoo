var app = app || {};

(function(app) {
  app.AppView = Backbone.View.extend({
    tagName: 'div',

    events: {
      'keydown #task-field': 'taskKeyDown'
    },

    template: _.template($('#app-template').html()),

    initialize: function() {
      _.bindAll(this, 'taskKeyDown', 'render');

      this.taskListView = new app.TaskListView({
        collection: this.collection
      });

      this.taskListInfoView = new app.TaskListInfoView({
        collection: this.collection
      });

      this.render();
    },

    taskKeyDown: function(event) {
      if (event.keyCode !== 13) {
        return;
      }

      var $target = $(event.target),
          value   = $target.val();

      if (value.match(/^\s*$/) === null) {
        var task = new app.Task({
          value: value
        });

        this.collection.add(task);

        $target.val('');
      }
    },

    render: function() {
      this.$el.html(this.template());
      this.$('#task-list').replaceWith(this.taskListView.el);
      this.$('#task-list-info').replaceWith(this.taskListInfoView.el);

      return this;
    }
  });
})(app);
