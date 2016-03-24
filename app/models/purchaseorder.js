import DS from 'ember-data';

export default DS.Model.extend({
  duedate: DS.attr('string'),
  totalunits :DS.attr('number'),
  totalcost : DS.attr('number'),
  postatus : DS.attr('string'),
  supplier: DS.belongsTo('supplier' ,{async:true}),
  purchaseorders: DS.hasMany('purchaseorder' ,{embedded: 'always', async:true}),
});
