import Ember from 'ember';

export default Ember.Route.extend({



  model: function() {
    return Ember.RSVP.hash({
    supplier: this.modelFor('dashboard.relations.suppliers.supplier'),
  });

  },

  setupController: function(controller ,model) {
    controller.set('supplier',model.supplier );
  }
});
