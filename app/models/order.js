import DS from 'ember-data';



export default DS.Model.extend({
  duedate: DS.attr('date'),
  totalunits :DS.attr('number'),
  totalcost : DS.attr('number'),
  orderstatus : DS.attr('string'),
  customer: DS.belongsTo('customer' ,{async:true}),
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
}.property('orderitems.@each.computedtotal')

});
