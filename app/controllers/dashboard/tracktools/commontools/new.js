import Ember from 'ember';

export default Ember.Controller.extend({


  isSaveToolButtonDisabled: Ember.computed( 'name'   ,  function() {
    if( Ember.isEmpty(this.get('name'))
  ){return 'disabled';}
  else{return '';}
  }),


statuses :["Select","Issued", "Returned" , "Damaged", "Lost"],


actions: {

  selectStatus(status) {
    this.set('status', status);
    // if(status === 'Issued'){
      this.set("returndate" , '');
    // }
    // if(status === 'Returned'){
      this.set("issuedate","");
    // }
  },

      createTool: function(){

        var controller = this;

        var tool = this.store.createRecord('commontool', {
          name :this.get('name'),
          status :this.get('status'),
          location :this.get('location'),
          issuedate :this.get('issuedate'),
          returndate :this.get('returndate'),
          employee :this.get('employee')


        });

        tool.save().then(function(){
          controller.set('name','');
          controller.set('status','');
          controller.set('location','');
          controller.set('issuedate','');
          controller.set('returndate','');
          controller.set('employee','');
          controller.transitionToRoute('dashboard.tracktools.commontools.commontool.view' , tool);
        });
      },

}

});
