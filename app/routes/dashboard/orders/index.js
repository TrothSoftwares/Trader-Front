import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {



return Ember.RSVP.hash({
products: this.store.findAll('product' ,{reload: true}),
orders: this.store.findAll('order' ,{reload: true}),
});
  },




  setupController: function(controller , model) {
    controller.set('products',model.products);
    controller.set('orders',model.orders);


  },


});
