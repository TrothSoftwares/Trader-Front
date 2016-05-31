import Ember from 'ember';

export default Ember.Controller.extend({

  isSaveToolButtonDisabled: Ember.computed( 'tool.name'   ,  function() {
    if( Ember.isEmpty(this.get('tool.name'))
  ){return 'disabled';}
  else{return '';}
  }),


statuses :["Select","Running", "Damaged" , "Lost"],




    actions:{

      deleteTool:function(tool){

        var controller= this;
        tool.destroyRecord().then(function () {
          controller.notifications.addNotification({
            message: 'Tool Deleted!' ,
            type: 'success',
            autoClear: true
          });
          controller.transitionToRoute('dashboard.tracktools.tools.index');
        }).catch(function () {
          tool.rollbackAttributes();
          controller.notifications.addNotification({
            message: 'Tool cannot be deleted. !' ,
            type: 'error',
            autoClear: true
          });
        });

      },


      saveTool:function(){
        var controller = this;
        var currentTool = this.get('tool');

        currentTool.save().then(function(){
          controller.notifications.addNotification({
            message: 'Tool Saved!' ,
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
      },

      selectStatus(status) {
        this.get('tool').set('status', status);
      },
    },




});
