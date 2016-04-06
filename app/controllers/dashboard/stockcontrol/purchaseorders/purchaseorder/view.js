import Ember from 'ember';

export default Ember.Controller.extend({



  actions:{

    recieveOrder: function(purchaseorder){
      var controller = this;
      purchaseorder.set('postatus','recieved');
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
      purchaseorder.save(); //TODO : catch function pending
    },
  }
});
