import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  quantity: DS.attr('number'),
  total :DS.attr('number'),
  totalvalue :DS.attr('number'),
  exciseduty:DS.attr('number'),
  cashdiscount:DS.attr('number'),
  grossvalue:DS.attr('number'),
  orderitemstatus : DS.attr('number'),
  rateoftax: DS.attr('number',{default:5.0}),
  tax: DS.attr('number'),
  nettaxablevalue: DS.attr('number'),
  product: DS.belongsTo('product' ,{async:true}),
  order: DS.belongsTo('order' ,{async:true}),
  isSearchBarOpen:DS.attr('boolean'),

  aftervalue: Ember.computed('product' , 'quantity', function() {
    return parseFloat(this.get('product.initialstocklevel')) - parseFloat(this.get('quantity'));
  }),

  computedtotal: Ember.computed('product' , 'quantity', function() {
    var total =   parseFloat(this.get('product.retailprice')) * parseFloat(this.get('quantity'));
     return total;
  }),

  computedgrosstotal: Ember.computed('computedtotal' , 'exciseduty', function() {
    var total =   parseFloat(this.get('computedtotal')) + parseFloat(this.get('exciseduty'));
     return total;
  }),



  computednettaxablevalue: Ember.computed('computedgrosstotal' , 'cashdiscount', function() {
    var total =   parseFloat(this.get('computedgrosstotal')) - parseFloat(this.get('cashdiscount'));
     return total;
  }),


  computedtax: Ember.computed('rateoftax' , 'computednettaxablevalue', function() {
    let taxableamount  = this.get('computednettaxablevalue');
    let rateoftax = this.get('rateoftax');
    let computedtax = (rateoftax /100 ) * parseFloat(taxableamount);
    return computedtax.toFixed(2);
  }),

  computedtotalvalue: Ember.computed('computednettaxablevalue' , 'computedtax', function() {
    var total =   parseFloat(this.get('computednettaxablevalue')) + parseFloat(this.get('computedtax'));
     return total;
  }),






});
