import Ember from 'ember';

export default Ember.Route.extend({



    model: function() {
      return Ember.RSVP.hash({
      product: this.modelFor('dashboard.inventory.product'),
      products: this.store.findAll('product'),
      suppliers: this.store.findAll('supplier'),
      producttypes: this.store.findAll('producttype'),
      productbrands: this.store.findAll('productbrand'),
    });

    },






  setupController: function(controller ,model) {
    controller.set('product',model.product );
    controller.set('products', model.products);
    controller.set('suppliers', model.suppliers);
    controller.set('producttypes', model.producttypes);
    controller.set('productbrands', model.productbrands);

  }
});
