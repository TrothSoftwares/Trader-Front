import Ember from 'ember';

export default Ember.Controller.extend({



  stockadjustmentReason :['Retured From Customer','Damaged','Production'],

actions:{



  recieveStock: function(stockadjustment){
    var controller = this;
    stockadjustment.set('sastatus','recieved');
    var stockadjustmentitems= stockadjustment.get('stockadjustmentitems');
    stockadjustmentitems.forEach(function(stockadjustmentitem){
      var stockadjustmentitemquantity = stockadjustmentitem.get('quantity');
      var stockadjustmentitemproduct = stockadjustmentitem.get('product');
       controller.store.findRecord('product',stockadjustmentitemproduct.get('id')).then(function(product){
         var initialstocklevel = product.get('initialstocklevel');
      product.set('initialstocklevel' , initialstocklevel + stockadjustmentitemquantity);
      product.save();
    });
    });
    stockadjustment.save(); //TODO : catch function pending
  },

      deleteStockAdjustment:function(stockadjustment){

        var controller = this;
        var confirm = window.confirm("Are you sure you want to delete?");
        if (confirm) {
          stockadjustment.destroyRecord().then(function(){
            controller.transitionToRoute('dashboard.stockcontrol.index');
            controller.notifications.addNotification({
              message: 'Stock Adjustment deleted successfully' ,
              type: 'success',
              autoClear: true
            });
          }).catch(function(){
            controller.notifications.addNotification({
              message: 'Sorry some thing went wrong!' ,
              type: 'error',
              autoClear: true
            });
          });
        }

      },

  selectReason(reason) {
      this.get('stockadjustment').set('reason', reason);
    },

  draftStockAdjustment: function(){
    var controller = this;

    var stockadjustment = this.get('stockadjustment');

    var stockadjustmentitems = stockadjustment.get('stockadjustmentitems');

    stockadjustmentitems.forEach(function(stockadjustmentitem){
      stockadjustmentitem.set('total',stockadjustmentitem.get('computedtotal'));
      stockadjustmentitem.save();

    });

    stockadjustment.set('totalunits' , stockadjustment.get('computedtotalunits'));
    stockadjustment.set('totalcost' , stockadjustment.get('computedtotalcosts'));
    stockadjustment.save().then(function(){
      controller.notifications.addNotification({
        message: 'Saved' ,
        type: 'success',
        autoClear: true
      });
    }).catch(function(){
      controller.notifications.addNotification({
        message: 'Sorry some thing went wrong!' ,
        type: 'error',
        autoClear: true
      });
    });

  },

  deleteStockadjustmentItem:function(stockadjustmentitem){
     stockadjustmentitem.destroyRecord();
  },


  addNewStockadjustmentItem:function(){
    var controller = this;
    var stockadjustmentitem = controller.store.createRecord('stockadjustmentitem', {
      quantity :1,
      total :'',
      poitemstatus :'',
      recieveddate :'',
      product :controller.get('products').get('firstObject'),
      stockadjustment : controller.get('stockadjustment'),
    });

    stockadjustmentitem.save().then(function(){

    });
  },
  cancelStockAdjustment:function(){
    this.transitionToRoute('dashboard.stockcontrol.index');
  },

}


});
