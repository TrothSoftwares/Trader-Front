import DS from 'ember-data';

export default DS.Model.extend({
slno: DS.attr('string'),
name: DS.attr('string'),
status: DS.attr('string'),
issuedate: DS.attr('date'),
returndate: DS.attr('date'),
location: DS.attr('string'),
commontoolissuances: DS.hasMany('commontoolissuance' ,{embedded: 'always', async:true}),
});
