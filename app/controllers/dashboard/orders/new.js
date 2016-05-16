import Ember from 'ember';

export default Ember.Controller.extend({




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




  isCreateOrderButtonDisabled: Ember.computed('customer' , 'duedate' ,  function() {
    if( Ember.isEmpty(this.get('customer')) ||
    Ember.isEmpty(this.get('duedate'))
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


    createOrder:function(){

      var controller = this;

      var order = this.store.createRecord('order', {
        customer :this.get('customer'),
        duedate :this.get('duedate'),
        orderstatus :'created',
        totalunits :this.get('computedOrderTotalUnits'),
        totalcost :this.get('computedOrderTotalCost'),
      });

      var templateOrderitems = controller.get('orderitems');

      order.save().then(function(order){
        controller.set('customer','');
        controller.set('duedate','');

        templateOrderitems.forEach(function(orderitem){
          orderitem.set('order', order);
          orderitem.save() ;
        });


        controller.set('orderitems' , []);
        controller.transitionToRoute('dashboard.orders.order.view' , order);
        console.log("created");
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
console.log(this.get('orders').get('firstObject'));
      var controller = this;
      var orderitem = controller.store.createRecord('orderitem', {
        quantity :1,
        total :'',
        poitemstatus :'',
        product :controller.get('products').get('firstObject'),
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
