import Ember from 'ember';

export default Ember.Controller.extend({

  reason:'',
  stockadjustmentReason :['Retured From Customer','Damaged','Production'],
  stockadjustmentitems: [],
  actions:{

    selectReason(reason) {
        this.set('reason', reason);
      },

    createStockAdjustment:function(){
      var controller = this;
      var stockadjustment = this.store.createRecord('stockadjustment', {
        customer :this.get('customer'),
        duedate :this.get('duedate'),
        postatus :'created',
        totalunits :this.get('totalunits'),
        totalcost :this.get('totalcost'),
        reason : this.get('reason')
      });

      var templateStockadjustmentitems = controller.get('stockadjustmentitems');
      stockadjustment.save().then(function(stockadjustment){
        controller.set('customer','');
        controller.set('duedate','');
        templateStockadjustmentitems.forEach(function(stockadjustmentitem){
          stockadjustmentitem.set('stockadjustment', stockadjustment);
          stockadjustmentitem.save();
        });
      }).catch(function(){
        controller.notifications.addNotification({
          message: 'Sorry, cant save at the moment !' ,
          type: 'error',
          autoClear: true
        });
      });
      controller.set('stockadjustmentitems' , []);
      controller.transitionToRoute('dashboard.stockcontrol.index');
    },

    cancelStockadjustment:function(){
      this.transitionToRoute('dashboard.stockcontrol.index');
    },

    addNewStockadjustmentItem:function(){
      var controller = this;
      var stockadjustmentitem = controller.store.createRecord('stockadjustmentitem', {
        quantity :1,
        total :'',
        poitemstatus :'',
        recieveddate :'',
        product :controller.get('products').get('firstObject'),
        stockadjustment : controller.get('stockadjustments').get('firstObject'),
      });

      stockadjustmentitem.save().then(function(){
        controller.get('stockadjustmentitems').pushObject(stockadjustmentitem);
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

    deleteStockadjustmentItem:function(stockadjustmentitem){
      var controller = this;
      controller.get('stockadjustmentitems').removeObject(stockadjustmentitem);
       stockadjustmentitem.destroyRecord();
    }

  }
});
