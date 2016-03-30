import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
      return this.store.findRecord('stockadjustment', params.id );
  },

  setupController: function(controller ,model) {
    controller.set('stockadjustment',model );
    controller.set('customers', this.store.findAll('customer'));
    controller.set('products', this.store.findAll('product'));
    // controller.set('productbrands', this.store.findAll('productbrand'));

  },



});
