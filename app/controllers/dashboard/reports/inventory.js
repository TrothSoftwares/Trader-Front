import Ember from 'ember';

export default Ember.Controller.extend({

producttype:'',


computedRetailTotal:Ember.computed(  'filteredProducts.@each.duedate', function() {
  var products = this.get('filteredProducts');
  var ret =0;
  products.forEach(function(product){
ret += product.get('computedtotal_retail_intialstocklevel');
  });
  return ret;
}),

  filteredProducts: Ember.computed(  'producttype', function() {
    var products = this.get('products');
    var producttype = this.get('producttype');
        if(producttype){

          products = products.filter(function(product){
            return product.get('producttype').get('typename').toLowerCase().indexOf(producttype.get('typename').toLowerCase()) > -1;
          });
        }

return products;
  }),
  actions:{


    clearFilters:function(){
  this.set('producttype','');
    },

    printReport:function(){
      window.print();
    },



  }
});
