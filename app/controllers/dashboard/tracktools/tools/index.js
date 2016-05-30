import Ember from 'ember';

export default Ember.Controller.extend({

  toolColumns: [
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
