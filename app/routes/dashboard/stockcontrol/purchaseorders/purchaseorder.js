import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
      return this.store.findRecord('purchaseorder', params.id );
  },

  setupController: function(controller ,model) {
    controller.set('purchaseorder',model );
    controller.set('suppliers', this.store.findAll('supplier'));
    controller.set('products', this.store.findAll('product'));
    // controller.set('productbrands', this.store.findAll('productbrand'));

  },



});
