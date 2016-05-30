import Ember from 'ember';

export default Ember.Route.extend({



  model: function() {
    return Ember.RSVP.hash({
    tool: this.modelFor('dashboard.tracktools.tools.tool'),
  });

  },

  setupController: function(controller ,model) {
    controller.set('tool',model.tool );
  }
});
