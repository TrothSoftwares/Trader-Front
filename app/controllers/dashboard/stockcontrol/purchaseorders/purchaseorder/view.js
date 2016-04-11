import Ember from 'ember';

export default Ember.Controller.extend({



  actions:{



    revertOrder: function(purchaseorder){


      var controller = this;
      purchaseorder.set('postatus','created');
      var purchaseorderitems= purchaseorder.get('purchaseorderitems');
      purchaseorderitems.forEach(function(purchaseorderitem){
        var purchaseorderitemquantity = purchaseorderitem.get('quantity');
        var purchaseorderitemproduct = purchaseorderitem.get('product');
         controller.store.findRecord('product',purchaseorderitemproduct.get('id')).then(function(product){
           var initialstocklevel = product.get('initialstocklevel');

        product.set('initialstocklevel' , initialstocklevel - purchaseorderitemquantity);
        product.save();
      });
      });


        },



    recieveOrder: function(purchaseorder){


      var controller = this;
      purchaseorder.set('postatus','received');
      var purchaseorderitems= purchaseorder.get('purchaseorderitems');
      purchaseorderitems.forEach(function(purchaseorderitem){
        var purchaseorderitemquantity = purchaseorderitem.get('quantity');
        var purchaseorderitemproduct = purchaseorderitem.get('product');
         controller.store.findRecord('product',purchaseorderitemproduct.get('id')).then(function(product){
           var initialstocklevel = product.get('initialstocklevel');

        product.set('initialstocklevel' , initialstocklevel + purchaseorderitemquantity);
        product.save();
      });
      });
      purchaseorder.save().then(function(){
      Ember.$('.small.modal').modal('hide');
      });

    },


    recievePartial: function(purchaseorder){
      var confirm = window.confirm(" Are you sure to Partially receive.?");
      if (confirm) {
      purchaseorder.set('postatus','partial');
      purchaseorder.save().then(function(){
        Ember.$('.small.modal').modal('hide');
      });
}
    },


    recieveOrderPopUp:function(){
      Ember.$('.small.modal').modal('show');
    }
  }
});
