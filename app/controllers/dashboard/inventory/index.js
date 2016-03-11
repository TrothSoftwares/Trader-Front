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
        "title":"View" , "template":"custom/viewbutton"
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

    currentProductType: 'all',
    allActiveClass :'active',



    computedProducts: function() {
      console.log('called computed');
      var currentProductType = this.get('currentProductType');
      if (currentProductType === 'all'){
        console.log('called all');
        return this.get('products');
      }
      else{
        console.log('called with protype');
        return this.get('products').filterBy('producttype.typename', currentProductType);
      }
    }.property('currentProductType','products'),


    actions: {

      changeActiveClass: function(producttype){
        this.set('allActiveClass','');
        this.producttypes.forEach(function(ptype){
          ptype.set('activeclass' , '');

        });
        if(producttype === 'active'){
          this.set('allActiveClass' , 'active');
          this.set('currentProductType' ,  'all');
        }
        else{
        producttype.set('activeclass' , 'active');
        this.set('currentProductType' , producttype.get('typename'));
      }

      },


refreshPage: function(){

  this.refresh();

}


    }
  });
