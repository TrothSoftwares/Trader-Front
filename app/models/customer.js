import DS from 'ember-data';
import Ember from 'ember';

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
filteryear: DS.attr('number', {
    defaultValue() { return new Date().getFullYear(); }
  }),
orders: DS.hasMany('order' ,{embedded: 'always', async:true}),


orderByMonthJanuvary:Ember.computed(  'orders.@each.issuancedate','filteryear', function() {
  var orders = this.get('orders');

  var filteryear = parseInt(this.get('filteryear'));

  orders = orders.filter(function (order) {
    return (order.get('issuancedate').getFullYear() === filteryear);
  });



    orders = orders.filter(function (order) {
      return (order.get('issuancedate').getFullYear() === '2016');
    });



  orders =  orders.filter(function(order) {

     if(order.get('issuancedate').getMonth() ===0){return order;}
  });

  var ret =0;
  orders.forEach(function(order){
      order.get('orderitems').reduce(function(sum, split) {
        return sum + parseFloat(split.get('computedtotal'));
    }, 0);
    ret += order.get('totalcost');
  });
  return ret;
}),




orderByMonthFebruvary:Ember.computed(  'orders.@each.issuancedate', 'filteryear', function() {
  var orders = this.get('orders');


  var filteryear = parseInt(this.get('filteryear'));

  orders = orders.filter(function (order) {
    return (order.get('issuancedate').getFullYear() === filteryear);
  });

  orders =  orders.filter(function(order) {
     if(order.get('issuancedate').getMonth() ===1){return order;}
  });

  var ret =0;
  orders.forEach(function(order){
      order.get('orderitems').reduce(function(sum, split) {
        return sum + parseFloat(split.get('computedtotal'));
    }, 0);
    ret += order.get('totalcost');
  });
  return ret;
}),



orderByMonthMarch:Ember.computed(  'orders.@each.issuancedate' ,'filteryear' , function() {
  var orders = this.get('orders');
  var filteryear = parseInt(this.get('filteryear'));

  orders = orders.filter(function (order) {
    return (order.get('issuancedate').getFullYear() === filteryear);
  });

  orders =  orders.filter(function(order) {
     if(order.get('issuancedate').getMonth() ===2){return order;}
  });

  var ret =0;
  orders.forEach(function(order){
      order.get('orderitems').reduce(function(sum, split) {
        return sum + parseFloat(split.get('computedtotal'));
    }, 0);
    ret += order.get('totalcost');
  });
  return ret;
}),





orderByMonthApril:Ember.computed(  'orders.@each.issuancedate' ,'filteryear', function() {
  var orders = this.get('orders');

  var filteryear = parseInt(this.get('filteryear'));

  orders = orders.filter(function (order) {
    return (order.get('issuancedate').getFullYear() === filteryear);
  });

  orders =  orders.filter(function(order) {
     if(order.get('issuancedate').getMonth() ===3){return order;}
  });

  var ret =0;
  orders.forEach(function(order){
      order.get('orderitems').reduce(function(sum, split) {
        return sum + parseFloat(split.get('computedtotal'));
    }, 0);
    ret += order.get('totalcost');
  });
  return ret;
}),




orderByMonthMay:Ember.computed(  'orders.@each.issuancedate' ,'filteryear', function() {
  var orders = this.get('orders');

  var filteryear = parseInt(this.get('filteryear'));

  orders = orders.filter(function (order) {
    return (order.get('issuancedate').getFullYear() === filteryear);
  });

  orders =  orders.filter(function(order) {
     if(order.get('issuancedate').getMonth() ===4){return order;}
  });

  var ret =0;
  orders.forEach(function(order){
      order.get('orderitems').reduce(function(sum, split) {
        return sum + parseFloat(split.get('computedtotal'));
    }, 0);
    ret += order.get('totalcost');
  });
  return ret;
}),



orderByMonthJune:Ember.computed(  'orders.@each.issuancedate' , 'filteryear', function() {
  var orders = this.get('orders');

  var filteryear = parseInt(this.get('filteryear'));

  orders = orders.filter(function (order) {
    return (order.get('issuancedate').getFullYear() === filteryear);
  });


  orders =  orders.filter(function(order) {
     if(order.get('issuancedate').getMonth() ===5){return order;}
  });

  var ret =0;
  orders.forEach(function(order){
      order.get('orderitems').reduce(function(sum, split) {
        return sum + parseFloat(split.get('computedtotal'));
    }, 0);
    ret += order.get('totalcost');
  });
  return ret;
}),





