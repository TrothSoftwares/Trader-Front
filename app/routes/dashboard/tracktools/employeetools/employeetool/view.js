import Ember from 'ember';

export default Ember.Route.extend({



  model: function() {
    return Ember.RSVP.hash({
    employee: this.modelFor('dashboard.tracktools.employeetools.employeetool'),
  });

  },

  setupController: function(controller ,model) {
    controller.set('employee',model.employee );
  }
});
