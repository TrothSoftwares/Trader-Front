import DS from 'ember-data';
// import Ember from 'ember';


export default DS.Model.extend({
  duedate: DS.attr('string'),
  recieveddate: DS.attr('string'),
  totalunits :DS.attr('number'),
  totalcost : DS.attr('number'),
  postatus : DS.attr('string'),
  supplier: DS.belongsTo('supplier' ,{async:true}),
  purchaseorderitems: DS.hasMany('purchaseorderitem' ,{embedded: 'always', async:true}),

// computedtotalunits: Ember.computed('purchaseorderitems.@each.quantity' , 'purchaseorderitems', function() {
//     return this.get('purchaseorderitems').reduce(function(sum, split) {
//         return sum + parseInt(split.get('quantity'));
//     }, 0);
//   }),

computedtotalunits: function() {
    return this.get('purchaseorderitems').reduce(function(sum, split) {
        return sum + parseInt(split.get('quantity'));
    }, 0);
}.property('purchaseorderitems.@each.quantity'),

computedtotalcosts: function() {
    return this.get('purchaseorderitems').reduce(function(sum, split) {
        return sum + parseInt(split.get('computedtotal'));
    }, 0);
}.property('purchaseorderitems.@each.computedtotal')

});
