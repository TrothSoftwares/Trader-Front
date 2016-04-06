import Ember from 'ember';

export default Ember.Controller.extend({
actions:{

  printReport:function(){
     window.print();
}
}

});
