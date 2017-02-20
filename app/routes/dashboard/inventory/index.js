import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{


  model() {
      return this.store.query('product',{page: 1, size: 10});
    },

    setupController(controller, model) {
      controller.set('producttypes', controller.store.findAll('producttype',{reload: true}));
      controller.get('table').setRows(model);
       controller.set('mdata',model);
       controller.set('page',1);
       controller.set('canLoadMore',true);

    },



session: Ember.inject.service('session'),

  actions: {
    logout() {

      this.get('session').invalidate();
      this.transitionTo('login');
    }
  }
});
