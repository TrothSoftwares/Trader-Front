import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    // return this.store.findAll('product' ,{reload: true});
    return  this.store.findAll('product' ,{reload :true}).then(function(data){
      return data.filter(function(item){
        
         return item.get('id') !== '1';
      });
    });
  },

  setupController: function(controller ,model) {
    controller.set('products',model);
    controller.set('suppliers', this.store.findAll('supplier') ,{reload: true});
    controller.set('producttypes', this.store.findAll('producttype') ,{reload: true});
    controller.set('productbrands', this.store.findAll('productbrand') ,{reload: true});
  },


});
