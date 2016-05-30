import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {

    return Ember.RSVP.hash({
      commontools: this.store.findAll('commontool' ,{reload :true})
    });

  },

  setupController: function(controller,model) {
    controller.set('commontools',model.commontools);
  },

});
