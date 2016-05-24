
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
      "propertyName": "workcontact","title": "Workcontact"
    },
    {
      "propertyName": "personalcontact","title": "Personalcontact"
    },
    {
      "title":"View" , "template":"custom/viewemployee"
    },
  ],

});
