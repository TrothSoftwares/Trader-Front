import Ember from 'ember';

export default Ember.Controller.extend({

  reason:'',
  stockadjustmentReason :['Please Select' , 'Returned From Customer','Damaged','Production'],
  soNotsaved:true,



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

      var stockadjustment = this.store.createRecord('stockadjustment', {
        customer :controller.get('order').get('customer'),
        duedate :new Date(),
        sastatus :'created',
        totalunits :'',
        totalcost :'',
        reason: this.get('reason'),
        order: controller.get('order')
      });




              stockadjustment.save().then(function(stockadjustment){

                var orderitems = controller.get('order.orderitems');

                orderitems.forEach(function(orderitem){
                  var stockadjustmentitem = controller.store.createRecord('stockadjustmentitem', {
                    quantity :orderitem.get('quantity'),
                    total :orderitem.get('total'),
                    product :orderitem.get('product'),
                    stockadjustment : stockadjustment,
                  });

                    stockadjustmentitem.save();
                });





              }).catch(function(){
                controller.notifications.addNotification({
                  message: 'Sorry, cant save at the moment !' ,
                  type: 'error',
                  autoClear: true
                });
              });


//
//
//       var stockadjustment = controller.get('stockadjustment');
//
//
//
//       stockadjustment.set('totalunits' , stockadjustment.get('computedtotalunits'));
//       stockadjustment.set('totalcost' , stockadjustment.get('computedtotalcosts'));
//
//
//       stockadjustment.save().then(function(stockadjustment){
//
// var stockadjustmentitems = stockadjustment.get('stockadjustmentitems');
//         stockadjustmentitems.forEach(function(stockadjustmentitem){
//           stockadjustmentitem.save() ;
//         });
//
//         controller.notifications.addNotification({
//           message: 'Saved !' ,
//           type: 'success',
//           autoClear: true
//         });
//
//       });
//
//
//       controller.set('soNotsaved' , false);
//
//
//
//       controller.transitionToRoute('dashboard.stockcontrol.stockadjustments.index');
//


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








    deleteStockadjustmentItem:function(stockadjustmentitem){
      var controller = this;
      controller.get('stockadjustment.items').removeObject(stockadjustmentitem);
       stockadjustmentitem.destroyRecord();
    }

  }
});
