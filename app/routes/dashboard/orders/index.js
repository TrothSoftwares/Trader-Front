import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {


    return Ember.RSVP.hash({
      products: this.store.findAll('product' ,{reload: true}),
      orders: this.store.findAll('order' ,{reload: true}).then(function(data){
        return data.filter(function(item){
           return item.get('id') !== '1';
        });
      }),
    });
  },







  setupController: function(controller , model) {
    controller.set('products',model.products);
    controller.set('orders',model.orders);


  },


});
