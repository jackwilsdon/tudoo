var app = app || {};

(function(app) {
  app.Task = Backbone.Model.extend({
    defaults: {
      value: '',
      completed: false
    },

    getValue: function() {
      return this.get('value');
    },

    isCompleted: function() {
      return this.get('completed');
    },

    getView: function() {
      this._view = this._view || new app.TaskView({
        model: this
      });

      return this._view;
    },

    setValue: function(value) {
      return this.set('value', value);
    },

    setCompleted: function(completed) {
      return this.set('completed', completed);
    },

    toggleCompleted: function() {
      this.setCompleted(!this.isCompleted());

      return this;
    }
  });
})(app);
