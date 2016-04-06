import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {

    return Ember.RSVP.hash({
      products: this.store.findAll('product' ,{reload :true}),
    });

  },

  setupController: function(controller,model) {
    controller.set('products',model.products);
  },

});
