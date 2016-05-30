
import Ember from 'ember';

export default Ember.Controller.extend({

  commontoolsColumns: [
    {
      "propertyName": "id", "title": "ID"
    },
    {
      "propertyName": "name","title": "Tool Name"
    },
    {
      "title":"View" , "template":"custom/viewtracktoolcommontool"
    },
  ],

});
