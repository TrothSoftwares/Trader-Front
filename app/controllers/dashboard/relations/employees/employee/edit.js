import Ember from 'ember';

export default Ember.Controller.extend({


  isSaveEmployeeButtonDisabled: Ember.computed('employee.slno' , 'employee.name' , 'employee.payroll' , 'employee.department' , 'employee.workcontact' , 'employee.personalcontact'  ,  function() {
    if( Ember.isEmpty(this.get('employee.slno')) ||
    Ember.isEmpty(this.get('employee.name')) ||
    Ember.isEmpty(this.get('employee.payroll')) ||
    Ember.isEmpty(this.get('employee.department')) ||
    Ember.isEmpty(this.get('employee.workcontact')) ||
    Ember.isEmpty(this.get('employee.personalcontact'))
  ){return 'disabled';}
  else{return '';}
  }),



  actions:{

    deleteEmployee:function(employee){

      var controller= this;
      employee.destroyRecord().then(function () {
        controller.notifications.addNotification({
          message: 'Employee Deleted!' ,
          type: 'success',
          autoClear: true
        });
        controller.transitionToRoute('dashboard.relations.employees.index');
      }).catch(function () {
        employee.rollbackAttributes();
        controller.notifications.addNotification({
          message: 'Employee cannot be deleted. !' ,
          type: 'error',
          autoClear: true
        });
      });

    },


    saveEmployee:function(){
      var controller = this;
      var currentEmployee = this.get('employee');

      currentEmployee.save().then(function(){
        controller.notifications.addNotification({
          message: 'Employee Saved!' ,
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
