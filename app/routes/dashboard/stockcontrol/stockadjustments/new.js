import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
//      return this.store.findRecord('purchaseorder', params.id );
  },

  setupController: function(controller) {
  //  controller.set('purchaseorder',model );
    controller.set('customers', this.store.findAll('customer'));
    controller.set('products', this.store.findAll('product'));
    controller.set('stockadjustments', this.store.findAll('stockadjustment'));

  },



});
