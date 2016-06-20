import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return Ember.RSVP.hash({
    stockadjustment: this.modelFor('dashboard.stockcontrol.stockadjustments.stockadjustment'),
  });

  },



  setupController: function(controller ,model) {
    controller.set('stockadjustment',model.stockadjustment );
    controller.set('customers', this.store.findAll('customer'));
    // controller.set('products', this.store.findAll('product'));
  },
});
