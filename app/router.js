import Ember from 'ember';
import config from './config/environment';



const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('dashboard', {path: '/'}, function() {
    this.route('orders', function() {
      this.route('order', {path: ':id'}, function() {
        this.route('edit');
        this.route('view');
      });
      this.route('new');
    });

    this.route('inventory', function() {
      this.route('new');
      this.route('product', {path: ':id'}, function() {
        this.route('edit');
        this.route('view');
      });
    });



    this.route('relations', function() {
      this.route('customers', function() {
      this.route('customer', {path: ':id'},function(){
        this.route('edit' );
        this.route('view');
      });
      this.route('new');
      });


      this.route('suppliers', function() {
      this.route('supplier', {path: ':id'},function(){
        this.route('edit' );
        this.route('view');
      });
      this.route('new');
      });
    });

    this.route('stockcontrol', function() {
      this.route('purchaseorders', function() {
        this.route('new');
        this.route('purchaseorder', {path: ':id'}, function() {
          this.route('edit');
          this.route('view');
        });
      });
      this.route('stockadjustments', function() {
        this.route('new');
        this.route('stockadjustment', {path: ':id'}, function() {
          this.route('edit');
          this.route('view');
        });
      });
    });


    this.route('reports', function() {
      this.route('inventory');
      this.route('sales');
      this.route('purchaseorders');
    });
  });
  this.route('login');



});


export default Router;



// TODO:
//
// 1. Validations
// 2.
