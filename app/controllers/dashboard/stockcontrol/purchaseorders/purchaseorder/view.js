import Ember from 'ember';

export default Ember.Controller.extend({

  ajax: Ember.inject.service(),
  inputFormat:'MM/DD/YYYY',
  booleanTrue: true,

  purchaseorderStatusBoolean: function(){

    var purchaseorder = this.get('purchaseorder');
    if(purchaseorder.get('postatus') === 'created'){
      return false;
    }
    if(purchaseorder.get('postatus') === 'received'){
      return true;
    }

  }.property('purchaseorder.postatus'),





  actions:{





    sendMail:function(purchaseorder){
      return this.get('ajax').request('/mailorder', {
        method: 'GET',
        data: {
          id: purchaseorder.id
        }
      });
    },


    revertOrder: function(purchaseorder){


      var confirm = window.confirm(" Warning !! \n If the prices are adjusted while recieving order, Prices will not be reverted. If you need to revert the price ,Go to Inventory->product->Edit ");
      if (confirm) {
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
        purchaseorder.save();
        location.reload();
      }
    },





    showRecieveAllModal:function(){
      Ember.$('.small.modal').modal('hide');
      Ember.$('.modal.large.entercost').modal('show');
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


          product.set('initialstocklevel' , initialstocklevel + purchaseorderitemquantity); // adding new stocks


          var newitemcost = parseInt(product.get('newitemcost'));



          var retailprice = product.get('retailprice');
          var newretailprice = (parseInt(retailprice) + parseInt(newitemcost))/2;


            if(!isNaN(newitemcost)){
          if(parseInt(retailprice) !== parseInt(newitemcost)){
            product.set('retailprice',newretailprice);
            product.set('buyprice', newitemcost);
            product.set('initialcostprice', retailprice);
          }
        }
          product.save();
        });

        purchaseorderitem.set('total',purchaseorderitem.get('computedNewItemCostTotal'));
        purchaseorderitem.save();

      });

      purchaseorder.set('totalunits' , purchaseorder.get('computedtotalunits'));
      purchaseorder.set('totalcost' , purchaseorder.get('computedNewItemCostTotalCosts'));

      purchaseorder.save().then(function(){
        Ember.$('.modal.large.entercost').modal('hide');
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
    },

    printOrder:function(){
      window.print();
    }
  }
});
