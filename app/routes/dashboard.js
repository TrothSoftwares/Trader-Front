import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{


  model() {
      return this.store.query('product',{page: 1, size: 3});

    },

    setupController(controller, model) {
      //  controller.get('table').setRows(model.toArray());



controller.get('table').setRows(model);


       controller.set('mdata',model);
    },



session: Ember.inject.service('session'),

  actions: {
    logout() {

      this.get('session').invalidate();
      this.transitionTo('login');
    }
  }
});
