import Ember from 'ember';

export default Ember.Controller.extend({


  isCreateSupplierButtonDisabled: Ember.computed('companyname' , 'companycode' , 'chargecode' , 'email' , 'phone'  ,  function() {
    if( Ember.isEmpty(this.get('companyname')) ||
    Ember.isEmpty(this.get('companycode')) ||
    Ember.isEmpty(this.get('chargecode')) ||
    Ember.isEmpty(this.get('email')) ||
    Ember.isEmpty(this.get('phone'))
  ){return 'disabled';}
  else{return '';}
  }),

  chargecodes :  Ember.computed.mapBy('suppliers', 'chargecode'),
  validChargecodeMessage: '',
  validChargecodeError:'',

  companycodes :  Ember.computed.mapBy('suppliers', 'companycode'),
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

    createSupplier: function(){

      var controller = this;

      var supplier = this.store.createRecord('supplier', {
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

      supplier.save().then(function(){
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
        controller.transitionToRoute('dashboard.relations.suppliers.supplier.view' , supplier);
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
