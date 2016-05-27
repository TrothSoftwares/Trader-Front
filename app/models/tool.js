import DS from 'ember-data';

export default DS.Model.extend({
name: DS.attr('string'),
status: DS.attr('string'),
issuedate: DS.attr('date'),
damagedate: DS.attr('date'),
lostdate: DS.attr('date'),
employee: DS.belongsTo('employee' ,{async:true})
});
