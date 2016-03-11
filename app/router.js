import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('dashboard', {path: '/'}, function() {
    this.route('inventory', function() {
      this.route('new');
      this.route('product', {path: ':id'});
    });
  });
  this.route('login');
});

export default Router;
