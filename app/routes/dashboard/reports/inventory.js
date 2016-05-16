import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {

    return Ember.RSVP.hash({
      products: this.store.findAll('product' ,{reload :true}).then(function(data){
         data.removeObject(data.get('firstObject'));
        return data;
      }),
      producttypes: this.store.findAll('producttype' ,{reload :true}),
    });

  },







  setupController: function(controller,model) {
  controller.set('products',model.products);
    controller.set('producttypes',model.producttypes);
  },

});
