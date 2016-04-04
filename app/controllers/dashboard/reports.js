import Ember from 'ember';

export default Ember.Controller.extend({

 ajax: Ember.inject.service(),

customerReport:false,
customerReportLink:'',


  actions:{

    generateReport:function(){
      var controller = this;
      return this.get('ajax').request('/reports').then(function(reports){





        controller.set('customerReport', true);
        controller.set('customerReportLink', reports.file_path);


      });

    }
  }
});
