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
          "propertyName": "totalcost", "title": "Total Cost"
        },

        {
          "propertyName": "orderstatus", "title": "Order Status"
        },

        {
          "title":"View" , "template":"custom/vieworder"
        },
      ],


});
