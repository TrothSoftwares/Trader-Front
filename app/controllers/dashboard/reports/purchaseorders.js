import Ember from 'ember';

export default Ember.Controller.extend({

  startdate: '',
  enddate: '',
  supplier:'',


  computedIncomingTotal:Ember.computed(  'filteredProducts.@each.totalcost', function() {
    var purchaseorders = this.get('filteredProducts');
    var ret =0;
    purchaseorders.forEach(function(purchaseorder){
  ret += purchaseorder.get('totalcost');
    });
    return ret;
  }),

  filteredProducts: Ember.computed('purchaseorders.@each.duedate','supplier', 'startdate' , 'enddate', function() {

    var purchaseorders = this.get('purchaseorders');
    var start = this.get('startdate');
    var end = this.get('enddate');
    var supplier = this.get('supplier');


    if(supplier){
      purchaseorders = purchaseorders.filter(function(purchaseorder){
        return purchaseorder.get('supplier').get('companyname').toLowerCase().indexOf(supplier.get('companyname').toLowerCase()) > -1;
      });
    }


    if(start && end) {
      var startDate = new Date(start),
      endDate       = new Date(end);
      return purchaseorders.filter(function (purchaseorder) {
        return (purchaseorder.get('duedate') >= startDate) && (purchaseorder.get('duedate') <= endDate);
      });
    }
    return purchaseorders;

  }),


  actions:{

    clearFilters:function(){
      this.set('startdate','');
      this.set('enddate','');
      this.set('supplier','');

    },

    printReport:function(){
      window.print();
    }
  }
});
