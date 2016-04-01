import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
      // return this.store.findRecord('order', params.id );
      return  this.modelFor('dashboard.orders.order');

  },

  setupController: function(controller ,model) {
    controller.set('order',model );
    controller.set('customers', this.store.findAll('customer'));
    controller.set('products', this.store.findAll('product'));


  },



});
