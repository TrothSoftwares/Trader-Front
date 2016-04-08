import Ember from 'ember';

export default Ember.Controller.extend({


startdate: '',
enddate: '',
customer:'',

  filteredProducts: Ember.computed('orders.@each.duedate', 'customer', 'startdate' , 'enddate', function() {

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



  results: function(){
    var searchTerm = this.get('searchTerm'),
        start      = this.get('startDate'),
        end        = this.get('endDate'),
        results    = this.get('content');
   if(searchTerm){

     results = results.filter(function(post){
       return post.get('title').toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
     });
   }

    if(start && end) {
      var startDate = new Date(start),
          endDate       = new Date(end);
      results = results.filter(function (post) {
        return (post.get('createdAt') >= startDate) && (post.get('createdAt') <= endDate);

      });
    }
    return results;

  }.property('content', 'searchTerm', 'startDate', 'endDate'),




actions:{

  printReport:function(){
     window.print();
}
}

});
