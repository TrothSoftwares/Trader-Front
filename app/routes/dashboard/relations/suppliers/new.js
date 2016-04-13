import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {

    return Ember.RSVP.hash({

    suppliers: this.store.findAll('supplier'),

  });
  },





  setupController: function(controller ,model) {

       controller.set('suppliers', model.suppliers);
       
  }
});
