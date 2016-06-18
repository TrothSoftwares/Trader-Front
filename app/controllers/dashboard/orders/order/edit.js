import Ember from 'ember';

export default Ember.Controller.extend({

natures :["Select","Electrical", "Plumbing" , "Masonry" , "Telephone"],

ajax: Ember.inject.service(),

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
      orderitem.save();
    });

    order.set('totalunits' , order.get('computedtotalunits'));
    order.set('totalcost' , order.get('computedtotalcosts'));
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
      total :'',
      poitemstatus :'',
      product :controller.get('products').get('firstObject'),
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
