import Ember from 'ember';

export default Ember.Controller.extend({
  moment: Ember.inject.service(),

  actions: {
      changeDefaultFormat() {
        this.set('moment.defaultFormat', 'MM.DD.YYYY');
      }
    },

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
          "propertyName": "postatus", "title": "Status"
        },


        {
          "title":"View" , "template":"custom/viewpurchaseorder"
        },
      ],
});
