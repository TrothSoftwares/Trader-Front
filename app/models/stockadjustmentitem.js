import DS from 'ember-data';

export default DS.Model.extend({
  quantity : DS.attr('number'),
  stockadjustment: DS.belongsTo('stockadjustment' ,{async:true})  
});
