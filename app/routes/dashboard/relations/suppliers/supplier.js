import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
      return this.store.findRecord('supplier', params.id );
  },

  setupController: function(controller ,model) {
    controller.set('supplier',model );
  }
});
