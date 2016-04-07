import DS from 'ember-data';

export default DS.Model.extend({
  reason : DS.attr('string'),
  notes : DS.attr('string'),
  customer: DS.belongsTo('customer' ,{async:true}),
  totalunits :DS.attr('number'),
  sastatus : DS.attr('string'),
  totalcost : DS.attr('number'),

  stockadjustmentitems: DS.hasMany('stockadjustmentitem' ,{embedded: 'always', async:true}),

  computedtotalunits: function() {
      return this.get('stockadjustmentitems').reduce(function(sum, split) {
          return sum + parseInt(split.get('quantity'));
      }, 0);
  }.property('stockadjustmentitems.@each.quantity'),

  computedtotalcosts: function() {
      return this.get('stockadjustmentitems').reduce(function(sum, split) {
          return sum + parseInt(split.get('computedtotal'));
      }, 0);
  }.property('stockadjustmentitems.@each.computedtotal')

});
