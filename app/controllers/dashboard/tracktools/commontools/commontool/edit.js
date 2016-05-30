import Ember from 'ember';

export default Ember.Controller.extend({

  isSaveToolButtonDisabled: Ember.computed( 'commontool.name'   ,  function() {
    if( Ember.isEmpty(this.get('commontool.name'))
  ){return 'disabled';}
  else{return '';}
  }),


statuses :["Select","Issued", "Returned" , "Damaged", "Lost"],




    actions:{




      deleteTool:function(tool){

        var controller= this;
        tool.destroyRecord().then(function () {
          controller.notifications.addNotification({
            message: 'Tool Deleted!' ,
            type: 'success',
            autoClear: true
          });
          controller.transitionToRoute('dashboard.commontools.commontool.index');
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
        var currentTool = this.get('commontool');

        currentTool.save().then(function(){
          controller.notifications.addNotification({
            message: 'Common Tool Saved!' ,
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
        this.set('commontool.status', status);
        // if(status === 'Issued'){
          this.set("commontool.returndate" , '');
        // }
        // if(status === 'Returned'){
          this.set("commontool.issuedate","");
        // }
      },
    },




});
