import Ember from 'ember';

export default Ember.Controller.extend({

natures :["Select","Electrical", "Plumbing" , "Masonry" , "Telephone","Painting","Carpentry", "Welding","A/C"],
inputFormat:'DD/MM/YYYY',

ajax: Ember.inject.service(),


computedOrderTotalUnits: Ember.computed('orderitems.@each.quantity', function() {

  var orderitems = this.get('orderitems');
  if(orderitems){
    var ret = 0;
    orderitems.forEach(function(orderitem){
      ret += parseInt(orderitem.get('quantity'));
    });
    return ret;
  }
}),




computedOrderTotalAmount: Ember.computed('order.orderitems.@each.computedtotalvalue', function() {
  var orderitems = this.get('order.orderitems');
  if(orderitems){
    var ret =0;
    orderitems.forEach(function(orderitem){
      ret += orderitem.get('computedtotalvalue');
    });
    return ret;
  }
  else{
    return 0;
  }
}),


computedAmountChargable: Ember.computed( 'computedOrderTotalAmount','order.roundoff', function() {

  let computedtotal = parseFloat(this.get('computedOrderTotalAmount')) - parseFloat(this.get('order.roundoff')) ;

  return Math.round(computedtotal);
}),




actions:{



  selectOrderitem( orderitem , selected){
    orderitem.set('isSearchBarOpen',false);
    return this.store.findRecord('product', selected.id).then(product => orderitem.set('product', product));
  },


  searchProduct( orderitem , term ) {

    orderitem.set('isSearchBarOpen',true);
    if (Ember.isBlank(term)) { return []; }
    const url = `/products?direction=asc&page=1&productname=${term}`;
    return this.get('ajax').request(url).then(json=>json.data);
  },


  selectNature(nature) {
    this.set('natureofwork', nature);
  },


      deleteOrder:function(order){

        var controller = this;
        var confirm = window.confirm("Are you sure you want to delete?");
        if (confirm) {
          order.destroyRecord().then(function(){
            controller.transitionToRoute('dashboard.orders.index');
            controller.notifications.addNotification({
              message: 'Order deleted successfully' ,
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


  draftOrder: function(){
    var controller = this;

    var order = this.get('order');

    var orderitems = order.get('orderitems');

    orderitems.forEach(function(orderitem){
      orderitem.set('total',orderitem.get('computedtotal'));
      orderitem.set('grossvalue',orderitem.get('computedgrosstotal'));
      orderitem.set('nettaxablevalue',orderitem.get('computednettaxablevalue'));
      orderitem.set('tax',orderitem.get('computedtax'));
      orderitem.set('totalvalue',orderitem.get('computedtotalvalue'));
      orderitem.save();
    });

    order.set('totalunits' , order.get('computedtotalunits'));
    order.set('chargableamount',controller.get('computedAmountChargable'));
    order.set('totalcost',controller.get('computedOrderTotalAmount'));


    order.save().then(function(){
      controller.notifications.addNotification({
        message: 'Saved' ,
        type: 'success',
        autoClear: true
      });
    });

  },

  deleteOrderItem:function(orderitem){
     orderitem.destroyRecord();
  },


  addNewOrderItem:function(){
    var controller = this;
    var orderitem = controller.store.createRecord('orderitem', {
      quantity :1,
      rateoftax:0,
      exciseduty:0,
      cashdiscount:0,
      total :'',
      order : controller.get('order'),
    });

    orderitem.save().then(function(){

    });
  },

  cancelOrder:function(order){


    this.transitionToRoute('dashboard.orders.order.view' , order);
  },

}


});
