import Ember from 'ember';

export default Ember.Controller.extend({

      ordersColumns: [
        {
          "propertyName": "orderid", "title": "Order No."
        },
        {
          "propertyName": "customer.companyname", "title": "Customer"
        },
        {
          "propertyName": "chargableamount", "title": "Chargable Amount"
        },
        {
         "title": "Order Date" ,"template":"custom/orderdate"
        },
        {
          "title":"View" , "template":"custom/vieworder"
        },
      ],


});
