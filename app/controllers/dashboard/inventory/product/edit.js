import Ember from 'ember';

export default Ember.Controller.extend({




    retailprice: function() {
      var initialcostprice = this.get('product.initialcostprice');
      var buyprice = this.get('product.buyprice');
      var retailprice = (parseFloat(initialcostprice) + parseFloat(buyprice)) / 2 ;
      return retailprice;
    }.property('product.initialcostprice', 'product.buyprice'),




    actions:{


      deleteProduct:function(product){

        var controller= this;

        var confirm = window.confirm("Are you sure you want to delete?");
        if (confirm) {
        product.destroyRecord().then(function () {
          controller.notifications.addNotification({
            message: 'Product Deleted!' ,
            type: 'success',
            autoClear: true
          });

          controller.transitionToRoute('dashboard.inventory.index');

        }).catch(function () {
          product.rollbackAttributes();
          controller.notifications.addNotification({
            message: 'Product cannot be deleted. It may be used in Purchase Order or New Orders' ,
            type: 'error',
            autoClear: true
          });
        });

      }

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
