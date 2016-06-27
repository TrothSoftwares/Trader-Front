import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  quantity: DS.attr('number'),
  total :DS.attr('number'),
  poitemstatus : DS.attr('number'),
  recieveddate : DS.attr('date'),
  product: DS.belongsTo('product' ,{async:true}),
  isSearchBarOpen:DS.attr('boolean'),
  purchaseorder: DS.belongsTo('purchaseorder' ,{async:true}),





  aftervalue: Ember.computed('product' , 'quantity', function() {
    return parseInt(this.get('product.initialstocklevel')) + parseInt(this.get('quantity'));
  }),


  computedNewItemCostTotal: Ember.computed('product' , 'quantity'  , 'product.newitemcost', function() {
    var total =   parseFloat(this.get('product.newitemcost')) * parseInt(this.get('quantity'));
     return total;
  }),

  computedtotal: Ember.computed('product' , 'quantity'  , 'product.buyprice', function() {
    var total =   parseFloat(this.get('product.buyprice')) * parseInt(this.get('quantity'));
     return total;
  }),



});
