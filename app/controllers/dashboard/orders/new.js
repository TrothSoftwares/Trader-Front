import Ember from 'ember';

export default Ember.Controller.extend({


  order: '',
  orderNotsaved:true,

  isCreateCustomerButtonDisabled: Ember.computed('companyname' , 'companycode' , 'chargecode' , 'email' , 'phone'  ,  function() {
    if( Ember.isEmpty(this.get('companyname')) ||
    Ember.isEmpty(this.get('companycode')) ||
    Ember.isEmpty(this.get('chargecode')) ||
    Ember.isEmpty(this.get('email')) ||
    Ember.isEmpty(this.get('phone'))
  ){return 'disabled';}
  else{return '';}
}),
  actions:{




    initOrder:function(){

      var controller = this;
      var order = this.store.createRecord('order', {
        customer :controller.get('customers').get('firstObject'),
        duedate :new Date(),
        orderstatus :'created',
        totalunits :'',
        totalcost :'',
      });

      order.save().then(function(order){
        controller.set('order',order);


      }).catch(function(){
        controller.notifications.addNotification({
          message: 'Sorry, cant save at the moment !' ,
          type: 'error',
          autoClear: true
        });
      });
    },




        createOrder:function(){

          var controller = this;
          var order = controller.get('order');

          order.set('totalunits' , order.get('computedtotalunits'));
          order.set('totalcost' , order.get('computedtotalcosts'));

          order.save().then(function(order){


            var orderitems = order.get('orderitems');
            orderitems.forEach(function(orderitems){
              orderitems.save() ;
            });

            controller.notifications.addNotification({
              message: 'Saved !' ,
              type: 'success',
              autoClear: true
            });
          });

          controller.set('orderNotsaved' , false);
          controller.transitionToRoute('dashboard.orders.index');
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
        product :controller.get('products').get('firstObject'),
        order : controller.get('order'),
      });

      orderitem.save().then(function(){

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
        controller.set('order.customer',newCustomer);

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

    deleteOrderItem:function(orderitem){
      var controller = this;
      controller.get('orderitems').removeObject(orderitem);
       orderitem.destroyRecord();
    }

  }
});
