import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {

    return Ember.RSVP.hash({
      employees: this.store.findAll('employee' ,{reload :true}).then(function(data){
        return data.filter(function(item){
           return item.get('id') !== '1';

        });
      })
    });

  },

  setupController: function(controller,model) {
    controller.set('employees',model.employees);
  },

});
