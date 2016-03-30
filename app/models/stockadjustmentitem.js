import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  quantity : DS.attr('number'),
  product: DS.belongsTo('product' ,{async:true}),
  stockadjustment: DS.belongsTo('stockadjustment' ,{async:true}),
  total :DS.attr('number'),


  aftervalue: Ember.computed('product' , 'quantity', function() {
    return parseInt(this.get('product.initialstocklevel')) + parseInt(this.get('quantity'));
  }),

  computedtotal: Ember.computed('product' , 'quantity', function() {
    var total =   parseInt(this.get('product.retailprice')) * parseInt(this.get('quantity'));
     return total;
  }),
});
