import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      customers: this.store.findAll('customer' ,{reload :true}),
      suppliers: this.store.findAll('supplier' ,{reload :true}),
      employees: this.store.findAll('employee' ,{reload :true}),
      products: this.store.findAll('product' ,{reload :true}),
      orders: this.store.findAll('order' ,{reload :true}),
    });
  },

  setupController: function(controller,model) {





    controller.set('suppliers',model.suppliers);
    controller.set('employees',model.employees);
    controller.set('customers',model.customers);
    controller.set('products',model.products);
    controller.set('orders',model.orders);


  },



    actions:{
      // didTransition: function() {
      //   var controller = this.get('controller');
      //   controller.send('initOrder');
      // },


      willTransition: function(transition) {
        var route= this;
        var controller = this.get('controller');

        if(this.controller.get('orderNotsaved') ===true){
          var confirm = window.confirm("Leave without Saving ?" );
          if (confirm) {
            var order = controller.get('order');

             order.destroyRecord().then(function(){
              route.transitionTo('dashboard.orders.index');
            });

          }
          else{
            transition.abort();
          }
        }
        else{
          this.transitionTo('dashboard.orders.index');
        }
      },


    }





});
