import Ember from 'ember';

export default Ember.Controller.extend({




  isPaymentButtonDisabled: Ember.computed('amount',function() {
    if(Ember.isEmpty(this.get('amount'))
  ){return 'disabled';}
  else{return '';}
}),

actions:{
  submitPayment:function(){
    var controller = this;
    var customer = controller.get('customer');
    var amount = controller.get('amount');
    var due = customer.get('due');

    due =  due - amount;

    customer.set('due',due);
    customer.save().then(function(){
      var payment = controller.store.createRecord('payment',{
        'amount': amount,
        'customer':customer
      });
      payment.save().then(function(){
        controller.set('amount', '');
      }).catch(function(){
        controller.notifications.addNotification({
          message: 'Sorry, cant save at the moment !' ,
          type: 'error',
          autoClear: true
        });
      });

    }).catch(function(){
      controller.notifications.addNotification({
        message: 'Sorry, cant save at the moment !' ,
        type: 'error',
        autoClear: true
      });
    });







  }
}

});
