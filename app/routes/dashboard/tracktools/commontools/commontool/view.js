import Ember from 'ember';

export default Ember.Route.extend({



  model: function() {
    return Ember.RSVP.hash({
    commontool: this.modelFor('dashboard.tracktools.commontools.commontool'),
    employees: this.store.findAll('employee'),
  });

  },

  setupController: function(controller ,model) {
    controller.set('commontool',model.commontool );
    controller.set('employees', model.employees);
  }
});
