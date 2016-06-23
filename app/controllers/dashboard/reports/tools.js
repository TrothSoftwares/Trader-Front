import Ember from 'ember';
import groupBy from 'ember-group-by';

export default Ember.Controller.extend({

employee:'',
inputFormat:'MM/DD/YYYY',


filteredtools: groupBy('tools', 'employee.name'),



  filteredEmployees: Ember.computed('employee', 'startdate' , 'enddate', function() {

    var employees = this.get('employees');
    var start = this.get('startdate');
    var end = this.get('enddate');
    var employee = this.get('employee');
    console.log(employee);

    if(employee){
      employees = employees.filter(function(emp){
        return emp.get('name') === employee.get('name');
      });
    }


    // if(start && end) {
    //   var startDate = new Date(start),
    //   endDate       = new Date(end);
    //   return employees.filter(function (emp) {
    //     return (emp.get('')get('duedate') >= startDate) && (order.get('duedate') <= endDate);
    //   });
    // }
    return employees;

  }),


});
