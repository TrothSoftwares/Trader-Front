import Ember from 'ember';

export default Ember.Controller.extend({


  stockadjustmentColumns: [
    {
      "propertyName": "id", "title": "ID"
    },

    {
      "propertyName": "customer.companyname", "title": "Customer"
    },
    {
      "propertyName": "totalunits", "title": "Total Units"
    },
    {
      "propertyName": "totalcost", "title": "Total Cost"
    },

    {
      "title":"View" , "template":"custom/viewstockadjustment"
    },
  ],
  
});
