import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {

    return Ember.RSVP.hash({
      stockadjustments: this.store.findAll('stockadjustment' ,{reload :true}),
    });

  },

  setupController: function(controller,model) {
    controller.set('stockadjustments',model.stockadjustments);
  },

});
