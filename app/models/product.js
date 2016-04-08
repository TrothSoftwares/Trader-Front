import DS from 'ember-data';
import Ember from 'ember';



export default DS.Model.extend({

itemcode: DS.attr('string'),
productname: DS.attr('string'),
initialstocklevel: DS.attr('number'),
initialcostprice: DS.attr('number'),
buyprice: DS.attr('number'),
retailprice: DS.attr('number'),







computedtotal_retail_intialstocklevel: Ember.computed('retailprice' , 'initialstocklevel', function() {
    return parseInt(this.get('initialstocklevel')) * parseInt(this.get('retailprice'));
  }),



supplier: DS.belongsTo('supplier' ,{async:true}),
producttype: DS.belongsTo('producttype' ,{async:true}),
productbrand: DS.belongsTo('productbrand' ,{async:true}),

purchaseorderitems: DS.hasMany('purchaseorderitem' ,{embedded: 'always', async:true}),
stockadjustmentitems :DS.hasMany('stockadjustmentitem',{embedded: 'always', async:true}),
});
