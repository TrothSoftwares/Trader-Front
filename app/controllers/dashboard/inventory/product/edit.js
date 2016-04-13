import Ember from 'ember';

export default Ember.Controller.extend({




    retailprice: function() {
      var initialcostprice = this.get('product.initialcostprice');
      var buyprice = this.get('product.buyprice');
      var retailprice = (parseInt(initialcostprice) + parseInt(buyprice)) / 2 ;
      // this.set('product.retailprice', 'retailprice');
      return retailprice;
    }.property('product.initialcostprice', 'product.buyprice'),




    actions:{

  


      deleteProduct:function(product){
        var controller= this;
        product.destroyRecord().then(function () {
          controller.notifications.addNotification({
            message: 'Agent Deleted!' ,
            type: 'success',
            autoClear: true
          });





          controller.transitionToRoute('dashboard.inventory.index');

        }).catch(function () {
          product.rollbackAttributes();
          controller.notifications.addNotification({
            message: 'Agent cannot be deleted. This agent may be assigned to some project!' ,
            type: 'error',
            autoClear: true
          });
        });

      },
      saveProduct:function(){
        var controller = this;
        this.set('product.retailprice' , this.get('retailprice'));
        var currentProduct = this.get('product');


        currentProduct.save().then(function(){
          controller.notifications.addNotification({
            message: 'Product Saved!' ,
            type: 'success',
            autoClear: true
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
