import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {

    return Ember.RSVP.hash({
      suppliers: this.store.findAll('supplier' ,{reload :true}),
      products: this.store.findAll('product' ,{reload :true}),
      purchaseorders: this.store.findAll('purchaseorder' ,{reload :true}),
    });
  },

  setupController: function(controller,model) {

    controller.set('suppliers',model.suppliers);
    controller.set('products',model.products);
    controller.set('purchaseorders',model.purchaseorders);


  },

  actions:{
    // didTransition: function() {
    //   var controller = this.get('controller');
    //   controller.send('initPurchaseOrder');
    // },

    // 
    // willTransition: function(transition) {
    //   var route= this;
    //   var controller = this.get('controller');
    //   var posaved = this.controller.get('poNotsaved');
    //   if(this.controller.get('poNotsaved') ===true){
    //     var confirm = window.confirm("Leave without Saving ?" + posaved);
    //     if (confirm) {
    //       var purchaseorder = controller.get('purchaseorder');
    //
    //        purchaseorder.destroyRecord().then(function(){
    //         route.transitionTo('dashboard.stockcontrol.purchaseorders.index');
    //       });
    //
    //     }
    //     else{
    //       transition.abort();
    //     }
    //   }
    //   else{
    //     this.transitionTo('dashboard.stockcontrol.purchaseorders.index');
    //   }
    // },


  }

});
