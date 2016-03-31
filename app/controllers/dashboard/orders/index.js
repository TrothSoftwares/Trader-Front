import Ember from 'ember';

export default Ember.Controller.extend({



      ordersColumns: [
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
          "propertyName": "postatus", "title": "Recieved"
        },

        {
          "title":"View" , "template":"custom/vieworder"
        },
      ],


});
