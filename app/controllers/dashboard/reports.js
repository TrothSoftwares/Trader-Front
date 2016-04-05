import Ember from 'ember';

import ENV from '../../config/environment';
export default Ember.Controller.extend({

 ajax: Ember.inject.service(),

customerReport:false,
customerReportLink:'',


  actions:{

    generateReport:function(){
      var controller = this;
      return this.get('ajax').request('/reports').then(function(reports){





        controller.set('customerReport', true);
        controller.set('customerReportLink', ENV.APP.host+reports.file_path);
        



      });

    }
  }
});
