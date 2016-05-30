
import Ember from 'ember';

export default Ember.Controller.extend({

  employeeColumns: [
    {
      "propertyName": "slno", "title": "Sl.No"
    },
    {
      "propertyName": "payroll","title": "Payroll"
    },
    {
      "propertyName": "name","title": "Name"
    },
    {
      "propertyName": "department","title": "Department"
    },
    {
      "propertyName": "workcontact","title": "Work Contact"
    },
    {
      "propertyName": "personalcontact","title": "Personal Contact"
    },
    {
      "title":"View" , "template":"custom/viewemployee"
    },
  ],

});
