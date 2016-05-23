import Ember from 'ember';

export default Ember.Controller.extend({

    columns: [
      {
        "propertyName": "id", "title": "Sl.No"
      },
      {
        "propertyName": "itemcode","title": "Item Code"
      },
      {
        "propertyName": "productname","title": "Product Name"
      },
      {
        "propertyName": "initialstocklevel","title": "Stock in hand"
      },
      {
        "propertyName": "retailprice","title": "Retail Price"
      },
      {
        "propertyName": "producttype.typename","title": "Product Type"
      },
      {
        "title":"View" , "template":"custom/viewinventory"
      },
    ],


sharan: 'guy',

searchTerm: '',


    matchingProducts: Ember.computed('products.@each.itemcode','searchTerm', function() {
      var searchTerm = this.get('searchTerm').toLowerCase();
      return this.get('products').filter(function(product) {
        return product.get('itemcode').toLowerCase().indexOf(searchTerm) !==-1;
      });
    }),


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
