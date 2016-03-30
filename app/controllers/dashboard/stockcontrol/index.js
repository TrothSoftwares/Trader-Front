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

    customMessages: {
      "searchLabel": "Search",
      "columns-title": "Columns",
      "columns-showAll": "Show all",
      "columns-hideAll": "Hide all",
      "columns-restoreDefaults": "Restore Columns",
      "tableSummary": "Now are showing %@ - %@ of %@",
      "allColumnsAreHidden": "No visible columns, dude!",
      "noDataToShow": "No data. Sorry, bro..."
    },


    //
    // menuInit: function () {
    //   Ember.$(function(){
    //     Ember.$('.menu .item').tab();
    //   });
    // }.on('init'),


    actions: {




    }
  });
