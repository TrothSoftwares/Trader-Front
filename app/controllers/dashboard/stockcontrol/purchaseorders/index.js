import Ember from 'ember';

export default Ember.Controller.extend({



      purchaseorderColumns: [
        {
          "propertyName": "id", "title": "ID"
        },
        {
          "propertyName": "supplier.companyname", "title": "Supplier"
        },
        {
          "propertyName": "totalunits", "title": "Total Units"
        },
        {
          "propertyName": "totalcost", "title": "Total Cost"
        },

        {
          "propertyName": "postatus", "title": "Recieved"
        },

        {
          "title":"View" , "template":"custom/viewpurchaseorder"
        },
      ],
});
