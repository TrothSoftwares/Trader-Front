import Ember from 'ember';

export default Ember.Controller.extend({


  ajax: Ember.inject.service(),

createOrderPerformed: false,
roundoff:0,
rateofdiscount:0,


  natures :["Select","Electrical", "Plumbing" , "Masonry" , "Telephone","Painting","Carpentry", "Welding","A/C"],

  orderitems: [],

  isCreateCustomerButtonDisabled: Ember.computed('companyname' , 'companycode' , 'chargecode' , 'email' , 'phone'  ,  function() {
    if( Ember.isEmpty(this.get('companyname')) ||
    Ember.isEmpty(this.get('companycode')) ||
    Ember.isEmpty(this.get('chargecode')) ||
    Ember.isEmpty(this.get('email')) ||
    Ember.isEmpty(this.get('phone'))
  ){return 'disabled';}
  else{return '';}
}),




isCreateOrderButtonDisabled: Ember.computed('customer' ,'createOrderPerformed',  function() {
  if( Ember.isEmpty(this.get('customer'))||
  (this.get('createOrderPerformed') === true)
){return 'disabled';}
else{return '';}
}),



computedroundoff: Ember.computed('rateofdiscount' , 'computedOrderTotalAmount', function() {
  let computedOrderTotalAmount  = this.get('computedOrderTotalAmount');
  let rateofdiscount = this.get('rateofdiscount');
  let computedroundoff = (rateofdiscount /100 ) * parseFloat(computedOrderTotalAmount);
  return computedroundoff.toFixed(2);
}),




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




computedOrderTotalAmount: Ember.computed('orderitems.@each.computedtotalvalue', function() {
  var orderitems = this.get('orderitems');
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


computedAmountChargable: Ember.computed( 'computedOrderTotalAmount','computedroundoff', function() {

  let computedtotal = parseFloat(this.get('computedOrderTotalAmount')) - parseFloat(this.get('computedroundoff')) ;

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




  createOrder:function(){


    var controller = this;
    controller.set('createOrderPerformed',true);
    var d = new Date();

    var order = this.store.createRecord('order', {
      employee :this.get('employee'),  // instead of issuedby
      customer :this.get('customer'),  // instead of issuedby
      requestedby :this.get('requestedby'),
      approvedby :this.get('approvedby'),
      natureofwork :this.get('natureofwork'),
      mrf :this.get('mrf'),
      location :this.get('location'),
      issuancedate :this.get('issuancedate'),
      orderstatus :'created',
      totalunits :this.get('computedOrderTotalUnits'),
       chargableamount :this.get('computedAmountChargable'),
      roundoff :this.get('computedroundoff'),
      totalcost :this.get('computedOrderTotalAmount'),
      duedate:d,
    });


    // console.log("order is saved");
    var customer = controller.get('customer');
    // console.log("customer:" + customer.get('id'));
    var due = customer.get('due');
    // console.log("due:" + due);
    var chargableamount = controller.get('computedAmountChargable');

    // console.log("computedtotalorderamount:" + controller.get('computedAmountChargable')  );

    due = parseFloat(due) + parseFloat(chargableamount);
// console.log("newdue:" + due);
    customer.set('due',due);

    customer.save();

    var templateOrderitems = controller.get('orderitems');

    order.save().then(function(order){



      controller.set('customer','');
      controller.set('issuancedate','');
      controller.set('supplier','');
      controller.set('employee','');
      controller.set('natureofwork','');
      controller.set('mrf','');
      controller.set('location','');
      controller.set('duedate','');
      controller.set('requestedby','');
      controller.set('roundoff','');
      controller.set('totalcost','');




      templateOrderitems.forEach(function(orderitem){
        orderitem.set('order', order);
        orderitem.set('total',orderitem.get('computedtotal'));
        orderitem.set('grossvalue',orderitem.get('computedgrosstotal'));
        orderitem.set('nettaxablevalue',orderitem.get('computednettaxablevalue'));
        orderitem.set('tax',orderitem.get('computedtax'));
        orderitem.set('totalvalue',orderitem.get('computedtotalvalue'));
        orderitem.save() ;
      });


      controller.set('orderitems' , []);
      controller.set('createOrderPerformed',false);
      controller.transitionToRoute('dashboard.orders.order.view' , order);
    }).catch(function(){
     controller.notifications.addNotification({
       message: 'Sorry, cant save at the moment !' ,
       type: 'error',
       autoClear: true
     });
   });





  },



  cancelOrder:function(){
    this.transitionToRoute('dashboard.orders.index');
  },




  addNewOrderItem:function(){
    var controller = this;
    var orderitem = controller.store.createRecord('orderitem', {
      quantity :1,
      rateoftax:0,
      exciseduty:0,
      cashdiscount:0,
      total :'',
      poitemstatus :'',
      order : controller.get('orders').get('firstObject'),
    });

    orderitem.save().then(function(){
      controller.get('orderitems').pushObject(orderitem);
    }).catch(function(){
      controller.notifications.addNotification({
        message: 'Sorry, cant save at the moment !' ,
        type: 'error',
        autoClear: true
      });
    });
  },

  openCustomerModal: function(){
    Ember.$('.ui.newcustomer.modal')
    .modal('show')
    ;
  },




  createCustomer: function(){

    var controller = this;

    var newCustomer = this.store.createRecord('customer', {
      companyname :this.get('companyname'),
      companycode :this.get('companycode'),
      chargecode :this.get('chargecode'),
      email :this.get('email'),
      address1 :this.get('address1'),
      address2 :this.get('address2'),
      suburb :this.get('suburb'),
      city : this.get('city'),
      state :this.get('state'),
      country :this.get('country'),
      zipcode :this.get('zipcode'),
      phone :this.get('phone'),
    });

    newCustomer.save().then(function(){
      controller.set('companyname','');
      controller.set('companycode','');
      controller.set('chargecode','');
      controller.set('email','');
      controller.set('address1','');
      controller.set('address2','');
      controller.set('suburb','');
      controller.set('city','');
      controller.set('country','');
      controller.set('zipcode','');
      controller.set('phone','');


      controller.get('customers').pushObject(newCustomer._internalModel);
      controller.set('customer',newCustomer);

      Ember.$('.ui.newcustomer.modal')
      .modal('hide')
      ;



    }).catch(function(){
      controller.notifications.addNotification({
        message: 'Sorry, cant save at the moment !' ,
        type: 'error',
        autoClear: true
      });
    });




  },

  deleteOrderitem:function(orderitem){
    var controller = this;
    controller.get('orderitems').removeObject(orderitem);
    orderitem.destroyRecord();
  }

}
});
