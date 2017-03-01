import Ember from 'ember';

export default Ember.Controller.extend({


  isCreateCustomerButtonDisabled: Ember.computed('companyname' ,  'email' , 'phone'  ,  function() {
    if( Ember.isEmpty(this.get('companyname')) ||
    Ember.isEmpty(this.get('email')) ||
    Ember.isEmpty(this.get('phone'))
  ){return 'disabled';}
  else{return '';}
}),






chargecodes :  Ember.computed.mapBy('customers', 'chargecode'),
validChargecodeMessage: '',
validChargecodeError:'',

companycodes :  Ember.computed.mapBy('customers', 'companycode'),
validCompanycodeMessage: '',
validCompanycodeError:'',


  actions:{



        validChargecode: function(chargecode){
          var chargecodes = this.get('chargecodes');
          if(chargecodes.indexOf(chargecode)!== -1)
          {
            this.set('validChargecodeMessage' , 'Charge Code Already Exists');
            this.set('validChargecodeError' , 'error');
          }
          else{
            this.set('validChargecodeMessage' , '');
            this.set('validChargecodeError' , '');
          }
        },
        validCompanycode: function(companycode){
          var companycodes = this.get('companycodes');
          if(companycodes.indexOf(companycode)!== -1)
          {
            this.set('validCompanycodeMessage' , 'Company Code Already Exists');
            this.set('validCompanycodeError' , 'error');
          }
          else{
            this.set('validCompanycodeMessage' , '');
            this.set('validCompanycodeError' , '');
          }
        },

    createCustomer: function(){

      var controller = this;

      var customer = this.store.createRecord('customer', {
        companyname :this.get('companyname'),
        email :this.get('email'),
        address1 :this.get('address1'),
        tin : this.get('tin'),
        phone :this.get('phone'),
      });

      customer.save().then(function(){
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
        controller.transitionToRoute('dashboard.relations.customers.customer.view' , customer);
      }).catch(function(){
        controller.notifications.addNotification({
          message: 'Sorry, cant save at the moment !' ,
          type: 'error',
          autoClear: true
        });
      });




    },
  }
});
