import Ember from 'ember';

export default Ember.Route.extend({
  actions:{

    printReport:function(){
       window.print();
  }
  }
});
