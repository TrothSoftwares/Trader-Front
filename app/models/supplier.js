import DS from 'ember-data';

export default DS.Model.extend({
companyname: DS.attr('string'),
companycode: DS.attr('string'),
chargecode: DS.attr('string'),
email: DS.attr('string'),
address1: DS.attr('string'),
address2: DS.attr('string'),
suburb: DS.attr('string'),
city: DS.attr('string'),
state: DS.attr('string'),
country: DS.attr('string'),
zipcode: DS.attr('string'),
phone: DS.attr('string'),
products: DS.hasMany('product' ,{embedded: 'always', async:true}),

 });
