import Ember from 'ember';

export default Ember.Controller.extend({

  customerColumns: [
    {
      "propertyName": "id", "title": "Sl.No"
    },
    {
      "propertyName": "companycode","title": "Company Code"
    },
    {
      "propertyName": "companyname","title": "Company Name"
    },
    {
      "propertyName": "email","title": "Email"
    },
    {
      "propertyName": "phone","title": "Phone"
    },
    {
      "title":"View" , "template":"custom/viewcustomer"
    },
  ],
});
