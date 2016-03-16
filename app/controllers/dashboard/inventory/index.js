import Ember from 'ember';

export default Ember.Controller.extend({

    columns: [
      {
        "propertyName": "id", "title": "ID"
      },
      {
        "propertyName": "itemcode","title": "Item Code"
      },
      {
        "propertyName": "productname","title": "Product Name"
      },
      {
        "propertyName": "producttype.typename","title": "Product Type"
      },
      {
        "title":"View" , "template":"custom/viewinventory"
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





    actions: {




    }
  });
