import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  quantity: DS.attr('number'),
  total :DS.attr('number'),
  orderitemstatus : DS.attr('number'),
  product: DS.belongsTo('product' ,{async:true}),
  order: DS.belongsTo('order' ,{async:true}),
  isSearchBarOpen:DS.attr('boolean'),

  aftervalue: Ember.computed('product' , 'quantity', function() {
    return parseInt(this.get('product.initialstocklevel')) - parseInt(this.get('quantity'));
  }),

  computedtotal: Ember.computed('product' , 'quantity', function() {
    var total =   parseInt(this.get('product.retailprice')) * parseInt(this.get('quantity'));
     return total;
  }),



});