orderByMonthJuly:Ember.computed(  'orders.@each.issuancedate' ,'filteryear', function() {
  var orders = this.get('orders');

  var filteryear = parseInt(this.get('filteryear'));

  orders = orders.filter(function (order) {
    return (order.get('issuancedate').getFullYear() === filteryear);
  });

  orders =  orders.filter(function(order) {
     if(order.get('issuancedate').getMonth() ===6){return order;}
  });

  var ret =0;
  orders.forEach(function(order){
      order.get('orderitems').reduce(function(sum, split) {
        return sum + parseFloat(split.get('computedtotal'));
    }, 0);
    ret += order.get('totalcost');
  });
  return ret;
}),





orderByMonthAugust:Ember.computed(  'orders.@each.issuancedate' ,'filteryear', function() {
  var orders = this.get('orders');

  var filteryear = parseInt(this.get('filteryear'));

  orders = orders.filter(function (order) {
    return (order.get('issuancedate').getFullYear() === filteryear);
  });

  orders =  orders.filter(function(order) {
     if(order.get('issuancedate').getMonth() ===7){return order;}
  });

  var ret =0;
  orders.forEach(function(order){
      order.get('orderitems').reduce(function(sum, split) {
        return sum + parseFloat(split.get('computedtotal'));
    }, 0);
    ret += order.get('totalcost');
  });
  return ret;
}),





orderByMonthSeptember:Ember.computed(  'orders.@each.issuancedate' ,'filteryear', function() {
  var orders = this.get('orders');

  var filteryear = parseInt(this.get('filteryear'));

  orders = orders.filter(function (order) {
    return (order.get('issuancedate').getFullYear() === filteryear);
  });

  orders =  orders.filter(function(order) {
     if(order.get('issuancedate').getMonth() ===8){return order;}
  });

  var ret =0;
  orders.forEach(function(order){
      order.get('orderitems').reduce(function(sum, split) {
        return sum + parseFloat(split.get('computedtotal'));
    }, 0);
    ret += order.get('totalcost');
  });
  return ret;
}),




orderByMonthOctober:Ember.computed(  'orders.@each.issuancedate' ,'filteryear', function() {
  var orders = this.get('orders');

  var filteryear = parseInt(this.get('filteryear'));

  orders = orders.filter(function (order) {
    return (order.get('issuancedate').getFullYear() === filteryear);
  });

  orders =  orders.filter(function(order) {
     if(order.get('issuancedate').getMonth() ===9){return order;}
  });

  var ret =0;
  orders.forEach(function(order){
      order.get('orderitems').reduce(function(sum, split) {
        return sum + parseFloat(split.get('computedtotal'));
    }, 0);
    ret += order.get('totalcost');
  });
  return ret;
}),





orderByMonthNovember:Ember.computed(  'orders.@each.issuancedate' ,'filteryear', function() {
  var orders = this.get('orders');

  var filteryear = parseInt(this.get('filteryear'));

  orders = orders.filter(function (order) {
    return (order.get('issuancedate').getFullYear() === filteryear);
  });
  orders =  orders.filter(function(order) {
     if(order.get('issuancedate').getMonth() ===10){return order;}
  });

  var ret =0;
  orders.forEach(function(order){
      order.get('orderitems').reduce(function(sum, split) {
        return sum + parseFloat(split.get('computedtotal'));
    }, 0);
    ret += order.get('totalcost');
  });
  return ret;
}),


 orderByMonthDecember:Ember.computed(  'orders.@each.issuancedate' ,'filteryear', function() {
   var orders = this.get('orders');
   var filteryear = parseInt(this.get('filteryear'));

   orders = orders.filter(function (order) {
     return (order.get('issuancedate').getFullYear() === filteryear);
   });

   orders =  orders.filter(function(order) {
      if(order.get('issuancedate').getMonth() ===11){return order;}
   });

   var ret =0;
   orders.forEach(function(order){
       order.get('orderitems').reduce(function(sum, split) {
         return sum + parseFloat(split.get('computedtotal'));
     }, 0);
     ret += order.get('totalcost');
   });
   return ret;
 }),

  });
