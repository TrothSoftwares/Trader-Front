import Ember from 'ember';

export default Ember.Route.extend({



  model: function() {
    return Ember.RSVP.hash({
    purchaseorder: this.modelFor('dashboard.stockcontrol.purchaseorders.purchaseorder'),
  });

  },


  setupController: function(controller ,model) {
    controller.set('purchaseorder',model.purchaseorder );
    controller.set('suppliers', this.store.findAll('supplier'));
    controller.set('products', this.store.findAll('product'));

  },



});
