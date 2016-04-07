import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {

    return Ember.RSVP.hash({
      purchaseorders: this.store.findAll('purchaseorder' ,{reload :true}),
    });

  },

  setupController: function(controller,model) {
    controller.set('purchaseorders',model.purchaseorders);
  },

});
