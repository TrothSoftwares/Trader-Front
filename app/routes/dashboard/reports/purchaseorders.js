import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {

    return Ember.RSVP.hash({
    purchaseorders: this.store.findAll('purchaseorder' ,{reload :true}).then(function(data){
        return data.filter(function(item){
           return item.get('id') !== '1';
        });
      }),


      suppliers: this.store.findAll('supplier' ,{reload :true}).then(function(data){
          return data.filter(function(item){
             return item.get('id') !== '1';
          });
        }),
      // suppliers: this.store.findAll('supplier' ,{reload :true}),
    });


  },
  setupController: function(controller,model) {
    controller.set('purchaseorders',model.purchaseorders);
    controller.set('suppliers',model.suppliers);
  },

});
