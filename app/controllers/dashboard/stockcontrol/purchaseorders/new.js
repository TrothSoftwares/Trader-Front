import Ember from 'ember';

export default Ember.Controller.extend({

  purchaseorder: '',
  poNotsaved:true,

  isSupplierButtonDisabled: Ember.computed('companyname' , 'companycode' , 'chargecode' , 'email' , 'phone'  ,  function() {
    if( Ember.isEmpty(this.get('companyname')) ||
    Ember.isEmpty(this.get('companycode')) ||
    Ember.isEmpty(this.get('chargecode')) ||
    Ember.isEmpty(this.get('email')) ||
    Ember.isEmpty(this.get('phone'))
  ){return 'disabled';}
  else{return '';}
  }),

  actions:{





    initPurchaseOrder:function(){

      var controller = this;
      var purchaseorder = this.store.createRecord('purchaseorder', {
        supplier :controller.get('suppliers').get('firstObject'),
        duedate :new Date(),
        postatus :'created',
        totalunits :'',
        totalcost :'',
      });



      purchaseorder.save().then(function(purchaseorder){

        controller.set('purchaseorder',purchaseorder);


      }).catch(function(){
        controller.notifications.addNotification({
          message: 'Sorry, cant save at the moment !' ,
          type: 'error',
          autoClear: true
        });
      });
    },



    createPurchaseOrder:function(){

      var controller = this;
      var purchaseorder = controller.get('purchaseorder');

      purchaseorder.set('totalunits' , purchaseorder.get('computedtotalunits'));
      purchaseorder.set('totalcost' , purchaseorder.get('computedtotalcosts'));

      purchaseorder.save().then(function(purchaseorder){
        controller.set('supplier','');
        controller.set('duedate','');

        var purchaseorderitems = purchaseorder.get('purchaseorderitems');
        purchaseorderitems.forEach(function(purchaseorderitem){
          purchaseorderitem.save() ;
        });

        controller.notifications.addNotification({
          message: 'Saved !' ,
          type: 'success',
          autoClear: true
        });
      });

      controller.set('poNotsaved' , false);
      controller.transitionToRoute('dashboard.stockcontrol.purchaseorders.index');
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
        purchaseorder : controller.get('purchaseorder'),
      });

      purchaseorderitem.save().then(function(){
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
        companycode :this.get('companycode'),
        chargecode :this.get('chargecode'),
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
        controller.set('companycode','');
        controller.set('chargecode','');
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
        controller.set('purchaseorder.supplier',newsupplier);
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
      controller.get('purchaseorder.items').removeObject(purchaseorderitem);
      purchaseorderitem.destroyRecord();
    }

  }
});
