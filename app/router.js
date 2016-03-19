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
    this.route('relations', function() {
      this.route('customers', function() {
        this.route('customer' , {path: ':id'});
        this.route('new');
      });
      this.route('suppliers', function() {
        this.route('supplier' , {path: ':id'});
        this.route('new');
      });
    });
    this.route('stockcontrol', function() {
      this.route('purchaseorders', function() {
        this.route('new');
      });
    });
  });
  this.route('login');



});


export default Router;
