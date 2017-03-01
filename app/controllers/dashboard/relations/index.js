import Ember from 'ember';

export default Ember.Controller.extend({

  supplierColumns: [
    {
      "propertyName": "id", "title": "ID"
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
      "title":"View" , "template":"custom/viewsupplier"
    },
  ],

  customerColumns: [
    {
      "propertyName": "id", "title": "ID"
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



  init: function() {
   Ember.run.scheduleOnce('afterRender', this ,function() {
             Ember.$('.menu .item').tab();
    console.log('Closure');
  });


//         Ember.$( document ).ready(function() {
//         Ember.$('.menu .item').tab();
//     });
    },


//   tabInit: function () {
//
//     Ember.$( document ).ready(function() {
//     Ember.$('.menu .item').tab();
// });
//     // Ember.$(function(){
//     // });
//   }.on('init'),


  actions: {
  }
});
