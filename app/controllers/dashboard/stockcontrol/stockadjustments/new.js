import Ember from 'ember';

export default Ember.Controller.extend({

  reason:'',
  order:'',




  computedStockAdjustmentTotalUnits: Ember.computed('order.orderitems.@each.quantity', function() {
    var order = this.get('order');
    if(order){
      var orderitems = this.get('order').get('orderitems');
      var ret = 0;
      orderitems.forEach(function(orderitem){
        ret += parseInt(orderitem.get('quantity'));
      });
      return ret;
    }
  }),




  computedStockAdjustmentTotalCost: Ember.computed('order.orderitems.@each.computedtotal', function() {
    var order = this.get('order');
    if(order){
      var orderitems = this.get('order').get('orderitems');
      var ret =0;
      orderitems.forEach(function(orderitem){
        ret += orderitem.get('computedtotal');
      });
      return ret;
    }
  }),



  isCreateStockadjustmentButtonDisabled: Ember.computed('reason' , 'order' ,  function() {
    if( Ember.isEmpty(this.get('reason')) ||
    Ember.isEmpty(this.get('order'))
  ){return 'disabled';}
  else{return '';}
}),



actions:{


  createStockAdjustment:function(){
    var controller = this;

    var stockadjustment = this.store.createRecord('stockadjustment', {
      customer :controller.get('order').get('customer'),
      duedate :new Date(),
      sastatus :'created',
      totalunits :this.get('computedStockAdjustmentTotalUnits'),
      totalcost :this.get('computedStockAdjustmentTotalCost'),
      reason: this.get('reason'),
      order: controller.get('order')
    });


    stockadjustment.save().then(function(stockadjustment){

      var orderitems = controller.get('order.orderitems');

      orderitems.forEach(function(orderitem){
        var stockadjustmentitem = controller.store.createRecord('stockadjustmentitem', {
          quantity :orderitem.get('quantity'),
          total :orderitem.get('total'),
          product :orderitem.get('product'),
          stockadjustment : stockadjustment,
        });

        stockadjustmentitem.save();
      });



controller.set('reason','');
controller.set('order','');
controller.transitionToRoute('dashboard.stockcontrol.stockadjustments.stockadjustment.view' , stockadjustment);



    }).catch(function(){
      controller.notifications.addNotification({
        message: 'Sorry, cant save at the moment !' ,
        type: 'error',
        autoClear: true
      });
    });



  },

  cancelStockadjustment:function(){
    this.transitionToRoute('dashboard.stockcontrol.stockadjustments.index');
    return false;
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

    }).catch(function(){
      controller.notifications.addNotification({
        message: 'Sorry, cant save at the moment !' ,
        type: 'error',
        autoClear: true
      });
    });
  },



  deleteStockadjustmentItem:function(orderitem){
    var controller = this;
    controller.get('order.orderitems').removeObject(orderitem);
  }

}
});
