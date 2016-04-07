import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
return this.store.findAll('product' ,{reload: true});
  },

  setupController: function(controller , model) {
    controller.set('products',model);
    controller.set('purchaseorders', this.store.findAll('purchaseorder') ,{reload: true});
    controller.set('stockadjustments', this.store.findAll('stockadjustment') ,{reload: true});
  },


  activeClass: 'active',
});
