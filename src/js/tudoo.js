var app = app || {};

(function(app) {
  app.Instance = {};

  app.Instance.taskCollection = new app.TaskCollection();

  app.Instance.taskCollection.add(new app.Task({
    value: 'My first task'
  }));

  app.Instance.taskCollection.add(new app.Task({
    value: 'My second task'
  }));

  app.Instance.appView = new app.AppView({
    el: $('#app-wrapper'),
    collection: app.Instance.taskCollection
  });

  // Hack to fix hover on mobile devices
  $('a').click(function() {
    var $this = $(this);

    $this.replaceWith($this.clone(true));
  });
})(app);
