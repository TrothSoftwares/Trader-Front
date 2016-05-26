import Ember from 'ember';
import config from './config/environment';



const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('dashboard', {path: '/'}, function() {
    this.route('orders', function() {    //dashboard/orders
      this.route('order', {path: ':id'}, function() {     //dashboard/orders/1
        this.route('edit');   //dashboard/orders/1/edit
        this.route('view');  //dashboard/orders/1/view
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
      this.route('employees', function() {
        this.route('employee', {path: ':id'}, function() {
          this.route('view');
          this.route('edit');
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


    this.route('tools', function() {
      this.route('tool', function() {
        this.route('view');
        this.route('edit');
      });
      this.route('new');
    });


  });
  this.route('login');



});


export default Router;



// TODO:
//
// 1. Retail Price not calculated for second time
// 2.
