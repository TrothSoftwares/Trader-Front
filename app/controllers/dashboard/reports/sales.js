import Ember from 'ember';
import groupBy from 'ember-group-by';

export default Ember.Controller.extend({


  startdate: '',
  enddate: '',
  customer:'',
  inputFormat:'DD/MM/YYYY',
  monthNames : ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"],

  customerMapBy: groupBy('orders', 'customer'),


  years:["Select Year", "2015", "2016","2017","2018","2019","2020","2021", "2022","2023","2024","2025","2026","2027", "2028","2029","2030","2031","2032" ,"2033", "2034","2035","2036","2037","2038"],








  computedSalesTotal:Ember.computed(  'filteredProducts.@each.chargableamount', function() {
    var orders = this.get('filteredProducts');
    var ret =0;
    orders.forEach(function(order){
  ret += order.get('chargableamount');
    });
    return ret;
  }),



  filteredProducts: Ember.computed('orders.@each.duedate','customer', 'startdate' , 'enddate', function() {

    var orders = this.get('orders');
    var start = this.get('startdate');
    var end = this.get('enddate');
    var customer = this.get('customer');

    if(customer){
      orders = orders.filter(function(order){
        return order.get('customer').get('companyname').toLowerCase().indexOf(customer.get('companyname').toLowerCase()) > -1;
      });
    }


    if(start && end) {
      var startDate = new Date(start),
      endDate       = new Date(end);
      return orders.filter(function (order) {
        return (order.get('duedate') >= startDate) && (order.get('duedate') <= endDate);
      });
    }
    return orders;

  }),






  actions:{


    deleteFiltered:function(){


      var controller= this;

      var confirm = window.confirm("Are you sure you want to delete?");
      if (confirm) {
        var orders = this.get('filteredProducts');
        orders.forEach(function(order){
          order.destroyRecord().then(function () {
        }).catch(function () {
        controller.notifications.addNotification({
          message: 'Order cannot be deleted.' ,
          type: 'error',
          autoClear: true
        });
      });
    });
    controller.notifications.addNotification({
      message: 'Orders Deleted!' ,
      type: 'success',
      autoClear: true
    });
controller.set('startdate','');
controller.set('enddate','');

    controller.transitionToRoute('dashboard.reports');

    }


    },

    selectYear:function(year){
      var customers = this.get('customers');
      customers.forEach(function(customer){
        customer.set('filteryear',year);
      });
    },

    clearFilters:function(){
      this.set('startdate','');
      this.set('enddate','');
      this.set('customer','');
      this.set('producttype','');
    },

    printReport:function(){
      window.print();

    }
  }

});
