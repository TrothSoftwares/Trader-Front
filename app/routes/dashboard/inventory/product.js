import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
      return this.store.findRecord('product', params.id );
  },

  setupController: function(controller ,model) {
    controller.set('product',model );
    controller.set('suppliers', this.store.findAll('supplier'));
    controller.set('producttypes', this.store.findAll('producttype'));
    controller.set('productbrands', this.store.findAll('productbrand'));

  }
});
