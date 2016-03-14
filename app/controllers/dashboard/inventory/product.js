import Ember from 'ember';

export default Ember.Controller.extend({


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
