
import Ember from 'ember';

export default Ember.Controller.extend({

  employeeColumns: [
    {
      "propertyName": "id", "title": "Payroll"
    },
    {
      "propertyName": "name","title": "Employee Name"
    },
    {
      "title":"View" , "template":"custom/viewtracktooltool"
    },
  ],

});
