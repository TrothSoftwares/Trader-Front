import Ember from 'ember';

export default Ember.Controller.extend({



  actions:{

    recieveOrder: function(purchaseorder){

      purchaseorder.set('postatus','recieved');

      purchaseorder.set('recieveddate',  new Date());
      purchaseorder.save(); //TODO : catch function pending

    }
  }
});
