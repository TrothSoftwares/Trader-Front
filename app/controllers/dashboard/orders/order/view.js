import Ember from 'ember';

export default Ember.Controller.extend({

inputFormat:'DD/MM/YYYY',
actions:{


  deliverOrder: function(order){
    var controller = this;
    var d = new Date();
    order.set('orderstatus','delivered');
    order.set('issuancedate',d);
    var orderitems= order.get('orderitems');
    orderitems.forEach(function(orderitem){
      var orderitemquantity = orderitem.get('quantity');
      var orderitemproduct = orderitem.get('product');
       controller.store.findRecord('product',orderitemproduct.get('id')).then(function(product){
         var initialstocklevel = product.get('initialstocklevel');
      product.set('initialstocklevel' , initialstocklevel - orderitemquantity);
      product.save();
    });
    });
    order.save(); //TODO : catch function pending
  },
  printOrder:function(){
    window.print();
  }
}

});
