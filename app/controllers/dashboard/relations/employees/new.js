import Ember from 'ember';

export default Ember.Controller.extend({


  isCreateSupplierButtonDisabled: Ember.computed('slno' , 'payroll' , 'name' , 'department' , 'workcontact' , 'personalcontact'  ,  function() {
    if( Ember.isEmpty(this.get('slno')) ||
    Ember.isEmpty(this.get('payroll')) ||
    Ember.isEmpty(this.get('name')) ||
    Ember.isEmpty(this.get('department')) ||
    Ember.isEmpty(this.get('workcontact')) ||
    Ember.isEmpty(this.get('personalcontact'))
  ){return 'disabled';}
  else{return '';}
  }),



  actions:{




    createEmployee: function(){

      var controller = this;

      var employee = this.store.createRecord('employee', {
        slno :this.get('slno'),
        payroll :this.get('payroll'),
        name :this.get('name'),
        department :this.get('department'),
        workcontact :this.get('workcontact'),
        personalcontact :this.get('personalcontact')

      });

      employee.save().then(function(){
        controller.set('slno','');
        controller.set('payroll','');
        controller.set('name','');
        controller.set('department','');
        controller.set('workcontact','');
        controller.set('personalcontact','');
        controller.transitionToRoute('dashboard.relations.employees.employee.view' , employee);
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
