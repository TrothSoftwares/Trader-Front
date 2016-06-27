import Ember from 'ember';

export default Ember.Controller.extend({
  inputFormat:'DD/MM/YYYY',

  statuses :["Select","Running", "Damaged" , "Lost"],


  isReturnButtonDisabled: Ember.computed('commontool.commontoolissuances.lastObject.returndate'   ,  function() {
    if( Ember.isEmpty(this.get('commontool.commontoolissuances.lastObject.returndate'))

  ){return 'disabled';}
  else{return '';}
}),


isSaveButtonDisabled: Ember.computed('commontool.commontoolissuances.lastObject.issuedate' ,'commontool.commontoolissuances.lastObject.location'  ,  function() {
  if( Ember.isEmpty(this.get('commontool.commontoolissuances.lastObject.issuedate'))

){return 'disabled';}
else{return '';}
}),

  actions:{
    selectStatus(status) {
      this.get('commontool').set('status', status);
    },

    NewIssuance: function(){


      var commontool = this.get('commontool');

      var commontoolissuance = this.store.createRecord('commontoolissuance', {

        status :'',
        location :'',
        issuedate :'',
        returndate :'',
        commontool: commontool
      });

      commontoolissuance.save().then(function(){
        commontool.set('status','Issued');
        commontool.save();

      });
    },


    saveIssuance:function(){
      var controller = this;
      var commontool = this.get('commontool');


      commontool.get('commontoolissuances').get('lastObject').save().then(function(){
        controller.notifications.addNotification({
          message: 'Updated!' ,
          type: 'success',
          autoClear: true
        });
      });

    },

    returnIssuance:function(){
      var commontool = this.get('commontool');
      commontool.set('status','Returned');
      commontool.save();
    }


  }
});
