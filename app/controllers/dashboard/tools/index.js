import Ember from 'ember';

export default Ember.Controller.extend({

  toolColumns: [
    {
      "propertyName": "id", "title": "ID"
    },
    {
      "propertyName": "name","title": "Name"
    },
    {
      "propertyName": "status","title": "Status"
    },
    {
      "title":"View" , "template":"custom/viewtool"
    },
  ],



});
