import DS from 'ember-data';

export default DS.Model.extend({
  quantity: DS.attr('number'),
  total :DS.attr('number'),
  poitemstatus : DS.attr('number'),
  recieveddate : DS.attr('date'),
  purchaseorder: DS.belongsTo('purchaseorder' ,{async:true})
});
