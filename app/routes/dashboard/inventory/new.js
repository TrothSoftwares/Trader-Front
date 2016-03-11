import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('product');
  },

  setupController: function(controller ,model) {
        controller.set('products',model);
       controller.set('suppliers', this.store.findAll('supplier'));
       controller.set('producttypes', this.store.findAll('producttype'));
       controller.set('productbrands', this.store.findAll('productbrand'));
  }
});
