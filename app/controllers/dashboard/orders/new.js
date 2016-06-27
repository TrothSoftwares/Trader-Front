import Ember from 'ember';

export default Ember.Controller.extend({


  ajax: Ember.inject.service(),



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




isCreateOrderButtonDisabled: Ember.computed('customer' ,  function() {
  if( Ember.isEmpty(this.get('customer'))
){return 'disabled';}
else{return '';}
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




computedOrderTotalCost: Ember.computed('orderitems.@each.computedtotal', function() {

  var orderitems = this.get('orderitems');
  if(orderitems){

    var ret =0;
    orderitems.forEach(function(orderitem){
      ret += orderitem.get('computedtotal');
    });
    return ret;
  }
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
      totalcost :this.get('computedOrderTotalCost'),
    });

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
      controller.set('approvedby','');

      templateOrderitems.forEach(function(orderitem){
        orderitem.set('order', order);
        orderitem.save() ;
      });


      controller.set('orderitems' , []);
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
