import Ember from 'ember';

export default Ember.Controller.extend({

  reason:'',
  stockadjustmentReason :['Please Select' , 'Returned From Customer','Damaged','Production'],
  soNotsaved:true,



  isCreateCustomerButtonDisabled: Ember.computed('companyname' , 'companycode' , 'chargecode' ,'address1', 'email' , 'phone'  ,  function() {
    if( Ember.isEmpty(this.get('companyname')) ||
    Ember.isEmpty(this.get('companycode')) ||
    Ember.isEmpty(this.get('chargecode')) ||
    Ember.isEmpty(this.get('address1')) ||
    Ember.isEmpty(this.get('email')) ||
    Ember.isEmpty(this.get('phone'))
  ){return 'disabled';}
  else{return '';}
  }),





  actions:{

    selectReason(reason) {
        this.set('stockadjustment.reason', reason);
      },



      initStockadjustment:function(){

        var controller = this;
        var stockadjustment = this.store.createRecord('stockadjustment', {
          customer :controller.get('customers').get('firstObject'),
          duedate :new Date(),
          sastatus :'created',
          totalunits :'',
          totalcost :'',
          reason: this.get('stockadjustment.reason')
        });



        stockadjustment.save().then(function(stockadjustment){

          controller.set('stockadjustment',stockadjustment);


        }).catch(function(){
          controller.notifications.addNotification({
            message: 'Sorry, cant save at the moment !' ,
            type: 'error',
            autoClear: true
          });
        });
      },


    createStockAdjustment:function(){
      var controller = this;


      var stockadjustment = controller.get('stockadjustment');



      stockadjustment.set('totalunits' , stockadjustment.get('computedtotalunits'));
      stockadjustment.set('totalcost' , stockadjustment.get('computedtotalcosts'));


      stockadjustment.save().then(function(stockadjustment){

var stockadjustmentitems = stockadjustment.get('stockadjustmentitems');
        stockadjustmentitems.forEach(function(stockadjustmentitem){
          stockadjustmentitem.save() ;
        });

        controller.notifications.addNotification({
          message: 'Saved !' ,
          type: 'success',
          autoClear: true
        });

      });


      controller.set('soNotsaved' , false);



      controller.transitionToRoute('dashboard.stockcontrol.stockadjustments.index');



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
        controller.set('stockadjustment.customer',newCustomer);

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

    deleteStockadjustmentItem:function(stockadjustmentitem){
      var controller = this;
      controller.get('stockadjustment.items').removeObject(stockadjustmentitem);
       stockadjustmentitem.destroyRecord();
    }

  }
});
