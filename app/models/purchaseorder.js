import DS from 'ember-data';

export default DS.Model.extend({
  duedate: DS.attr('date'),
  recieveddate: DS.attr('string'),
  totalunits :DS.attr('number'),
  totalcost : DS.attr('number'),
  postatus : DS.attr('string'),
  invoiceno : DS.attr('string'),
  supplier: DS.belongsTo('supplier' ,{async:true}),
  purchaseorderitems: DS.hasMany('purchaseorderitem' ,{embedded: 'always', async:true}),









computedtotalunits: function() {
    return this.get('purchaseorderitems').reduce(function(sum, split) {
        return sum + parseFloat(split.get('quantity'));
    }, 0);
}.property('purchaseorderitems.@each.quantity'),


computedNewItemCostTotalCosts: function() {
    return this.get('purchaseorderitems').reduce(function(sum, split) {
        return sum + parseFloat(split.get('computedNewItemCostTotal'));
    }, 0);
}.property('purchaseorderitems.@each.computedtotal'),

computedtotalcosts: function() {
    return this.get('purchaseorderitems').reduce(function(sum, split) {
        return sum + parseFloat(split.get('computedtotal'));
    }, 0);
}.property('purchaseorderitems.@each.computedtotal')

});
