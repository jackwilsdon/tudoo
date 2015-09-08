var app = app || {};

(function(app) {
  var compareCids = function(cid, nextCid) {
    var nCid = parseInt(cid.slice(1)),
        nNextCid = parseInt(nextCid.slice(1));

    if (nCid > nNextCid) {
      return 1;
    } else if (nCid < nNextCid) {
      return -1;
    }

    return 0;
  };

  app.CategoryCollection = Backbone.Collection.extend({
    model: app.Category
  });

  app.TaskCollection = Backbone.Collection.extend({
    comparator: function(model, nextModel){
      if (!model.isCompleted() || !nextModel.isCompleted()) {
        if (model.isCompleted()) {
          return 1;
        } else if (nextModel.isCompleted()) {
          return -1;
        }
      }

      return compareCids(model.cid, nextModel.cid);
    },

    model: app.Task
  });
})(app);
