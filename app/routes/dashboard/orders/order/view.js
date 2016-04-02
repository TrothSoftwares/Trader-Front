import Ember from 'ember';

export default Ember.Route.extend({



  model: function() {
    return Ember.RSVP.hash({
    order: this.modelFor('dashboard.orders.order'),
  });

  },

  setupController: function(controller ,model) {
    controller.set('order',model.order );
    controller.set('customers', this.store.findAll('customer'));
    controller.set('products', this.store.findAll('product'));


  },
});
