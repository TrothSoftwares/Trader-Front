import DS from 'ember-data';

export default DS.Model.extend({
brandname: DS.attr('string'),
products: DS.hasMany('product' ,{embedded: 'always', async:true}),
});
