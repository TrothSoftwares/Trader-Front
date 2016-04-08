import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {


    return Ember.RSVP.hash({
      orders: this.store.findAll('order' ,{reload :true}),
      products: this.store.findAll('product' ,{reload :true}),
      stockadjustments: this.store.findAll('stockadjustment' ,{reload :true}),
    });
  },

  setupController: function(controller , model) {

    controller.set('orders',model.orders);
    controller.set('products',model.products);
    controller.set('stockadjustments',model.stockadjustments);

  },



  actions:{





    // didTransition: function() {
    //   var controller = this.get('controller');
    //   controller.send('initStockadjustment');
    // },
    //
    //
    // willTransition: function(transition) {
    //   var route= this;
    //   var controller = this.get('controller');
    //   var posaved = this.controller.get('soNotsaved');
    //   if(this.controller.get('soNotsaved') ===true){
    //     var confirm = window.confirm("Leave without Saving ?" + posaved);
    //     if (confirm) {
    //       var purchaseorder = controller.get('stockadjustment');
    //
    //        purchaseorder.destroyRecord().then(function(){
    //         route.transitionTo('dashboard.stockcontrol.stockadjustments.index');
    //       });
    //
    //     }
    //     else{
    //       transition.abort();
    //     }
    //   }
    //   else{
    //     this.transitionTo('dashboard.stockcontrol.stockadjustments.index');
    //   }
    // },


  }


});
