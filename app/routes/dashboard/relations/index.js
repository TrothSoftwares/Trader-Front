import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {

  },

  setupController: function(controller) {
    
    controller.set('suppliers', this.store.findAll('supplier') ,{reload: true});
    controller.set('customers', this.store.findAll('customer') ,{reload: true});

  },

});
