import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {

    return Ember.RSVP.hash({
      stockadjustments: this.store.findAll('stockadjustment' ,{reload :true}).then(function(data){
        return data.filter(function(item){
           return item.get('id') !== '1';
        });
      }),
    });

  },

  setupController: function(controller,model) {
    controller.set('stockadjustments',model.stockadjustments);
  },

});
