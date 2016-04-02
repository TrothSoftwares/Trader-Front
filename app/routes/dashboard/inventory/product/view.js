import Ember from 'ember';

export default Ember.Route.extend({



    model: function() {
      return Ember.RSVP.hash({
      product: this.modelFor('dashboard.inventory.product'),
    });

    },

  setupController: function(controller ,model) {
    controller.set('product',model.product );
    controller.set('suppliers', this.store.findAll('supplier'));
    controller.set('producttypes', this.store.findAll('producttype'));
    controller.set('productbrands', this.store.findAll('productbrand'));

  }
});
