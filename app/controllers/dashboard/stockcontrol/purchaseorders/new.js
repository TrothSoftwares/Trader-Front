import Ember from 'ember';

export default Ember.Controller.extend({

  purchaseorderitems: [],

  actions:{

    createPurchaseOrder:function(){

      var controller = this;

      var purchaseorder = this.store.createRecord('purchaseorder', {
        supplier :this.get('supplier'),
        duedate :this.get('duedate'),
        postatus :'created',
        totalunits :'',
        totalcost :'',
      });

      var templatePurchaseorderitems = controller.get('purchaseorderitems');

      purchaseorder.save().then(function(purchaseorder){
        controller.set('supplier','');
        controller.set('duedate','');

        templatePurchaseorderitems.forEach(function(purchaseorderitem){
          purchaseorderitem.set('purchaseorder', purchaseorder);
          purchaseorderitem.save() ;
        });


        controller.set('purchaseorderitems' , []);
        controller.transitionToRoute('dashboard.stockcontrol.purchaseorders.purchaseorder.view' , purchaseorder);
      }).catch(function(){
        controller.notifications.addNotification({
          message: 'Sorry, cant save at the moment !' ,
          type: 'error',
          autoClear: true
        });
      });
    },


    cancelPurchaseOrder:function(){
      this.transitionToRoute('dashboard.stockcontrol.purchaseorders.index');
    },

    addNewPurchaseOrderItem:function(){
      var controller = this;
      var purchaseorderitem = controller.store.createRecord('purchaseorderitem', {
        quantity :1,
        total :'',
        poitemstatus :'',
        recieveddate :'',
        product :controller.get('products').get('firstObject'),
        purchaseorder : controller.get('purchaseorders').get('firstObject'),
      });

      purchaseorderitem.save().then(function(){
        controller.get('purchaseorderitems').pushObject(purchaseorderitem);
      }).catch(function(){
        controller.notifications.addNotification({
          message: 'Sorry, cant save at the moment !' ,
          type: 'error',
          autoClear: true
        });
      });

    },

    openSupplierModal: function(){
      Ember.$('.ui.newsupplier.modal')
      .modal('show')
      ;
    },

    createSupplier: function(){

      var controller = this;
      var newsupplier = this.store.createRecord('supplier', {
        companyname :this.get('companyname'),
        email :this.get('email'),
        address1 :this.get('address1'),
        address2 :this.get('address2'),
        suburb :this.get('suburb'),
        city :this.get('city'),
        state :this.get('state'),
        country : this.get('country'),
        zipcode :this.get('zipcode')
      });

      newsupplier.save().then(function(){
        controller.set('companyname','');
        controller.set('email','');
        controller.set('address1','');
        controller.set('address2','');
        controller.set('suburb','');
        controller.set('city','');
        controller.set('state','');
        controller.set('country','');
        controller.set('zipcode','');
        controller.set('phone','');

        controller.get('suppliers').pushObject(newsupplier._internalModel);
        controller.set('supplier',newsupplier);
        Ember.$('.ui.newsupplier.modal')
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

    deletePurchaseorderitem:function(purchaseorderitem){

      var controller = this;
      controller.get('purchaseorderitems').removeObject(purchaseorderitem);
       purchaseorderitem.destroyRecord();
    }

  }
});
