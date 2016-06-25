import DS from 'ember-data';
import Ember from 'ember';



export default DS.Model.extend({
  duedate: DS.attr('date'),
  issuancedate: DS.attr('date'),
  totalunits :DS.attr('number'),
  totalcost : DS.attr('number'),
  orderstatus : DS.attr('string'),
  mrf : DS.attr('string'),
  location : DS.attr('string'),
  natureofwork : DS.attr('string'),
  customer: DS.belongsTo('customer' ,{async:true}), //instead of location
  supplier: DS.belongsTo('supplier' ,{async:true}),
  employee: DS.belongsTo('employee' ,{async:true}),
  requestedby: DS.belongsTo('employee' ,{async:true}),
  approvedby: DS.belongsTo('employee' ,{async:true}),
  orderitems: DS.hasMany('orderitem' ,{embedded: 'always', async:true}),
  stockadjustments: DS.hasMany('stockadjustment' ,{embedded: 'always', async:true}),



 computedtotalunits: function() {
    return this.get('orderitems').reduce(function(sum, split) {
        return sum + parseInt(split.get('quantity'));
    }, 0);
}.property('orderitems.@each.quantity'),

computedtotalcosts: function() {
    return this.get('orderitems').reduce(function(sum, split) {
        return sum + parseInt(split.get('computedtotal'));
    }, 0);
}.property('orderitems.@each.computedtotal'),





});
