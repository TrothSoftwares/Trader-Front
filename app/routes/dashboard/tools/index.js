import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {

    return Ember.RSVP.hash({
      tools: this.store.findAll('tool' ,{reload :true}).then(function(data){
        return data.filter(function(item){
           return item.get('id') !== '1';

        });
      })
    });

  },

  setupController: function(controller,model) {
    controller.set('tools',model.tools);
  },

});
