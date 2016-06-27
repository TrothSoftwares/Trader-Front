import Ember from 'ember';
import groupBy from 'ember-group-by';

export default Ember.Controller.extend({

employee:'',
inputFormat:'DD/MM/YYYY',


filteredtools: groupBy('tools', 'employee.name'),


  actions:{
    applyFilters:function(){

      var tools = this.get('routetools');
      var start = this.get('startdate');
      var end = this.get('enddate');
      var employee = this.get('employee');
      if(employee){
        tools = tools.filter(function(tool){
          return tool.get('employee.name') === employee.get('name');
        });
      }


      if(start && end) {
        var startDate = new Date(start),
        endDate       = new Date(end);
        tools = tools.filter(function (tool) {

          return (tool.get('issuedate') >= startDate) && (tool.get('issuedate') <= endDate);
        });
      }

      this.set('tools',tools);

    },

    clearFilters:function(){
      this.set('employee','');
      this.set('startdate','');
      this.set('enddate','');

      this.send('applyFilters');
    },

    printReport:function(){
      window.print();
    }
  }


});
