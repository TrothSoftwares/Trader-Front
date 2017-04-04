import DS from 'ember-data';

export default DS.Model.extend({
customer: DS.belongsTo('customer' ,{async:true}),
amount: DS.attr('number'),
createdat: DS.attr('date')
});
