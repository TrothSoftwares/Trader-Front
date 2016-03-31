import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
      return this.store.findRecord('order', params.id );
  },

  setupController: function(controller ,model) {
    controller.set('order',model );
    controller.set('customers', this.store.findAll('customer'));
    controller.set('products', this.store.findAll('product'));
    

  },



});
