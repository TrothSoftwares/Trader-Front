import Ember from 'ember';

export default Ember.Controller.extend({
  actions:{

    deleteSupplier:function(supplier){

      var controller= this;
      supplier.destroyRecord().then(function () {
        controller.notifications.addNotification({
          message: 'Supplier Deleted!' ,
          type: 'success',
          autoClear: true
        });
        controller.transitionToRoute('dashboard.relations.index');
      }).catch(function () {
        supplier.rollbackAttributes();
        controller.notifications.addNotification({
          message: 'Supplier cannot be deleted. This agent may be assigned to some project!' ,
          type: 'error',
          autoClear: true
        });
      });

    },


    saveSupplier:function(){
      var controller = this;
      var currentSupplier = this.get('supplier');

      currentSupplier.save().then(function(){
        controller.notifications.addNotification({
          message: 'Supplier Saved!' ,
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
