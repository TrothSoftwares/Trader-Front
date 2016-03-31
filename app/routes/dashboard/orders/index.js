import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
return this.store.findAll('product' ,{reload: true});
  },

  setupController: function(controller , model) {
    controller.set('products',model);
    controller.set('orders', this.store.findAll('order') ,{reload: true});

  },

 
});
