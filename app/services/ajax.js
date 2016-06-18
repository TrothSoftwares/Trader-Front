
import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';
import ENV from '../config/environment';




export default AjaxService.extend({
  host: ENV.APP.host,
  session: Ember.inject.service(),
  headers: Ember.computed('session.data.authenticated', {
    get() {
      let headers = {};
      // const authToken = this.get('session.data.authenticated.token');
      var authenticated = this.get('session.data.authenticated');

      if (authenticated) {
        headers['Authorization'] = 'Token token="'+ authenticated.token +'", email="'+ authenticated.email +'"';


      }
      return headers;
    }
  })
});
