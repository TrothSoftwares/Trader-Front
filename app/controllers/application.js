import Ember from 'ember';

export default Ember.Controller.extend({

    actions:{

      openSidebar: function(){

        Ember.$('.ui.sidebar')
          .sidebar('toggle')
        ;
      }
    }
});
