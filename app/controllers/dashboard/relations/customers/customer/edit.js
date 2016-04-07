import Ember from 'ember';

export default Ember.Controller.extend({



    isSaveCustomerButtonDisabled: Ember.computed('customer.companyname' , 'customer.companycode' , 'customer.chargecode' , 'customer.email' , 'customer.phone'  ,  function() {
      if( Ember.isEmpty(this.get('customer.companyname')) ||
      Ember.isEmpty(this.get('customer.chargecode')) ||
      Ember.isEmpty(this.get('customer.companycode')) ||
      Ember.isEmpty(this.get('customer.email')) ||
      Ember.isEmpty(this.get('customer.phone'))
    ){return 'disabled';}
    else{return '';}
    }),

    actions:{



          deleteCustomer:function(customer){

            var controller= this;
            customer.destroyRecord().then(function () {
              controller.notifications.addNotification({
                message: 'Customer Deleted!' ,
                type: 'success',
                autoClear: true
              });





              controller.transitionToRoute('dashboard.relations.index');

            }).catch(function () {
              customer.rollbackAttributes();
              controller.notifications.addNotification({
                message: 'Customer cannot be deleted. This agent may be assigned to some project!' ,
                type: 'error',
                autoClear: true
              });
            });

          },
          saveCustomer:function(){
            var controller = this;
            var currentCustomer = this.get('customer');

            currentCustomer.save().then(function(){
              controller.notifications.addNotification({
                message: 'Customer Saved!' ,
                type: 'success',
                autoClear: true
              });
            }).catch(function(){
              controller.notifications.addNotification({
                message: 'Sorry, cant save at the moment !' ,
                type: 'error',
                autoClear: true
              });
            });


          }
    }
});
