import Ember from 'ember';

export default Ember.Controller.extend({



      ordersColumns: [
        {
          "propertyName": "id", "title": "Order No."
        },
        {
          "propertyName": "customer.companyname", "title": "Customer"
        },
        {
          "propertyName": "totalunits", "title": "Total Units"
        },
        {
          "propertyName": "chargableamount", "title": "Chargable Amount"
        },

        {
          // "title":"Order Status" , "template":"custom/orderindicator"
          "propertyName": "orderstatus", "title": "Order Status"
        },
        {
          "title":"Status" , "template":"custom/orderindicator"
        },
        {
          "title":"View" , "template":"custom/vieworder"
        },
      ],


});
