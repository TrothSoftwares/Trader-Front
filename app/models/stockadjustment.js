import DS from 'ember-data';

export default DS.Model.extend({
  reason : DS.attr('string'),
  notes : DS.attr('string'),
  customer: DS.belongsTo('customer' ,{async:true}),
  stockadjustmentitems: DS.hasMany('stockadjustmentitem' ,{embedded: 'always', async:true}),
});
