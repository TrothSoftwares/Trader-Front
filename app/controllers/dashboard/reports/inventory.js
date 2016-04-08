import Ember from 'ember';

export default Ember.Controller.extend({




  filteredProducts: Ember.computed('products.songs.@each.title', 'startdate' , 'enddate', function() {

    var products = this.get('products');
    var startdate = this.get('startdate').toLowerCase();
    var enddate = this.get('enddate').toLowerCase();


    if(startdate && enddate) {
        var startDate = new Date(startdate),
            endDate       = new Date(enddate);
         products.filter(function (product) {
          return (product.get('createdAt') >= startDate) && (post.get('createdAt') <= endDate);

        });
      }

    return this.get('model.songs').filter(function(song) {
      return song.get('title').toLowerCase().indexOf(searchTerm) !==
      -1;
    });
  }),
  actions:{

    printReport:function(){
      window.print();
    },



  }
});
