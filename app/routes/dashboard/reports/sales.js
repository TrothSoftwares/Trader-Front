import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {

    return Ember.RSVP.hash({
      orders: this.store.findAll('order' ,{reload :true}).then(function(data){
        return data.filter(function(item){
           return item.get('id') !== '1';
        });
      }),

      customers: this.store.findAll('customer' ,{reload :true}).then(function(data){
        return data.filter(function(item){
           return item.get('id') !== '1';
        });
      }),
      
      producttypes: this.store.findAll('producttype' ,{reload :true}),
    });

  },

  setupController: function(controller,model) {




    controller.set('orders',model.orders);
    controller.set('customers',model.customers);
    // controller.set('producttypes',model.producttypes);
  },

});
