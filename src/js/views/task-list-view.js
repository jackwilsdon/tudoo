var app = app || {};

(function(app) {
  app.TaskListView = Backbone.View.extend({
    tagName: 'ul',
    className: 'task-list',

    initialize: function() {
      _.bindAll(this, 'addTask', 'changeTask', 'removeTask', 'render');

      this.collection.bind('add', this.addTask);
      this.collection.bind('change', this.changeTask);
      this.collection.bind('remove', this.removeTask);

      this.render();
    },

    addTask: function(model) {
      model.getView().delegateEvents();
      this.$el.append(model.getView().el);
    },

    changeTask: function() {
      this.collection.sort();
      this.render();
    },

    removeTask: function(model) {
      model.getView().el.remove();
    },

    render: function() {
      this.$el.empty();

      this.collection.forEach(this.addTask);

      return this;
    }
  });
})(app);
