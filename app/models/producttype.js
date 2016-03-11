import DS from 'ember-data';

export default DS.Model.extend({
typename: DS.attr('string'),
activeclass :DS.attr('string'),
products: DS.hasMany('product' ,{embedded: 'always', async:true}),

});
