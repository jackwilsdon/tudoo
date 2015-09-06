var app = app || {};

(function(app) {
  app.TaskListInfoView = Backbone.View.extend({
    tagName: 'ul',
    className: 'task-list-info',

    events: {
      'click #remove-completed': 'removeCompletedTasks'
    },

    template: _.template($('#info-template').html()),

    initialize: function() {
      _.bindAll(this, 'removeCompletedTasks', 'render');

      this.collection.bind('add', this.render);
      this.collection.bind('change', this.render);
      this.collection.bind('remove', this.render);

      this.render();
    },

    removeCompletedTasks: function() {
      this.collection.remove(this.collection.where({
        completed: true
      }));
    },

    render: function() {
      var taskCount = this.collection.where({
        completed: true
      }).length;

      var $template = $(this.template({
        taskCount: taskCount,
        taskWord: (taskCount === 1) ? 'task' : 'tasks'
      }));

      if (taskCount === 0) {
        $template.find('#remove-completed').remove();
      }

      this.$el.html($template);

      return this;
    }
  });
})(app);
