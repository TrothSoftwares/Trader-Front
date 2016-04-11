import Ember from 'ember';

export default Ember.Controller.extend({


  startdate: '',
  enddate: '',
  customer:'',



  computedSalesTotal:Ember.computed(  'filteredProducts.@each.totalcost', function() {
    var orders = this.get('filteredProducts');
    var ret =0;
    orders.forEach(function(order){
  ret += order.get('totalcost');
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
